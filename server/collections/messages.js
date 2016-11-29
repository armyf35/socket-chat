var db = require('../config/db');
var Message = require('../models/message');

var Messages = new db.Collection();

Messages.model = Message;

module.exports = Messages;
