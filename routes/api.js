const router = require('express').Router();
const db = require('../db/db.js');

router.get('/notes', (req, res) => {
    db.getNotes().then((notes) => {
        res.json(notes);
    });
});

router.post('/notes', (req, res) => {
    const newNote = req.body;
    db.saveNote(newNote)
    .then((note) => {
        res.status(201).json(note);
    })
    .catch((err) => {
        res.status(500).json(err);
    });  
});

module.exports = router;