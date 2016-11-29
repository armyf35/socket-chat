const db = require('../config/db');
const User = require('./user');

var Message = db.Model.extend({
  tableName: 'messages',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo(User);
  }
});

module.exports = Message;
