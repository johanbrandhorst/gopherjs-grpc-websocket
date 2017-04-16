package json

import "github.com/gopherjs/gopherjs/js"

// Marshal uses the browser builtin JSON.stringify function
// and wraps it such that any exceptions thrown are returned
// as errors.
func Marshal(o *js.Object) (res string, err error) {
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

// Unmarshal uses the browser builtin JSON.parse function
// and wraps it such that any exceptions thrown are returned
// as errors.
func Unmarshal(s string) (res *js.Object, err error) {
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
