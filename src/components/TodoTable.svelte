<script>
    import {todos, deleteTodo, updateTodo, toggleCompleteTodo} from "../stores/todos.js";

    let editMode = false;
    let editedTodoId = null;
    let editedText = "";

    // Funktion zum Starten der Bearbeitung eines Todos
    function startEdit(id, text) {
        editMode = true;
        editedTodoId = id;
        editedText = text;
    }

    // Funktion zum Speichern der Änderungen an einem Todo
    async function saveEdit() {
        if (editedText.trim()) {
            const updatedTodo = {
                id: editedTodoId,
                text: editedText
            };

            await updateTodo(editedTodoId, updatedTodo); // Hier wird jetzt das vollständige Todo übergeben
            cancelEdit(); // Bearbeitungsmodus beenden
        }
    }

    // Bearbeitungsmodus abbrechen
    function cancelEdit() {
        editMode = false;
        editedTodoId = null;
        editedText = "";
    }

    // Funktion zum Entfernen eines Todos
    async function removeTodo(id) {
        await deleteTodo(id); // Verwende die deleteTodo Funktion aus dem Store
    }

    // Funktion zum Umschalten des "Complete"-Status
    async function toggleComplete(id) {
        await toggleCompleteTodo(id); // Verwende die toggleCompleteTodo Funktion aus dem Store
    }
</script>

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
                                on:keydown={(e) => e.key === "Enter" && saveEdit()}
                        />
                        <div class="buttons">
                            <button on:click={saveEdit}>Save</button>
                            <button on:click={cancelEdit}>Cancel</button>
                        </div>
                    </td>
                {:else}
                    <td>
                        <input
                                type="checkbox"
                                checked={todo.completed}
                                on:change={() => {
        console.log('Checkbox clicked for todo:', todo); // Debugging
        toggleComplete(todo.id);
    }}
                        />
                    </td>
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
</div>

<style>
    .table-container {
        width: 100%;
        overflow-x: auto;
        margin-top: 20px;
        border-radius: 4px; /* Abrundung der äußeren Ecken */
        border: 1px solid #ddd; /* Umrandung hinzufügen */
    }

    table {
        width: 100%;
        border-collapse: collapse;
        border-radius: 4px; /* Abrundung der inneren Ecken der Tabelle */
        overflow: hidden; /* Damit die abgerundeten Ecken korrekt angezeigt werden */
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
        button {
            padding: 8px;
            font-size: 0.9rem;
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
