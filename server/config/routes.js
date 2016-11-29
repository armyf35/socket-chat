const User = require('../models/user');
const Message = require('../models/message');
const Users = require('../collections/users');
const Messages = require('../collections/messages');
var jwt = require('jwt-simple');

module.exports = function (app, express, io, activeUsers) {
  app.get('/api/users/active', function(req, res) {
    res.json(activeUsers);
  });

  app.post('/api/users/signup', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    new User({ username: username }).fetch().then(function(found) {
      if (found) {
        res.status(409).json({error: 'user already exists'});
      } else {
        Users.create({
          username: username,
          password: password
        })
        .then(function(newUser) {
          var token = jwt.encode(newUser, 'secret');
          res.json({token: token});
        });
      }
    });
  });

  app.post('/api/users/signin', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    new User({username: username}).fetch().then(function(found) {
      if (found) {
        found.comparePassword(password)
          .then((match) => {
            if (match) {
              var token = jwt.encode(found, 'secret');
              res.json({token: token});
            } else {
              res.status(404).json({error: 'invalid password'});
            }
          });
      } else {
        res.status(404).json({error: 'invalid username'});
      }
    });
  });

  app.get('/api/messages/recent', function(req, res) {
    // let tempMessages = messages.slice(-20);
    // tempMessages.reverse();

    res.json(Messages);
  });

  app.get('*', function(req, res) {
    res.status(404).send('Think your in the wrong place bud');
  });
};
