# Building the client
Install dependencies:
```
$ go get -u github.com/gopherjs/gopherjs/js \
    honnef.co/go/js/xhr \
    github.com/oskca/gopherjs-vue
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
$ go run ./server/main.go
```
