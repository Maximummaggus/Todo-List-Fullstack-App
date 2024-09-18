import app from '../server/app.js';
import request from 'supertest';
import { test } from 'node:test';
import assert from 'assert';

// Test für das Abrufen aller Todos
test('GET /api/todos - Should return all todos', async () => {
    const response = await request(app).get('/api/todos');
    assert.strictEqual(response.statusCode, 200);
    assert(Array.isArray(response.body.todos)); // Prüft, ob es ein Array ist
});

// Test für das Erstellen eines neuen Todos
test('POST /api/todos - Should create a new todo', async () => {
    const newTodo = { text: 'Test Todo' };
    const response = await request(app).post('/api/todos').send(newTodo);

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.text, newTodo.text);
    assert.strictEqual(response.body.completed, false);
});

// Test für das Aktualisieren eines Todos
test('PUT /api/todos/:id - Should update a todo', async () => {
    const updatedTodo = { text: 'Updated Todo' };
    const response = await request(app).put('/api/todos/1').send(updatedTodo); // Existierende ID zum Testen verwenden

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.text, updatedTodo.text);
});

// Test für das Löschen eines Todos
test('DELETE /api/todos/:id - Should delete a todo', async () => {
    const response = await request(app).delete('/api/todos/1'); // Existierende ID zum Testen verwenden
    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.deletedID, '1'); // Bestätigt, dass die ID gelöscht wurde
});

// Test für das Löschen aller Todos
test('DELETE /api/todos - Should delete all todos and reset the ID counter', async () => {
    const response = await request(app).delete('/api/todos');
    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.message, 'Alle Todos wurden gelöscht und ID-Zähler zurückgesetzt');
});

// Test für das Umschalten des Status eines Todos
test('PATCH /api/todos/:id - Should toggle the completed status of a todo', async () => {
    // Erstellt ein neues Todo, das später aktualisiert wird
    const newTodo = { text: 'Test Todo' };
    const createResponse = await request(app)
        .post('/api/todos')
        .send(newTodo);

    const todoId = createResponse.body.id;

    // Führe den PATCH-Request aus, um den Status zu toggeln
    const response = await request(app)
        .patch(`/api/todos/${todoId}`)
        .send({ completed: true });

    assert.strictEqual(response.statusCode, 200); // Erwartet Status 200

    // Ändere den Check, um 1 statt true zu erwarten
    assert.strictEqual(response.body.completed, 1); // Erwartet, dass 'completed' auf 1 gesetzt wurde
});



