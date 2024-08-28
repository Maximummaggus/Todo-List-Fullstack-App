<script>
    import { writable } from 'svelte/store';
    import RefreshButton from './RefreshButton.svelte';

    const todos = writable([]);

    let newTodo = '';
    let editMode = false;
    let editedTodoId = null;
    let editedText = '';

    function addTodo() {
        if (newTodo.trim()) {
            todos.update(items => [...items, { text: newTodo, id: Date.now() }]);
            newTodo = '';
        }
    }

    function removeTodo(id) {
        todos.update(items => items.filter(item => item.id !== id));
    }

    function startEdit(id, text) {
        editMode = true;
        editedTodoId = id;
        editedText = text;
    }

    function saveEdit() {
        todos.update(items => {
            return items.map(item =>
                item.id === editedTodoId ? { ...item, text: editedText } : item
            );
        });
        cancelEdit();
    }

    function cancelEdit() {
        editMode = false;
        editedTodoId = null;
        editedText = '';
    }

    function refreshTodos() {
        console.log('Todos refreshed');
    }
</script>

<input
    type="text"
    bind:value={newTodo}
    placeholder="Enter a new task..."
    on:keydown={(e) => e.key === 'Enter' && addTodo()}
/>
<button on:click={addTodo}>Add Todo</button>

<RefreshButton on:refresh={refreshTodos}/>

<table>
    <thead>
        <tr>
            <th>Task</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {#each $todos as todo (todo.id)}
        <tr>
            {#if editMode && editedTodoId === todo.id}
            <td colspan="2">
                <input
                    bind:value={editedText}
                    on:keydown={(e) => e.key === 'Enter' && saveEdit()}
                />
                <div class="buttons">
                    <button on:click={saveEdit}>Save</button>
                    <button on:click={cancelEdit}>Cancel</button>
                </div>
            </td>
            {:else}
            <td class="todo-content">{todo.text}</td>
            <td class="buttons">
                <button on:click={() => startEdit(todo.id, todo.text)}>Edit</button>
                <button on:click={() => removeTodo(todo.id)}>Remove</button>
            </td>
            {/if}
        </tr>
        {/each}
    </tbody>
</table>

<style>
    input {
        padding: 8px;
        margin-right: 8px;
        border-radius: 4px;
        border: 1px solid #ccc;
        width: calc(100% - 16px); /* Vollständige Breite für Eingabefeld */
    }

    button {
        padding: 12px;
        background: linear-gradient(45deg, #ff3e00, #ffb300, #1e90ff, #ff3e00);
        background-size: 400% 400%;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        color: white;
        animation: gradient-animation 10s ease infinite;
        font-size: 1rem;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }

    th, td {
        padding: 10px;
        border: 1px solid #ddd;
        text-align: left;
        vertical-align: middle;
    }

    td.todo-content {
        word-wrap: break-word;
        overflow-wrap: break-word;
        max-width: 600px; /* Setze eine maximale Breite für den Textbereich */
    }

    td.buttons {
        white-space: nowrap;
        text-align: right;
    }

    @keyframes gradient-animation {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    @media (max-width: 400px) {
        input {
            padding: 6px;
            font-size: 0.9rem;
            width: calc(100% - 12px);
        }

        button {
            padding: 8px;
            font-size: 0.9rem;
            width: 100%;
            margin-top: 5px;
        }

        td.todo-content {
            max-width: 100%;
        }

        td.buttons {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 5px;
        }
    }
</style>
