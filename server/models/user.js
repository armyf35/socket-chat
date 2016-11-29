const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function() {
    this.on('creating', this.hashPassword);
  },
  comparePassword: function(attemptedPassword, callback) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
        if (err) {
          reject(err);
        } else {
          resolve(isMatch);
        }
      });
    });
  },
  hashPassword: function() {
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.get('password'), null, null).bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  },
  messages: function() {
    return this.hasMany(require('./message'));
  }
});

module.exports = User;
