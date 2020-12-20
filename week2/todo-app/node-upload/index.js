const express = require("express");
const bodyPasrser = require("body-parser");
const cors = require("cors");
const path = require('path')
const multer = require('multer')
const fs = require('fs')

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

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (!fs.existsSync(path.join(__dirname, "uploads"))) {
        fs.mkdirSync(path.join(__dirname, "uploads"));
      }
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

app.get("/uploads", (req, res) => {
  const files = fs.readdirSync(path.join(__dirname, "uploads"));
  return res.json(files);
});

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file" });
  return res.send(req.file);
});

const port = process.env.port | 8080;

app.listen(port, () => {
  console.log("listing on port:", port);
});
