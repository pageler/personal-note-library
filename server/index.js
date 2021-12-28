import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import userRoutes from "./routes/UserRoutes.js";
import noteRoutes from "./routes/NoteRoutes.js";
import { errorHandler, notFound } from "./middleware/ErrorMiddleware.js";
import path from "path";

const app = express();
dotenv.config();
connectDB();
app.use(express.json()); // convert to json format

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

// --------- deployment code ---------------

const __dirname = path.resolve();
// change ./env to NODE_ENV=production from NODE_ENV=development
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
} else {
    // Route for testing not production:
    app.get("/", (req, res) => {
        res.send("personal-note-library API is running on port 5000...");
    });
}

// --------- end deployment ----------------

// Error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
// Variable for .env port to use in template string below

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}...`
            .yellow
    )
);
