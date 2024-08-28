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

<ul>
    {#each $todos as todo (todo.id)}
        <li>
            {#if editMode && editedTodoId === todo.id}
                <input
                    bind:value={editedText}
                    on:keydown={(e) => e.key === 'Enter' && saveEdit()}
                />
                <div class="buttons">
                    <button on:click={saveEdit}>Save</button>
                    <button on:click={cancelEdit}>Cancel</button>
                </div>
            {:else}
                <div class="todo-content">{todo.text}</div>
                <div class="buttons">
                    <button on:click={() => startEdit(todo.id, todo.text)}>Edit</button>
                    <button on:click={() => removeTodo(todo.id)}>Remove</button>
                </div>
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
        flex-grow: 1;
        min-width: 150px;
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

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
    }

    li .todo-content {
        flex: 1;
        min-width: 0; /* Wichtig, damit flex-grow funktioniert */
        margin-right: 10px;
        word-wrap: break-word;
        overflow-wrap: break-word;
    }

    li .buttons {
        display: flex;
        gap: 10px;
        white-space: nowrap; /* Verhindert Zeilenumbruch in Buttons */
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
            margin-right: 5px;
            flex-basis: 100%;
        }

        button {
            padding: 8px;
            font-size: 0.9rem;
            margin-left: 0;
            margin-top: 5px;
            width: 100%;
        }

        li {
            flex-direction: column;
            align-items: flex-start;
        }

        li .buttons {
            width: 100%;
            justify-content: flex-end;
        }
    }
</style>
