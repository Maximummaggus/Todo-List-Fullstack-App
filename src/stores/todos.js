import { writable } from 'svelte/store';

// Ein `writable` Store für die Liste der Todos
export const todos = writable([]);

// Funktion zum Abrufen aller Todos vom Backend
export const fetchTodos = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/todos');
        if (response.ok) {
            const data = await response.json();
            todos.set(data.todos);
        } else {
            console.error('Fehler beim Abrufen der Todos');
        }
    } catch (error) {
        console.error('Fetch-Fehler:', error);
    }
};

// Funktion zum Hinzufügen eines neuen Todos
export const addTodo = async (text) => {
    try {
        const response = await fetch('http://localhost:5000/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            throw new Error('Fehler beim Hinzufügen des Todos');
        }

        const newTodo = await response.json();
        todos.update(currentTodos => [...currentTodos, newTodo]);
    } catch (error) {
        console.error(error);
    }
};


// Funktion zum Aktualisieren eines Todos
export const updateTodo = async (id, updatedTodo) => {
    try {
        const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            throw new Error('Fehler beim Bearbeiten des Todos');
        }

        const updatedTodo = await response.json();
        todos.update(currentTodos => currentTodos.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (error) {
        console.error('Fehler:', error);
    }
};

// Funktion zum Löschen eines Todos
export const deleteTodo = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Fehler beim Löschen des Todos');
        }

        todos.update(currentTodos => currentTodos.filter(todo => todo.id !== id));
    } catch (error) {
        console.error('Fehler:', error);
    }
};


export const toggleCompleteTodo = async (id) => {
    try {
        const currentTodos = get(todos); // Importiere `get` von 'svelte/store'
        const todo = currentTodos.find(t => t.id === id);
        if (!todo) throw new Error('Todo nicht gefunden');

        const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: !todo.completed }),
        });

        if (!response.ok) {
            throw new Error('Fehler beim Aktualisieren des Todos');
        }

        const updatedTodo = await response.json();
        todos.update(currentTodos => currentTodos.map(t => t.id === id ? updatedTodo : t));
    } catch (error) {
        console.error('Fehler:', error);
    }
};