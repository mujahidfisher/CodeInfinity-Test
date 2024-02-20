const { MongoClient } = require("mongodb");

//MongoDB-Connection

module.exports = {
  connectToDb: (callback) => {
    MongoClient.connect("mongodb://localhost:27017/UsersDB")
      .then((client) => {
        dbConnection = client.db();
        return callback();
      })
      .catch((err) => {
        console.log(err);
        return callback(err);
      });
  },
  getDb: () => dbConnection,
};
