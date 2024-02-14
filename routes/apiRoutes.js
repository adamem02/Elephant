// routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Define route to read notes from db.json
router.get('/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error reading notes' });
            return;
        }
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

// Define route to save a new note to db.json
router.post('/notes', (req, res) => {
    const newNote = req.body;

    // Read existing notes from db.json
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error reading notes' });
            return;
        }
        const notes = JSON.parse(data);

        // Assign a unique id to the new note
        newNote.id = Date.now().toString();

        // Add the new note to the array of existing notes
        notes.push(newNote);

        // Write updated notes back to db.json
        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), err => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error saving note' });
                return;
            }
            res.json(newNote);
        });
    });
});

module.exports = router;


