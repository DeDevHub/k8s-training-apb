const express = require("express");
const bodyPasrser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.get("/", (req, res) => {
  return res.send("<html><body>Sample made with ♥️</body></html>");
});

app.use(bodyPasrser.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
          fs.mkdirSync(path.join(__dirname, 'uploads'))
        }
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
  }),
});

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file" });
  return res.send(req.file);
});

const port = process.env.port | 8080;

app.listen(port, () => {
  console.log("listing on port:", port);
});
