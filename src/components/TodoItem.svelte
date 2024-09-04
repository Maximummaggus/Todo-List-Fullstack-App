<script>
    import { todos, addTodo, fetchTodos, clearTodos } from "../stores/todos.js";
    import { writable } from "svelte/store";
    import ClearButton from "./ClearButton.svelte";
    import TodoInput from "./TodoInput.svelte";
    import TodoTable from "./TodoTable.svelte";
    import { onMount } from "svelte";


    onMount(() => {
        fetchTodos(); // Todos laden, wenn die Komponente gemountet wird
    });


    function handleRefresh() {
        console.log("Todos cleared and list refreshed");
    }

    async function handleNewTodoEvent(event) {
        const { text } = event.detail;
        if (text.trim()) {
            await addTodo(text);
        }
    }


</script>

<TodoInput on:newtodo={handleNewTodoEvent} />

<ClearButton on:refresh={handleRefresh} />

<TodoTable todos={$todos} />

<style>

</style>

