const db = require('../config/db');

var Message = db.Model.extend({
  tableName: 'messages',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo(require('./user'));
  }
});

module.exports = Message;
