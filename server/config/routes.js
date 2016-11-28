module.exports = function (app, express, activeUsers, guestList, messages) {
  app.get('/api/users/active', function(req, res) {
    res.json(activeUsers);
  });

  app.get('/api/messages/recent', function(req, res) {
    let tempMessages = messages.slice(-20);
    tempMessages.reverse();

    res.json(tempMessages);
  });

  app.get('/api/users/guest', function(req, res) {
    let num = 1;
    while (guestList.indexOf(num) !== -1) {
      num++;
    }

    res.json(num);
  });

  app.get('*', function(req, res) {
    res.send('<h1>Hello world</h1>');
  });
};
