var path = require('path');
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgres://postgres:test@localhost:5432/socketclient',
  useNullAsDefault: true
});
var db = require('bookshelf')(knex);

db.knex.schema.hasTable('users').then(function(exists) {
  // if (exists) {
  //   db.knex.schema.dropTable('users');
  // }
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 100).unique();
      user.string('password', 100);
      user.timestamps(true, true);
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('messages').then(function(exists) {
  // if (exists) {
  //   db.knex.schema.dropTable('messages');
  // }
  if (!exists) {
    db.knex.schema.createTable('messages', function (messages) {
      messages.increments('id').primary();
      messages.text('text');
      messages.integer('user_id');
      messages.text('created_at');
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
