# Building the client
Install gopherjs (note that gopherjs cannot be vendored,
see https://github.com/gopherjs/gopherjs/issues/415):
```
$ go get -u github.com/gopherjs/gopherjs/js
```

Install vendored programs:
```
$ go install ./vendor/...
```

Build the compiled file:
```
$ go generate ./client/
```

# Run the server
```
$ go run main.go
```
