const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = `mongodb://${process.env.DBUSER}:${process.env.DBPASS}@ds243798.mlab.com:43798/lg-discord-activity`;

// Database Name
const client;
function connectDB() {
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    client = client;
  });
}


module.exports = {
  connect: connectDB,
  client: client
};