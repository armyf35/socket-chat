var bodyParser = require('body-parser');

module.exports = function (app, express) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));
  app.use('/node_modules', express.static(__dirname + '/../../node_modules'));
  app.use(express.static(__dirname + '/public'));
};
