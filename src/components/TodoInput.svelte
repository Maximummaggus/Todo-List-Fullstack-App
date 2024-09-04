<script>
    import { addTodo } from "../stores/todos.js";
    import { createEventDispatcher } from "svelte";

    let newTodo = "";

    // Erstellen eines EventDispatchers
    const dispatch = createEventDispatcher();

    function addNewTodo() {
        if (newTodo.trim()) {
            dispatch("newtodo", { text: newTodo }); // Event nach oben senden
            newTodo = ""; // Eingabefeld leeren
        }
    }
</script>

<div class="input-container">
    <input
            type="text"
            bind:value={newTodo}
            placeholder="Enter a new task..."
            on:keydown={(e) => e.key === "Enter" && addNewTodo()}
    />
    <button on:click={addNewTodo}>Add Todo</button>
</div>

<style>
    .input-container {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 16px;
    }

    input[type="text"] {
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ccc;
        flex: 1;
        min-width: 0;
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

    @media (max-width: 600px) {
        .input-container {
            flex-direction: column;
            gap: 8px;
        }

        input[type="text"] {
            width: 100%;
        }

        button {
            width: 100%;
        }
    }
</style>
