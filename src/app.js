const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const db = require("./db");

app.use(bodyParser.json());
const collection = "todos";

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./view/index.html"));
});

app.get("/todos", (req, res) => {
  db.getDB()
    .collection(collection)
    .find({})
    .toArray((err, documents) => {
      if (err) {
        console.log(err);
      } else {
        console.log(documents);
        res.json(documents);
      }
    });
});

app.post("/", (req, res) => {
  const userInput = req.body;

  db.getDB()
    .collection(collection)
    .insertOne(userInput, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ result: result, document: result.ops[0] });
      }
    });
});

// postman link https://www.getpostman.com/collections/0dc4ec892c046b6adfa2
app.put("/:id", (req, res) => {
  const todoId = req.params.id;
  const userInput = req.body;

  console.log(db.getPrimaryKey(todoId));
  db.getDB()
    .collection(collection)
    .findOneAndUpdate(
      { _id: db.getPrimaryKey(todoId) },
      { $set: { description: userInput.description } },
      { returnOriginal: false },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      }
    );
});

app.delete("/:id", (req, res) => {
  const todoId = req.params.id;

  db.getDB()
    .collection(collection)
    .findOneAndDelete({ _id: db.getPrimaryKey(todoId) }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
});

db.connect(err => {
  if (err) {
    console.log("unable to connect");
    process.exit(1);
  } else {
    app.listen(3000, () => {
      console.log("Connected to database, app listening on port 3000");
    });
  }
});
