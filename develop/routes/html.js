const router = require('express').Router();

router.get('/notes', (req, res) => {
    res.status(200).send(path.join(__dirname, '../public/notes.html'));
});

router.get('*', (req, res) => {
    res.status(200).send(path.join(__dirname, '../public/index.html'));
});

module.exports = router;