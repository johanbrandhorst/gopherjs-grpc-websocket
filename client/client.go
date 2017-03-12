package main

//go:generate gopherjs build -m client.go -o html/index.js
//go:generate go-bindata -pkg compiled -nometadata -o compiled/client.go -prefix html ./html
//go:generate bash -c "rm html/*.js*"

import (
	"github.com/gopherjs/gopherjs/js"
	"github.com/oskca/gopherjs-vue"
	"honnef.co/go/js/xhr"

	"github.com/johanbrandhorst/gopherjs-grpc-websocket/client/helpers"
)

// Model is the state keeper of the app.
type Model struct {
	*js.Object
	Error         string       `js:"error"`
	SimpleMessage *MyMessage   `js:"simple_message"`
	UnaryMessages []*MyMessage `js:"unary_messages"`
}

func (m *Model) Simple() {
	req := xhr.NewRequest("GET", "/api/v1/simple")
	req.SetRequestHeader("Content-Type", "application/json")

	go func() {
		err := req.Send(nil)
		if err != nil {
			m.Error = err.Error()
			return
		}

		if req.Status != 200 {
			m.Error = req.ResponseText
			return
		}

		rObj, err := helpers.UnmarshalJSON(req.ResponseText)
		if err != nil {
			m.Error = err.Error()
			return
		}

		msg := &MyMessage{
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

			rObj, err := helpers.UnmarshalJSON(resp)
			if err != nil {
				m.Error = err.Error()
				return
			}

			// For some reason the actual message is wrapped in a
			// "result" key.
			aux := &struct {
				*js.Object
				msg *MyMessage `js:"result"`
			}{
				Object: rObj,
			}

			m.UnaryMessages = append(m.UnaryMessages, aux.msg)
		}
	})

	go func() {
		err := req.Send(nil)
		if err != nil {
			m.Error = err.Error()
			return
		}

		if req.Status != 200 {
			m.Error = req.ResponseText
			return
		}
	}()
}

type MyMessage struct {
	*js.Object
	Msg string `js:"msg"`
	Num int    `js:"num"`
}

func main() {
	m := &Model{
		Object: js.Global.Get("Object").New(),
	}

	// These must be set after the struct has been initialised
	// so that the values can be mirrored into the internal JS Object.
	m.Error = ""
	m.SimpleMessage = &MyMessage{}
	m.UnaryMessages = []*MyMessage{}

	// create the VueJS viewModel using a struct pointer
	vue.New("#app", m)
}
