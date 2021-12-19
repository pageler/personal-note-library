const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const colors = require("colors");

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("personal-note-library API is running on port 5000...");
});

// API endpoint for all ./data/notes
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// API endpoint for a specific ./data/notes/note
app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((n) => n._id === req.params.id);

  res.send(note);
});

const PORT = process.env.PORT || 8000; // Variable for .env port to use in template string below

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}...`.yellow
      .bold
  )
);
