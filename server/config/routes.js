module.exports = function (app, express, activeUsers, messages) {
  app.get('/api/users/active', function(req, res) {
    res.json(activeUsers);
  });

  app.get('/api/messages/recent', function(req, res) {
    let tempMessages = messages.slice(-20);
    tempMessages.reverse();

    res.json(tempMessages);
  });

  app.get('*', function(req, res) {
    res.send('<h1>Hello world</h1>');
  });
};
