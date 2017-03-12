# gopherjs-grpc-websocket
An example implementation of bridging a gRCP backend with a
GopherJS frontend over Websockets, XHR requests and the [grpc-gateway](https://github.com/grpc-ecosystem/grpc-gateway).

A large focus of this project is to show that you can implement both simple HTTP
requests and complex bi-directional websocket streaming without compromising
generated file size. The generated js for this example weighs in at 942KB.

This takes inspiration from projects like
https://github.com/philips/grpc-gateway-example.

# Generate the proto files
This requires installing the go programs from the vendor folder and `protoc`.
It also assumes you have python3 in your `$PATH`.

Download the latest protoc from [github.com](https://github.com/google/protobuf/releases)

Install go dependencies:
```
$ go install ./vendor/...
```
Generate!
```
$ ./generate.py
```

# Generate the client
Install gopherjs (note that gopherjs cannot be vendored,
see https://github.com/gopherjs/gopherjs/issues/415):
```
$ go get -u github.com/gopherjs/gopherjs/js
```
Generate!
```
$ go generate ./client/
```

This creates a go-bindata-compiled file which
can easily be served from the server.

# Running the server
```
$ go run main.go
```

Navigate to [localhost](https://localhost:10000) and check it out!
