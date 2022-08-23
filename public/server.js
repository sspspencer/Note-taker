const { text, application } = require("express");
const express = require("express");
const fs = require("fs");
const path = require("path");
const { title } = require("process");

const PORT = process.env.PORT || 3001;
const app = express();

var notesData = getNotes();

function getNotes() {
  let data = fs.readFileSync("../db/db.json", "utf8");

  let notes = JSON.parse(data);

  for (let i = 0; i < notes.length; i++) {
    notes[i].id = "" + i;
  }
  console.log(notes);
  return notes;
}
app.use(express.json({ limit: "1mb" }));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./notes.html"));
});
app.get("/assets/js/index.js", (req, res) => {
  res.sendFile(path.join(__dirname, "./assets/js/index.js"));
});
app.get("/assets/css/styles.css", (req, res) => {
  res.sendFile(path.join(__dirname, "./assets/css/styles.css"));
});

app.get("/api/notes", function (req, res) {
  notesData = getNotes();
  res.json(notesData);
});
app.post("/api/notes", function (req, res) {
  notesData.push(req.body);
  console.log(req.body);
  fs.writeFileSync("../db/db.json", JSON.stringify(notesData), "utf8");
  res.json(true);
});

app.delete("/api/notes/:id", function (req, res) {
  const id = req.params.id;

  let note = notesData.filter((note) => {
    return note.id === id;
  })[0];

  console.log(note);
  const noteIndex = notesData.indexOf(note);
  notesData.splice(noteIndex, 1);

  fs.writeFileSync("../db/db.json", JSON.stringify(notesData), "utf8");
  res.json("Note deleted");
});

app.get("*", (req, res) => {
  res.sendFile("C:/Users/roxan/Desktop/projects/note-taker/public/index.html");
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
