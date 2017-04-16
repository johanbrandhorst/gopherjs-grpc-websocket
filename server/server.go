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
	errChan := make(chan error, 1)
	msgChan := make(chan *server.MyMessage, 1)

	go func() {
		for {
			msg, err := srv.Recv()
			if err != nil {
				errChan <- err
				return
			}

			msgChan <- msg
		}
	}()

	for i := uint32(0); ; i++ {
		select {
		case err := <-errChan:
			if err == io.EOF {
				// Client closed connection
				return nil
			}

			return err
		case msg := <-msgChan:
			// Just echo back the message sent,
			// incrementing the counter
			msg.Num = i
			if err := srv.Send(msg); err != nil {
				return err
			}
		}
	}
}
