import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import userRoutes from "./routes/UserRoutes.js";

const app = express();
dotenv.config();
connectDB();
app.use(express.json()); // convert to json format

app.get("/", (req, res) => {
    res.send("personal-note-library API is running on port 5000...");
});

// API endpoint for all ./data/notes
app.get("/api/notes", (req, res) => {
    res.json(notes);
});

// API endpoint for a specific ./data/notes/note
//app.get("/api/notes/:id", (req, res) => {
//    const note = notes.find((n) => n._id === req.params.id);

//    res.send(note);
//});

app.use("api/users", userRoutes);

const PORT = process.env.PORT || 8000;
// Variable for .env port to use in template string below

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}...`
            .yellow
    )
);
