<script>
    import { createEventDispatcher } from 'svelte';

    export let todo;

    const dispatch = createEventDispatcher();
    let editMode = false;
    let editedText = todo.text;

    function handleRemove() {
        dispatch('removeTodo', todo.id);
    }

    function handleEdit() {
        editMode = true;
    }

    function saveEdit() {
        dispatch('editTodo', { id: todo.id, text: editedText });
        editMode = false;
    }

    function cancelEdit() {
        editMode = false;
        editedText = todo.text; // Reset edited text to original
    }
</script>

<li>
    {#if editMode}
        <input bind:value={editedText} on:keydown={(e) => e.key === 'Enter' && saveEdit()} />
        <button on:click={saveEdit}>Save</button>
        <button on:click={cancelEdit}>Cancel</button>
    {:else}
        {todo.text}
        <button on:click={handleEdit}>Edit</button>
        <button on:click={handleRemove}>Remove</button>
    {/if}
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
        margin-left: 5px;
    }

    input {
        flex: 1;
        margin-right: 5px;
    }
</style>
