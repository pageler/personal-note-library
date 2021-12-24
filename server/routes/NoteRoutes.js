import express from "express";
import {
    getNotes,
    createNote,
    getNoteById,
    updateNote,
    deleteNote,
} from "../controllers/NoteController.js";
import { protect } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getNotes);
router.route("/create").post(protect, createNote);
router
    .route("/:id")
    .get(getNoteById)
    .put(protect, updateNote)
    .delete(protect, deleteNote);

export default router;
