# gopherjs-grpc-websocket
An example implementation of bridging gRCP with a GopherJS frontend over Websockets.

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
Install dependencies:
```
$ go get -u github.com/gopherjs/gopherjs/js \
    honnef.co/go/js/xhr \
    github.com/oskca/gopherjs-vue \
    github.com/gopherjs/websocket
```
Generate!
```
$ go generate ./client/
```

This creates a go-bindata-compiled file which
can easily be served from the server.

# Running the server
```
$ go run ./server/main.go
```

Navigate to [localhost](https://localhost:10000) and check it out!
