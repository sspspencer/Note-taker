const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3001;
const app = express();

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./notes.html"));
});
app.get("/assets/js/index.js", (req, res) => {
  res.sendFile(path.join(__dirname, "./assets/js/index.js"));
});
app.get("/assets/css/styles.css", (req, res) => {
  res.sendFile(path.join(__dirname, "./assets/css/styles.css"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
    let jsonData = JSON.parse(data);
    console.log(JSON.stringify(jsonData));
    return res.send(JSON.stringify(jsonData));
  });
});

app.get("*", (req, res) => {
  res.sendFile("C:/Users/roxan/Desktop/projects/note-taker/public/index.html");
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
