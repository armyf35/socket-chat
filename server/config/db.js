var path = require('path');
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgres://postgres:test@localhost:5432/socketclient',
  useNullAsDefault: true
});
var db = require('bookshelf')(knex);

db.knex.schema.hasTable('users').then(function(exists) {
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
  if (!exists) {
    db.knex.schema.createTable('messages', function (messages) {
      messages.increments('id').primary();
      messages.text('text');
      messages.integer('user_id');
      messages.timestamps(true, true);
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('channels').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('channels', function (channels) {
      channels.increments('id').primary();
      channels.text('name');
      channels.timestamps(true, true);
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('channels_users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('channels_users', function (channelsUsers) {
      channelsUsers.increments('id').primary();
      channelsUsers.integer('channel_id');
      channelsUsers.integer('user_id');
      channelsUsers.timestamps(true, true);
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
