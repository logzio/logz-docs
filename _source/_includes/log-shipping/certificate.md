##### Download the Logz.io public certificate {{include.server}}

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.
{{include.clarification}}

```shell
sudo curl https://raw.githubusercontent.com/logzio/public-certificates/master/AAACertificateServices.crt --create-dirs -o /etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt
```