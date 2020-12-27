const express = require("express");

const app = express();
app.get("/", (req, res) => {
  return res.send("<html><body>Sample made with ♥️!</body></html>");
});

const port = process.env.port | 8080;

app.listen(port, () => {
  console.log("listening on port:", port);
});
