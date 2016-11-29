const User = require('../models/user');
const Message = require('../models/message');
const Users = require('../models/user');
const Messages = require('../models/message');

module.exports = function (app, express, activeUsers, guestList, messages) {
  app.get('/api/users/active', function(req, res) {
    res.json(activeUsers);
  });

  app.get('/api/users/guest', function(req, res) {
    let num = 1;
    while (guestList.indexOf(num) !== -1) {
      num++;
    }

    res.json(num);
  });

  app.post('/api/users/signup', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    new User({ username: username }).fetch().then(function(found) {
      if (found) {
        res.sendStatus(409);
      } else {
        Users.create({
          username: username,
          password: password
        })
        .then(function(newUser) {
          // TODO: Session
          res.json(newUser);
        });
      }
    });
  });

  app.post('/api/users/signin', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    new User({username: username, password: password}).fetch().then(function(found) {
      if (found) {
        // TODO: Session
        res.json(found);
      } else {
        res.json(found);
      }
    });
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
