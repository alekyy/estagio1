var http = require('http');
var app = require('./config/express');

//req = requisição, res = resposta.
http.createServer(app).listen(3000, function() {

  console.log("Hey, listen!");

});
