<script>
    import {writable} from 'svelte/store';
    import TodoItem from './TodoItem.svelte';

    let todos = writable([]);
    let newTodo = '';

    function addTodo() {
        if (newTodo.trim()) {
            todos.update(items => [...items, {text: newTodo, id: Date.now()}]);
            newTodo = '';
        }
    }

    function handleRemove(event) {
        const id = event.detail;
        todos.update(items => items.filter(item => item.id !== id));
    }
</script>

<input
        type="text"
        bind:value={newTodo}
        placeholder="Enter a new task..."
        on:keydown={(e) => e.key === 'Enter' && addTodo()}
/>
<button on:click={addTodo}>Add Todo</button>

<ul>
    {#each $todos as todo (todo.id)}
        <TodoItem {todo} on:removeTodo={handleRemove}/>
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

    /* Media Queries für handfreundliches Design */
    @media (max-width: 400px) {
        input {
            padding: 6px;
            font-size: 0.3rem;
            margin-right: 5px;
        }

        button {
            padding: 3px 6px;
            font-size: 0.3rem;
            margin-left: 3px;
        }

        ul {
            padding: 0;
        }

        li {
            padding: 8px;
            font-size: 0.9rem;
        }
    }

</style>
