const express = require("express");
const app = express();
const { connectToDb, getDb } = require("./config/Userdb");
const { ObjectId } = require("mongodb");
const PORT = 3000;

app.use(express.static("./static"), express.json());

let db;

//Port/server

connectToDb((err) => {
  if (!err) {
    app.listen(PORT, () => {
      console.log(`The server is running on port : ${PORT} 👌`);
    });
    db = getDb();
  }
});

//controller

app.get("/users", (req, res) => {
  let USER = [];

  db.collection("users")
    .find()
    .forEach((Udata) => USER.push(Udata))
    .then(() => {
      res.status(200).json(USER);
    })
    .catch(() => {
      res.status(500).json({ error: "Could'nt fetch data!" });
    });
});
