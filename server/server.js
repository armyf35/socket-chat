require('dotenv').config();
var express = require('express');
var app = express();
var http = require('http').Server(app);

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

http.listen(process.env.PORT, function() {
  console.log(`listening on *:${process.env.PORT}`);
});
