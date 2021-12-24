import asyncHandler from "express-async-handler";
import Note from "../models/NoteModel.js";

// @desc    Get logged in user notes
// @route   GET /api/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
});

//@description     Create single Note
//@route           GET /api/notes/create
//@access          Private
const createNote = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
        res.status(400);
        throw new Error("Please fill in all the fields");
        return;
    } else {
        const note = new Note({ user: req.user._id, title, content, category });
        const createNote = await note.save();
        res.status(201).json(createNote);
    }
});

//@description     Fetch single Note
//@route           GET /api/notes/:id
//@access          Public
const getNoteById = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id); // MongoDB query

    if (note) {
        res.json(note);
    } else {
        res.status(404).json({ message: "Note not found" });
    }
});

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;

    const note = await Note.findById(req.params.id); // Find note to update

    // User id matches note id:
    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You can't perform this action");
    }

    // Update user.body
    if (note) {
        note.title = title;
        note.content = content;
        note.category = category;

        // Save update
        const updatedNote = await note.save();
        res.json(updatedNote); // Response back to user
    } else {
        res.status(404);
        throw new Error("Note not found");
    }
});

//@description     Delete single Note
//@route           GET /api/notes/:id
//@access          Private
const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You can't perform this action");
    }

    if (note) {
        await note.remove();
        res.json({ message: "Note Removed" });
    } else {
        res.status(404);
        throw new Error("Note Not Found");
    }
});

export { getNotes, createNote, getNoteById, updateNote, deleteNote };
