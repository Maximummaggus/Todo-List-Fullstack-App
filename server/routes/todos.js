import express from 'express';
import db from '../models/Todo.js';
const router = express.Router();

// Alle Todos abrufen
router.get('/', (req, res) => {
    db.all('SELECT * FROM todos', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ todos: rows });
    });
});

// Ein neues Todo erstellen
router.post('/', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }
    db.run('INSERT INTO todos (text, completed) VALUES (?, ?)', [text, false], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, text, completed: false });
    });
});


// Ein Todo aktualisieren
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }
    db.run('UPDATE todos SET text = ? WHERE id = ?', [text, id], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json({ id, text, completed: false }); // Aktualisiere je nach Bedarf
    });
});

// Ein Todo löschen
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM todos WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ deletedID: id });
    });
});


// PATCH Todo (Toggle Complete)
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    db.run('UPDATE todos SET completed = ? WHERE id = ?', [completed, id], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        // Rückgabe des aktualisierten Todos
        db.get('SELECT * FROM todos WHERE id = ?', id, (err, row) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(row);
        });
    });
});


export default router;
