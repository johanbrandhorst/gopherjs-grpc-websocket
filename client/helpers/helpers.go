package helpers

import "github.com/gopherjs/gopherjs/js"

// MarshalJSON uses the browser builtin JSON.stringify function
// and wraps it such that any exceptions thrown are returned
// as errors.
func MarshalJSON(o *js.Object) (res string, err error) {
	defer func() {
		e := recover()

		if e == nil {
			return
		}

		if e, ok := e.(*js.Error); ok {
			err = e
		} else {
			panic(e)
		}
	}()

	res = js.Global.Get("JSON").Call("stringify", o).String()

	return res, err
}

// UnmarshalJSON uses the browser builtin JSON.parse function
// and wraps it such that any exceptions thrown are returned
// as errors.
func UnmarshalJSON(s string) (res *js.Object, err error) {
	defer func() {
		e := recover()

		if e == nil {
			return
		}

		if e, ok := e.(*js.Error); ok {
			err = e
		} else {
			panic(e)
		}
	}()

	res = js.Global.Get("JSON").Call("parse", s)

	return res, err
}

// GetWSBaseURL constructs the base URL for WebSocket calls
// Copied from
// https://github.com/gopherjs/websocket/blob/edfe1438a4184bea0b3f9e35fd77969061676d9c/test/test/index.go
func GetWSBaseURL() string {
	document := js.Global.Get("window").Get("document")
	location := document.Get("location")

	wsProtocol := "ws"
	if location.Get("protocol").String() == "https:" {
		wsProtocol = "wss"
	}

	return wsProtocol + "://" + location.Get("hostname").String() + ":" + location.Get("port").String()
}
