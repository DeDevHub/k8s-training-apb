const express = require("express");
const bodyPasrser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(bodyPasrser.urlencoded({ extended: true }));
app.use(bodyPasrser.json({inflate: true}))

// set default res headers
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );

  res.setHeader("Access-Control-Allow-Headers", "content-type, x-access-token");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(cors({ origin: true }));
app.options("*", cors({ origin: true }));

app.get("/", (req, res) => {
  return res.send("<html><body>Sample made with ♥️</body></html>");
});

app.get("/todos", (req, res) => {
  db.query('SELECT * FROM todo', function(err, result) {
    if (err) throw err
    // console.log(result)
    return res.json(result)
  });
});

app.post("/todos", (req, res) => {
  const text = req.body.text
  db.query('INSERT INTO todo(text, status) VALUES(?, FALSE)', [text], function(err, result) {
    if (err) throw err
    
    return res.json({
      id: result.insertId,
      text: text,
      status: false
    })
  });
});

app.put("/todos/:id", (req, res) => {
  const id = req.params.id
  const text = req.body.text
  const status = req.body.status
  db.query('UPDATE todo SET text = ?, status = ? WHERE id = ?', [text, status, id], function(err, result) {
    if (err) throw err
    return res.json({
      id: id,
      text: text,
      status: status
    })
  });
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id
  db.query('DELETE FROM todo WHERE id = ?', [id], function(err, result) {
    if (err) throw err
    return res.status(200).end()
  });
});

const port = process.env.port | 9090;

db.getConnection(function (err, connection) {
  if (err) throw err
  console.log("DB Conecction successful");
  app.listen(port, () => {
    console.log("listing on port:", port);
  });
});
