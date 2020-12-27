const express = require("express");

const app = express();
app.get("/", (req, res) => {
  return res.send("<html><body>Sample made with ♥️<br />This is version 2</body></html>");
});

app.get('/error', (req, res) => {
  process.exit(1);
});

const port = process.env.port || 8080;

app.listen(port, () => {
  console.log("listening on port:", port);
});
