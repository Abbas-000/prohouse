const express = require('express');
const { newNote, getAllNotes, getSingleNoteDetails, updateNote, deleteNote } = require('../controllers/notesController');

const router = express.Router();

router.route('/notes').post(newNote);
router.route('/notes').get(getAllNotes);
router.route('/notes/:id').get(getSingleNoteDetails);
router.route('/notes/:id').put(updateNote);
router.route('/notes/:id').delete(deleteNote);

module.exports = router;