package main

import (
	"context"
	"crypto/tls"
	"net"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"syscall"
	"time"

	"github.com/Sirupsen/logrus"
	assetfs "github.com/elazarl/go-bindata-assetfs"
	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"github.com/tmc/grpc-websocket-proxy/wsproxy"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc/grpclog"

	"github.com/johanbrandhorst/gopherjs-grpc-websocket/client/compiled"
	pserver "github.com/johanbrandhorst/gopherjs-grpc-websocket/protos/server"
	"github.com/johanbrandhorst/gopherjs-grpc-websocket/server/insecure"
	"github.com/johanbrandhorst/gopherjs-grpc-websocket/server/server"
)

var logger *logrus.Logger

// If you change this, you'll need to change the cert as well
const addr = "localhost:10000"

func init() {
	logger = logrus.StandardLogger()
	logrus.SetLevel(logrus.InfoLevel)
	logrus.SetFormatter(&logrus.TextFormatter{
		ForceColors:     true,
		FullTimestamp:   true,
		TimestampFormat: time.Kitchen,
		DisableSorting:  true,
	})
	grpclog.SetLogger(logger)
}

func main() {
	s := &server.Server{}

	gs := grpc.NewServer(grpc.Creds(credentials.NewServerTLSFromCert(insecure.KeyPair)))
	pserver.RegisterServerServer(gs, s)
	conn, err := net.Listen("tcp", addr)
	if err != nil {
		logger.Fatal("Failed to listen on address: ", err)
	}

	// Gracefully shut down on ctrl-c
	c := make(chan os.Signal, 1)
	signal.Notify(c, syscall.SIGINT, syscall.SIGTERM)
	go func() {
		<-c
		gs.GracefulStop()
		conn.Close()
	}()

	mux := http.NewServeMux()

	// Serve the gopherjs client
	mux.Handle("/", http.FileServer(&assetfs.AssetFS{
		Asset:     compiled.Asset,
		AssetDir:  compiled.AssetDir,
		AssetInfo: compiled.AssetInfo,
	}))

	gwMux := runtime.NewServeMux(
		runtime.WithMarshalerOption("*", &runtime.JSONPb{
			EmitDefaults: true,
		}),
	)
	// Wrap the gateway in the websocket proxy for bidi streams!
	mux.Handle("/api/", wsproxy.WebsocketProxy(gwMux))
	ctx, cancelFunc := context.WithCancel(context.Background())
	defer cancelFunc()

	dcreds := credentials.NewTLS(&tls.Config{
		ServerName: addr,
		RootCAs:    insecure.CertPool,
	})
	dopts := []grpc.DialOption{grpc.WithTransportCredentials(dcreds)}
	err = pserver.RegisterServerHandlerFromEndpoint(ctx, gwMux, addr, dopts)
	if err != nil {
		logger.Fatal("Failed to dial server: ", err)
	}

	srv := &http.Server{
		Addr:    addr,
		Handler: grpcHandlerFunc(gs, mux),
		TLSConfig: &tls.Config{
			NextProtos:   []string{"h2"},
			Certificates: []tls.Certificate{*insecure.KeyPair},
		},
	}

	logger.Print("Serving on ", addr)
	logger.Fatal(srv.Serve(tls.NewListener(conn, srv.TLSConfig)))
}

// GrpcHandlerFunc returns an http.Handler that delegates to grpcServer on incoming gRPC
// connections or otherHandler otherwise. Copied from cockroachdb.
func grpcHandlerFunc(grpcServer http.Handler, otherHandler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// This is a partial recreation of gRPC's internal checks https://github.com/grpc/grpc-go/pull/514/files#diff-95e9a25b738459a2d3030e1e6fa2a718R61
		if r.ProtoMajor == 2 && strings.Contains(r.Header.Get("Content-Type"), "application/grpc") {
			grpcServer.ServeHTTP(w, r)
		} else {
			otherHandler.ServeHTTP(w, r)
		}
	})
}
