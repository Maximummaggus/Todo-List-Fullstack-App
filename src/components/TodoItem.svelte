<script>
    import {todos, fetchTodos, clearTodos} from "../stores/todos.js";
    import ClearButton from "./ClearButton.svelte";
    import TodoInput from "./TodoInput.svelte";
    import TodoTable from "./TodoTable.svelte";
    import {onMount} from "svelte";

    onMount(() => {
        fetchTodos(); // Todos laden, wenn die Komponente gemountet wird
    });

    function handleRefresh() {
        console.log("Todos cleared and list refreshed");
    }

</script>

<TodoInput/>

<ClearButton on:refresh={handleRefresh}/>

<TodoTable todos={$todos}/>

<style>
</style>
