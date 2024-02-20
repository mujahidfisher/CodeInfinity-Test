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

app.get("/user/:id", (req, res) => {
    const { id } = req.params;
    if (ObjectId.isValid(req.params.id)) {
      db.collection("users")
        .findOne({ _id: new ObjectId(id) })
        .then((doc) => {
          res.status(200).json(doc);
        })
        .catch((err) => {
          res.status(500).json({ error: "Could'nt fetch data." });
        });
    } else {
      res.status(500).json({ error: "Not a valid data id" });
    }
  });

app.post("/register", (req, res) => {
  const USER = req.body;
  db.collection("users")
    .insertOne(USER)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).status({ error: "Error could not post" });
    });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  if (ObjectId.isValid(req.params.id)) {
    db.collection("users")
      .deleteOne({ _id: new ObjectId(id) })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could'nt fetch data." });
      });
  } else {
    res.status(500).json({ error: "Not a valid data id" });
  }
});
