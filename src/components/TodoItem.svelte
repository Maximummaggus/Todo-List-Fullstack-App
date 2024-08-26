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
                item.id === editedTodoId ? {...item, text: editedText} : item
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

<!-- Eingabefeld für neues Todo -->
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
        padding: 12px;
        background: linear-gradient(45deg, #ff3e00, #ffb300, #1e90ff, #ff3e00);
        background-size: 400% 400%;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        color: white;
        animation: gradient-animation 10s ease infinite;
        margin-left: 5px;
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
        justify-content: space-between;
        align-items: center;
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

    /* Media Queries für handfreundliches Design */
    @media (max-width: 400px) {
        input {
            padding: 6px;
            font-size: 0.9rem;
            margin-right: 5px;
        }

        button {
            padding: 8px;
            font-size: 0.9rem;
            margin-left: 3px;
        }

        li {
            padding: 8px;
            font-size: 0.9rem;
        }
    }
</style>
