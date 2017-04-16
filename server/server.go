package server

import (
	"io"
	"time"

	"github.com/golang/protobuf/ptypes/empty"
	"golang.org/x/net/context"

	"github.com/johanbrandhorst/gopherjs-grpc-websocket/protos/server"
)

type Server struct{}

var _ server.MyServerServer = &Server{}

func (s Server) Simple(ctx context.Context, _ *empty.Empty) (*server.MyMessage, error) {
	return &server.MyMessage{
		Msg: "A simple message",
	}, nil
}

func (s Server) Unary(_ *empty.Empty, srv server.MyServer_UnaryServer) error {
	// Send 4 messages
	for i := uint32(0); i < 4; i++ {
		msg := &server.MyMessage{
			Msg: "A unary message",
			Num: i,
		}

		if err := srv.Send(msg); err != nil {
			return err
		}

		// Sleep to simulate some work
		time.Sleep(time.Second)
	}

	return nil
}

func (s Server) Bidi(srv server.MyServer_BidiServer) error {
	for i := uint32(0); ; i++ {
		// Blocks until a message is received
		msg, err := srv.Recv()
		if err != nil {
			if err == io.EOF {
				// Client closed connection
				return nil
			}

			return err
		}

		// Just echo back the message sent,
		// incrementing the counter
		msg.Num = i
		if err := srv.Send(msg); err != nil {
			return err
		}
	}
}
