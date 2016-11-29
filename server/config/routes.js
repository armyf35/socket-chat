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

  app.get('/api/messages/', function(req, res) {
    Messages.orderBy('-created_at')
      .fetch({withRelated: ['user']})
      .then((rows) => {
        res.json(rows);
      });
  });

  app.post('/api/messages/new', function(req, res) {
    let msg = req.body;

    new User({ username: msg.username })
      .fetch()
      .then((found) => {
        Messages.create({
          text: msg.text,
          user_id: found.id
        })
        .then((newMessage) => {
          newMessage.fetch({withRelated: ['user']})
          .then((newMessageComplete) => {
            io.emit('message', newMessageComplete);
            res.json(newMessageComplete);
          });
        });
      });
  });

  app.get('*', function(req, res) {
    res.status(404).send('Think your in the wrong place bud');
  });
};
