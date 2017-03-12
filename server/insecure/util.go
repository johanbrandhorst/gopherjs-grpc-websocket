package insecure

import (
	"crypto/tls"
	"crypto/x509"
)

var (
	KeyPair  *tls.Certificate
	CertPool *x509.CertPool
)

func init() {
	var err error
	pair, err := tls.X509KeyPair([]byte(cert), []byte(key))
	if err != nil {
		panic(err)
	}
	KeyPair = &pair
	CertPool = x509.NewCertPool()
	ok := CertPool.AppendCertsFromPEM([]byte(cert))
	if !ok {
		panic("bad certs")
	}
}
