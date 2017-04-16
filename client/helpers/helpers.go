package helpers

import "github.com/gopherjs/gopherjs/js"

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
