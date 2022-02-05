const router = require('express').Router();
const db = require('../db/db.js');

router.get('notes', (req, res) => {
    res.status(200).json(JSON.parse(db.getNotes()));
});

router.post('/notes', (req, res) => {
    const newNote = req.body;
    const notes = JSON.parse(db.getNotes());
    const duplicateNote = notes.find(note => note.title === newNote.title);
    if (!duplicateNote) {
        notes.push(newNote);
        db.saveNotes(JSON.stringify(notes));
        res.status(200).json(notes);
    } else {
        res.status(400).json({ error: 'Note title must be unique' });
    }
});

module.exports = router;