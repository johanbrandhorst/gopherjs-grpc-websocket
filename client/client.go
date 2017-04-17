package main

//go:generate gopherjs build -m client.go -o html/index.js
//go:generate go-bindata -pkg compiled -nometadata -o compiled/client.go -prefix html ./html
//go:generate bash -c "rm html/*.js*"

import (
	"net"

	"github.com/gopherjs/gopherjs/js"
	"github.com/gopherjs/websocket"
	"github.com/johanbrandhorst/gopherjs-json"
	"github.com/oskca/gopherjs-vue"
	"honnef.co/go/js/xhr"

	"github.com/johanbrandhorst/gopherjs-grpc-websocket/client/helpers"
	"github.com/johanbrandhorst/gopherjs-grpc-websocket/client/protos/server"
)

// Model is the state keeper of the app.
type Model struct {
	*js.Object
	SimpleMessage *server.MyMessage   `js:"simple_message"`
	UnaryMessages []*server.MyMessage `js:"unary_messages"`
	InputMessage  string              `js:"input_message"`
	BidiMessages  []*server.MyMessage `js:"bidi_messages"`
	ConnOpen      bool                `js:"ws_conn"`
}

var WSConn net.Conn

func (m *Model) Simple() {
	req := xhr.NewRequest("GET", "/api/v1/simple")
	req.SetRequestHeader("Content-Type", "application/json")

	// Wrap call in goroutine to use blocking code
	go func() {
		// Blocks until reply received
		err := req.Send(nil)
		if err != nil {
			panic(err)
		}

		if req.Status != 200 {
			panic(req.ResponseText)
		}

		rObj, err := json.Unmarshal(req.ResponseText)
		if err != nil {
			panic(err)
		}

		msg := &server.MyMessage{
			Object: rObj,
		}

		m.SimpleMessage = msg
	}()
}

func (m *Model) Unary() {
	req := xhr.NewRequest("GET", "/api/v1/unary")
	req.SetRequestHeader("cache-control", "no-cache")
	req.SetRequestHeader("Content-Type", "application/json")

	bytesRead := 0
	req.AddEventListener("readystatechange", false, func(_ *js.Object) {
		switch req.ReadyState {
		case xhr.Loading:
			// This whole dance is because the XHR ResponseText
			// will contain all the messages, and we just want to read
			// anything we havent already read
			resp := req.ResponseText[bytesRead:]
			bytesRead += len(resp)

			rObj, err := json.Unmarshal(resp)
			if err != nil {
				panic(err)
			}

			// The actual message is wrapped in a "result" key,
			// and there might be an error returned as well.
			// See https://github.com/grpc-ecosystem/grpc-gateway/blob/b75dbe36289963caa453a924bd92ddf68c3f2a62/runtime/handler.go#L163
			aux := &struct {
				*js.Object
				msg *server.MyMessage `js:"result"`
			}{
				Object: rObj,
			}

			// The most reliable way I've found to check whether
			// an error was returned.
			if rObj.Get("error").Bool() {
				panic(resp)
			}

			m.UnaryMessages = append(m.UnaryMessages, aux.msg)
		}
	})

	// Wrap call in goroutine to use blocking code
	go func() {
		// Blocks until reply received
		err := req.Send(nil)
		if err != nil {
			panic(err)
		}

		if req.Status != 200 {
			panic(req.ResponseText)
		}
	}()
}

func (m *Model) Connect() {
	// Wrap call in goroutine to use blocking code
	go func() {
		// Blocks until connection is established
		var err error
		WSConn, err = websocket.Dial(helpers.GetWSBaseURL() + "/api/v1/bidi")
		if err != nil {
			panic(err)
		}

		m.ConnOpen = true
	}()
}

func (m *Model) Close() {
	err := WSConn.Close()
	if err != nil {
		panic(err)
	}

	m.ConnOpen = false
	m.BidiMessages = []*server.MyMessage{}
}

func (m *Model) Send() {
	msg := &server.MyMessage{
		Object: js.Global.Get("Object").New(),
	}
	msg.Msg = m.InputMessage
	s, err := json.Marshal(msg.Object)
	if err != nil {
		panic(err)
	}

	_, err = WSConn.Write([]byte(s))
	if err != nil {
		panic(err)
	}

	buf := make([]byte, 1024)
	// Wrap call in goroutine to use blocking code
	go func() {
		// Blocks until a WebSocket frame is received
		n, err := WSConn.Read(buf)
		if err != nil {
			panic(err)
		}

		rObj, err := json.Unmarshal(string(buf[:n]))
		if err != nil {
			panic(err)
		}

		// The actual message is wrapped in a "result" key,
		// and there might be an error returned as well.
		// See https://github.com/grpc-ecosystem/grpc-gateway/blob/b75dbe36289963caa453a924bd92ddf68c3f2a62/runtime/handler.go#L163
		aux := &struct {
			*js.Object
			msg *server.MyMessage `js:"result"`
		}{
			Object: rObj,
		}

		// The most reliable way I've found to check whether
		// an error was returned.
		if rObj.Get("error").Bool() {
			panic(buf[:n])
		}

		m.BidiMessages = append(m.BidiMessages, aux.msg)
	}()
}

func main() {
	m := &Model{
		Object: js.Global.Get("Object").New(),
	}

	// These must be set after the struct has been initialised
	// so that the values can be mirrored into the internal JS Object.
	m.SimpleMessage = nil
	m.UnaryMessages = []*server.MyMessage{}
	m.BidiMessages = []*server.MyMessage{}
	m.InputMessage = ""
	m.ConnOpen = false

	// Create the VueJS viewModel using a struct pointer
	vue.New("#app", m)
}
