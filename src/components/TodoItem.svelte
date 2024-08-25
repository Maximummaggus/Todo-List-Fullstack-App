<script>
    import { createEventDispatcher } from 'svelte';

    export let todo;

    const dispatch = createEventDispatcher();

    function handleRemove() {
        dispatch('removeTodo', todo.id);
    }
</script>

<li>
    {todo.text}
    <button on:click={handleRemove}>Remove</button>
    <dropdown/>
</li>

<style>
    li {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    button {
        background-color: red;
        color: white;
        border: none;
        padding: 4px 8px;
        border-radius: 4px;
        cursor: pointer;
    }
</style>
