module.exports = function (app, express) {
  app.use(express.static(__dirname + '/../../client'));
  app.use('/lib', express.static(__dirname + '/../../node_modules'));
  app.use(express.static(__dirname + '/public'));
};
