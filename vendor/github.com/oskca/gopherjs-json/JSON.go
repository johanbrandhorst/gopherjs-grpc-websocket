// package JSON wraps the javascritp JSON api for GOPHERJS.
package json

import (
	"github.com/gopherjs/gopherjs/js"
)

var (
	json = js.Global.Get("JSON")
)

func Stringify(obj interface{}) string {
	return json.Call("stringify", obj).String()
}

func Parse(jsonStr string) *js.Object {
	return json.Call("parse", jsonStr)
}
