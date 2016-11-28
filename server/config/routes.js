module.exports = function (app, express) {
  app.get('/', function(req, res) {
    res.send('<h1>Hello world</h1>');
  });
};
