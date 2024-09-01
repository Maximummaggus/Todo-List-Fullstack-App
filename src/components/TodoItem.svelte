<script>
    import { todos, addTodo, fetchTodos, clearTodos } from "../stores/todos.js";
    import { writable } from "svelte/store";
    import RefreshButton from "./RefreshButton.svelte";
    import { onMount } from "svelte";

    // const todos = writable([]);

    let newTodo = "";
    let editMode = false;
    let editedTodoId = null;
    let editedText = "";

    async function addNewTodo() {
        console.log("Button clicked"); // Für Debugging
        if (newTodo.trim()) {
            await addTodo(newTodo);
            newTodo = "";
        }
    }

    onMount(() => {
        fetchTodos(); // Todos laden, wenn die Komponente gemountet wird
    });

    // function addTodo() {
    //     if (newTodo.trim()) {
    //         todos.update((items) => [
    //             ...items,
    //             { text: newTodo, id: Date.now(), completed: false },
    //         ]);
    //         newTodo = "";
    //     }
    // }

    function removeTodo(id) {
        todos.update((items) => items.filter((item) => item.id !== id));
    }

    function startEdit(id, text) {
        editMode = true;
        editedTodoId = id;
        editedText = text;
    }

    function saveEdit() {
        todos.update((items) => {
            return items.map((item) =>
                item.id === editedTodoId ? { ...item, text: editedText } : item,
            );
        });
        cancelEdit();
    }

    function cancelEdit() {
        editMode = false;
        editedTodoId = null;
        editedText = "";
    }

    function refreshTodos() {
        console.log("Todos refreshed");
        clearTodos();
    }

    function toggleComplete(id) {
        todos.update((items) =>
            items.map((item) =>
                item.id === id ? { ...item, completed: !item.completed } : item,
            ),
        );
    }
</script>

<!-- <input
    type="text"
    bind:value={newTodo}
    placeholder="Enter a new task..."
    on:keydown={(e) => e.key === "Enter" && addNHewTodo()}
/>
<button on:click={addTodo}>Add Todo</button> -->

<div class="input-container">
    <input
        type="text"
        bind:value={newTodo}
        placeholder="Enter a new task..."
        on:keydown={(e) => e.key === "Enter" && addNewTodo()}
    />
    <button on:click={addNewTodo}>Add Todo</button>
</div>

<RefreshButton on:refresh={refreshTodos} />

<div class="table-container">
    <table>
        <thead>
            <tr>
                <th>Complete</th>
                <th>Task</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each $todos as todo (todo.id)}
                <tr class:completed={todo.completed}>
                    {#if editMode && editedTodoId === todo.id}
                        <td colspan="3">
                            <input
                                bind:value={editedText}
                                on:keydown={(e) =>
                                    e.key === "Enter" && saveEdit()}
                            />
                            <div class="buttons">
                                <button on:click={saveEdit}>Save</button>
                                <button on:click={cancelEdit}>Cancel</button>
                            </div>
                        </td>
                    {:else}
                        <td
                            ><input
                                type="checkbox"
                                checked={todo.completed}
                                on:change={() => toggleComplete(todo.id)}
                            /></td
                        >
                        <td class="todo-content">{todo.text}</td>
                        <td class="buttons">
                            <button
                                on:click={() => startEdit(todo.id, todo.text)}
                                >Edit</button
                            >
                            <button on:click={() => removeTodo(todo.id)}
                                >Remove</button
                            >
                        </td>
                    {/if}
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    input[type="text"] {
        padding: 8px;
        margin-right: 8px;
        border-radius: 4px;
        border: 1px solid #ccc;
        width: calc(100% - 16px);
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

    .table-container {
        width: 100%;
        overflow-x: auto;
        margin-top: 20px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th,
    td {
        padding: 10px;
        border: 1px solid #ddd;
        text-align: left;
        vertical-align: middle;
    }

    td.todo-content {
        word-wrap: break-word;
        overflow-wrap: break-word;
        max-width: 600px;
    }

    td.buttons {
        white-space: nowrap;
        text-align: right;
    }

    tr.completed td.todo-content {
        text-decoration: line-through;
        color: #aaa;
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

    @media (max-width: 600px) {
        .table-container {
            overflow-x: auto;
        }

        table {
            table-layout: fixed;
        }

        th,
        td {
            padding: 8px;
            font-size: 0.9rem;
        }

        td.todo-content {
            word-wrap: break-word;
            overflow-wrap: break-word;
            max-width: none;
        }

        td.buttons {
            text-align: center;
            padding: 8px 0;
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
    }
</style>
