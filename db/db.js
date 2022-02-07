const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const uuid = require('uuid');

// class constructor for db
class DB {
    getDB() {
        return readFile('./db/db.json', 'utf8');
    }

    saveDB(data) {
        return writeFile('./db/db.json', JSON.stringify(data));
    }

    getNotes = () => {
        return this.getDB().then((data) => {
            let notes;
            try {
                notes = [].concat(JSON.parse(data));
            } catch (error) {
                notes = []; 
            }    
            
            return notes;
        });
    }

    saveNote = (note) => {
        const { title, text } = note;
        if (!title || !text) {
            return { error: 'Note must have a title and text' };
        }
        
        const newNote = {
            title,
            text,
            id: uuid()
        };
        
        return this.getNotes()
        .then((notes) => [...notes, newNote])
        .then((notes) => this.saveDB(notes))
        .then(() => newNote);
    }
}

module.exports = new DB();