<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function handleClick() {
        // Dispatch an event to inform the parent component to refresh the todo list
        dispatch('refresh');
    }
</script>

<button on:click={handleClick}>
    Refresh
</button>

<style>
    button {
        padding: 8px 12px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
</style>
