![Banner][]

# Concorda Client Demo
Concorda: A simple client demo exposing a REST API protected by Concorda user management system

- __Lead Maintainer:__ [Mircea Alexandru][lead]
- __Sponsor:__ [nearForm][]

A detailed documentation can be found in [Concorda wiki](https://github.com/Concorda/docs/blob/master/Readme.md)

### Starting demo client that connects to a remote Concorda microservice

 * clone this repository
 * run
 
```sh
npm install
npm start
```

More documentation about this type of deployment can be found [here](https://github.com/Concorda/docs/blob/master/doc/install-client.md)
 
### Starting demo client using Concorda as internal plugin

 * clone this repository
 * run
 
```sh
npm install
node start_plugin
```

More documentation about this type of deployment can be found [here](https://github.com/Concorda/docs/blob/master/doc/install-client.md)
 
### Commands

To demo properly all API exposed automatically by concorda client the curl tool is used. Please find bellow examples of using curl with Concorda plugin.

For example of using Concorda with a React client implementation please take a look at this project - [Vidi Dashboard](https://github.com/vidi-insights/vidi-dashboard)

#### Login

```

curl -i -X POST -H "Content-Type: application/json" -d '{"username":"admin@concorda.com", "password":"concorda"}' http://localhost:3000/auth/login
 
HTTP/1.1 200 OK
content-type: application/json; charset=utf-8
set-cookie: seneca-login=Fe26.2**599663fa9a8a5234937de49f4e06772fe685b1b0e8c3f367ae4946d963796ab9*LNOB3LreoPolrqN9FnSbNA*kGf4931n2wXbaya19nEzmuFoLJIows35RmTeAPfK8xUent-c3l6pD7g0B5QDmE067TG9B53p0jEdOvYsovP6aA**fe671ac75cdc47de2412421730a60aa2e5a8dbf18693ed1791ca7b41065809d4*Fdv8-uBSf22K7z7XSQV24WN-6Z6mroeNAY7Tdf-eqnA; HttpOnly; Path=/
cache-control: no-cache
content-length: 545
Date: Wed, 16 Mar 2016 09:08:24 GMT
Connection: keep-alive

{"user":{"id":"01be6250-d43f-44cf-b36b-ae325fbf4df1","nick":"admin@concorda.com","email":"admin@concorda.com","name":"Concorda Administrator","when":"2016-03-16T08:04:40.757Z","modified":null,"tags":[{"id":"9bcc1381-c07c-4bb0-8b46-dce970cb80d9","name":"Concorda"}]},"login":{"nick":"admin@concorda.com","email":"admin@concorda.com","user":"01be6250-d43f-44cf-b36b-ae325fbf4df1","when":"2016-03-16T09:08:24.229Z","active":true,"why":"password","token":"2769c1e1-4d1b-4a9a-8307-cfb70d6c8740","id":"2769c1e1-4d1b-4a9a-8307-cfb70d6c8740"},"ok":true}

```

#### User

```

curl -i -b 'seneca-login=Fe26.2**599663fa9a8a5234937de49f4e06772fe685b1b0e8c3f367ae4946d963796ab9*LNOB3LreoPolrqN9FnSbNA*kGf4931n2wXbaya19nEzmuFoLJIows35RmTeAPfK8xUent-c3l6pD7g0B5QDmE067TG9B53p0jEdOvYsovP6aA**fe671ac75cdc47de2412421730a60aa2e5a8dbf18693ed1791ca7b41065809d4*Fdv8-uBSf22K7z7XSQV24WN-6Z6mroeNAY7Tdf-eqnA' http://localhost:3000/auth/user

HTTP/1.1 200 OK
content-type: application/json; charset=utf-8
cache-control: no-cache
content-length: 570
accept-ranges: bytes
Date: Wed, 16 Mar 2016 09:12:43 GMT
Connection: keep-alive

{"user":{"id":"01be6250-d43f-44cf-b36b-ae325fbf4df1","nick":"admin@concorda.com","email":"admin@concorda.com","name":"Concorda Administrator","when":"2016-03-16T08:04:40.757Z","modified":null,"tags":[{"id":"9bcc1381-c07c-4bb0-8b46-dce970cb80d9","name":"Concorda"}]},"login":{"id":"2769c1e1-4d1b-4a9a-8307-cfb70d6c8740","nick":"admin@concorda.com","email":"admin@concorda.com","user":"01be6250-d43f-44cf-b36b-ae325fbf4df1","when":"2016-03-16T09:08:24.229Z","why":"password","token":"2769c1e1-4d1b-4a9a-8307-cfb70d6c8740","active":true,"auto":null,"ended":null},"ok":true}

```

#### Logout

```
curl -i -b 'seneca-login=Fe26.2**599663fa9a8a5234937de49f4e06772fe685b1b0e8c3f367ae4946d963796ab9*LNOB3LreoPolrqN9FnSbNA*kGf4931n2wXbaya19nEzmuFoLJIows35RmTeAPfK8xUent-c3l6pD7g0B5QDmE067TG9B53p0jEdOvYsovP6aA**fe671ac75cdc47de2412421730a60aa2e5a8dbf18693ed1791ca7b41065809d4*Fdv8-uBSf22K7z7XSQV24WN-6Z6mroeNAY7Tdf-eqnA' http://localhost:3000/auth/logout

HTTP/1.1 200 OK
content-type: application/json; charset=utf-8
set-cookie: seneca-login=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Path=/
cache-control: no-cache
content-length: 36
accept-ranges: bytes
Date: Wed, 16 Mar 2016 09:13:12 GMT
Connection: keep-alive

{"user":null,"login":null,"ok":true}
```

#### API protected

##### With authentication cookie

```
curl -i -b 'seneca-login=Fe26.2**599663fa9a8a5234937de49f4e06772fe685b1b0e8c3f367ae4946d963796ab9*LNOB3LreoPolrqN9FnSbNA*kGf4931n2wXbaya19nEzmuFoLJIows35RmTeAPfK8xUent-c3l6pD7g0B5QDmE067TG9B53p0jEdOvYsovP6aA**fe671ac75cdc47de2412421730a60aa2e5a8dbf18693ed1791ca7b41065809d4*Fdv8-uBSf22K7z7XSQV24WN-6Z6mroeNAY7Tdf-eqnA' http://localhost:3000/api/service

HTTP/1.1 200 OK
content-type: application/json; charset=utf-8
cache-control: no-cache
content-length: 92
accept-ranges: bytes
Date: Wed, 16 Mar 2016 10:31:50 GMT
Connection: keep-alive

{"ok":true,"message":"Protected service. This server is accessed now by admin@concorda.com"}
```

##### Without authentication cookie

```
curl -i http://localhost:3000/api/service

HTTP/1.1 401 Unauthorized
WWW-Authenticate: cookie
content-type: application/json; charset=utf-8
cache-control: no-cache
content-length: 76
Date: Wed, 16 Mar 2016 10:34:02 GMT
Connection: keep-alive

{"statusCode":401,"error":"Unauthorized","message":"Missing authentication"}
```

## Contributing
The [Concorda][] encourages open participation. If you feel you can help in any way, be it with
documentation, examples, extra testing, or new features please get in touch.

- [Code of Conduct]

## License
Copyright (c) 2016, nearForm and other contributors.
Licensed under [MIT][].

[Banner]: https://raw.githubusercontent.com/nearform/concorda-dashboard/master/public/client/assets/img/logo-concorda-banner.png
[here]: https://github.com/nearform/concorda/blob/master/doc/Readme.md
[MIT]: ./LICENSE
[Code of Conduct]: https://github.com/nearform/vidi-contrib/docs/code_of_conduct.md
[Concorda]: https://github.com/concorda/concorda-dashboard
[lead]: https://github.com/mirceaalexandru
[nearForm]: http://www.nearform.com/
