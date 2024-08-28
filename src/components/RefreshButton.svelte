<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch('refresh');
    }
</script>

<button on:click={handleClick}>
    Refresh
</button>

<style>
    button {
        padding: 12px;
        background: linear-gradient(45deg, #ff3e00, #ffb300, #1e90ff, #ff3e00);
        background-size: 400% 400%;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        color: white;
        animation: gradient-animation 10s ease infinite;
        margin-left: auto; /* Button wird nach rechts geschoben */
        display: block;
        width: 100%; /* Damit der Button auf kleinen Bildschirmen die volle Breite einnimmt */
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
</style>
