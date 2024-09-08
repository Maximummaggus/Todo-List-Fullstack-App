import { writable, get } from 'svelte/store';

// Ein `writable` Store für die Liste der Todos
export const todos = writable([]);

// Funktion zum Abrufen aller Todos vom Backend
export const fetchTodos = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/todos');
        if (response.ok) {
            const data = await response.json();
            console.log('Todos geladen:', data.todos);
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
    console.log('Hinzufügen eines Todos:', text);
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
    console.log('Aktualisieren eines Todos:', id, updatedTodo);
    try {
        const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: updatedTodo.text }), // Aktualisiert nur den Text
        });

        if (!response.ok) {
            throw new Error('Fehler beim Bearbeiten des Todos');
        }

        const updatedTodoFromApi = await response.json();
        todos.update(currentTodos => currentTodos.map(todo => todo.id === id ? updatedTodoFromApi : todo));
    } catch (error) {
        console.error('Fehler:', error);
    }
};


// Funktion zum Löschen eines Todos
export const deleteTodo = async (id) => {
    console.log('Löschen eines Todos:', id);
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

// Funktion zum Löschen aller Todos
export const clearTodos = async () => {
    console.log('Löschen aller Todos');  // Loggen des Vorgangs
    try {
        const response = await fetch('http://localhost:5000/api/todos', {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Fehler beim Löschen der Todos');
        }

        todos.set([]); // Leere den Store
    } catch (error) {
        console.error('Fehler:', error);
    }
};


export const toggleCompleteTodo = async (id) => {
    console.log('Umschalten des Todo-Status:', id);  // Loggen des Vorgangs
    try {
        const currentTodos = get(todos); // Holt die aktuelle Liste der Todos
        const todo = currentTodos.find(t => t.id === id);
        if (!todo) throw new Error('Todo nicht gefunden');

        // Umschalten des Status (completed) des Todos
        const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: !todo.completed }), // Toggelt den Status
        });

        if (!response.ok) {
            throw new Error('Fehler beim Aktualisieren des Todos');
        }

        const updatedTodo = await response.json();

        // Aktualisieren des Stores, um die Änderungen anzuzeigen
        todos.update(currentTodos =>
            currentTodos.map(t => t.id === id ? updatedTodo : t)
        );
    } catch (error) {
        console.error('Fehler beim Umschalten des Todo-Status:', error);
    }
};