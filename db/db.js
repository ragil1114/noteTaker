const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const uuid = require('uuid');

// class constructor for db
class DB {
    getDB() {
        return readFileAsync('./db/db.json', 'utf8');
    }

    saveDB(data) {
        return writeFileAsync('./db/db.json', JSON.stringify(data));
    }

    getNotes = () => {
        return this.getDB().then((data) => {
            let parsednotes;
            try {
                parsednotes = [].concat(JSON.parse(data));
            } catch (error) {
                notes = []; 
            }    
            
            return parsednotes;
        });
    }

    saveNote = (note) => {
        const { title, text } = note;
        if (!title || !text) {
            return { error: 'Note must have a title and text' };
        }
        
        const newNote = { title, text, id: uuid() };
        
        return this.getNotes()
        .then((notes) => [...notes, newNote])
        .then((updatednotes) => this.saveDB(updatednotes))
        .then(() => newNote);
    }

    removeNote = (id) => {
        return this.getNotes()
        .then((notes) => notes.filter((note) => note.id !== id))
        .then((updatednotes) => this.saveDB(updatednotes));
    }
}

module.exports = new DB();