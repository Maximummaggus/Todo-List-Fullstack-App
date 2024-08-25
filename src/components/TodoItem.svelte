<script>
    import { writable } from 'svelte/store';
    import RefreshButton from './RefreshButton.svelte';

    // Die Todo-Liste als writable store
    const todos = writable([]);

    // Variablen für das neue Todo und den Bearbeitungsmodus
    let newTodo = '';
    let editMode = false;
    let editedTodoId = null;
    let editedText = '';

    // Funktion zum Hinzufügen eines neuen Todos
    function addTodo() {
        if (newTodo.trim()) {
            todos.update(items => [...items, { text: newTodo, id: Date.now() }]);
            newTodo = '';
        }
    }

    // Funktion zum Entfernen eines Todos
    function removeTodo(id) {
        todos.update(items => items.filter(item => item.id !== id));
    }

    // Funktion zum Aktivieren des Bearbeitungsmodus
    function startEdit(id, text) {
        editMode = true;
        editedTodoId = id;
        editedText = text;
    }

    // Funktion zum Speichern der bearbeiteten Aufgabe
    function saveEdit() {
        todos.update(items => {
            return items.map(item =>
                item.id === editedTodoId ? {...item, text: editedText} : item
            );
        });
        cancelEdit();
    }

    // Funktion zum Abbrechen der Bearbeitung
    function cancelEdit() {
        editMode = false;
        editedTodoId = null;
        editedText = '';
    }

    // Funktion zum Aktualisieren der Todo-Liste
    function refreshTodos() {
        // Logik zum Aktualisieren der Liste, z.B. von einer API oder einfach nur Neu-Laden
        console.log('Todos refreshed');
    }

</script>

<!-- Eingabefeld für neues Todo -->
<input
        type="text"
        bind:value={newTodo}
        placeholder="Enter a new task..."
        on:keydown={(e) => e.key === 'Enter' && addTodo()}
/>
<button on:click={addTodo}>Add Todo</button>

<!-- Button zum Aktualisieren der Liste -->
<RefreshButton on:refresh={refreshTodos}/>

<!-- Liste der Todos -->
<ul>
    {#each $todos as todo (todo.id)}
        <li>
            {#if editMode && editedTodoId === todo.id}
                <input
                        bind:value={editedText}
                        on:keydown={(e) => e.key === 'Enter' && saveEdit()}
                />
                <button on:click={saveEdit}>Save</button>
                <button on:click={cancelEdit}>Cancel</button>
            {:else}
                {todo.text}
                <button on:click={() => startEdit(todo.id, todo.text)}>Edit</button>
                <button on:click={() => removeTodo(todo.id)}>Remove</button>
            {/if}
        </li>
    {/each}
</ul>

<style>
    input {
        padding: 8px;
        margin-right: 8px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }

    button {
        padding: 8px 12px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-left: 5px;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
