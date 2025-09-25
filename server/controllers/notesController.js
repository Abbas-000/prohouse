const asyncErrorHandler = require('../middlewares/helpers/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');

// In-memory data structure
let notes = [];
let currentId = 1;

// Get Single Note Details
exports.getSingleNoteDetails = asyncErrorHandler(async (req, res, next) => {

    const note = notes.find(n => n.id === parseInt(req.params.id));

    if (!note) {
        return next(new ErrorHandler("Note Not Found", 404));
    }

    res.status(200).json({
        success: true,
        note,
    });
});

// Update Note
exports.updateNote = asyncErrorHandler(async (req, res, next) => {
    const note = notes.find(n => n.id === parseInt(req.params.id));

    if (!note) {
        return next(new ErrorHandler("Note Not Found", 404));
    }

    const { title, content } = req.body;
    note.title = title || note.title;
    note.content = content || note.content;

    res.status(200).json({
        success: true,
        note,
    });
});

// Delete Note
exports.deleteNote = asyncErrorHandler(async (req, res, next) => {
    const noteIndex = notes.findIndex(n => n.id === parseInt(req.params.id));

    if (noteIndex === -1) {
        return next(new ErrorHandler("Note Not Found", 404));
    }

    notes.splice(noteIndex, 1);

    res.status(200).json({
        success: true,
        message: "Note deleted successfully",
    });
});

// Create New Note
exports.newNote = asyncErrorHandler(async (req, res, next) => {
    const { title, content } = req.body;

    const note = {
        id: currentId++,
        title,
        content,
        createdAt: new Date(),
    };

    notes.push(note);

    res.status(201).json({
        success: true,
        note,
    });
});

// Get All Notes
exports.getAllNotes = asyncErrorHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        notes,
    });
});

