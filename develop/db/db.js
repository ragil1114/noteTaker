const fs = require('fs');
const { dirname } = require('path');
const path = require('path');

module.exports.getNotes = () => {
    return fs.readFileSync(path.join(__dirname + '/db.json'), 'utf8');
}

module.exports.addNote = (title, body) => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname + './db.json', 'utf8')));
    const newNote = {
        title,
        body
    };
    notes.push(newNote);
    fs.writeFileSync(path.join(__dirname + './db.json', 'utf8'), JSON.stringify(notes));
    return newNote;
}