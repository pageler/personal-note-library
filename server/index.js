import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import userRoutes from "./routes/UserRoutes.js";
import { errorHandler, notFound } from "./middleware/ErrorMiddleware.js";

const app = express();
dotenv.config();
connectDB();
app.use(express.json()); // convert to json format

app.get("/", (req, res) => {
    res.send("personal-note-library API is running on port 5000...");
});

app.use("/api/users", userRoutes);

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
