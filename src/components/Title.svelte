<script>
    let logoUrl = 'https://svelte.dev/svelte-logo-horizontal.svg';
</script>

<style>
    .gradient-text {
        font-size: 3rem;
        font-weight: bold;
        background: linear-gradient(45deg, #ff3e00, #ffb300, #1e90ff, #ff3e00);
        background-size: 400% 400%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: gradient-animation 10s ease infinite;
    }

    .logo {
        width: 200px;
        height: auto;
        background: linear-gradient(45deg, #ff3e00, #ffb300, #1e90ff, #ff3e00);
        background-size: 400% 400%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: gradient-animation 10s ease infinite;
    }

    .container {
        display: flex;
        align-items: center;
        gap: 21px;
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

    /* Media Queries für handfreundliches Design */
    @media (max-width: 400px) {
        .gradient-text {
            font-size: 2rem;
        }

        .logo {
            width: 150px;
        }

        .container {
            flex-direction: column;
            gap: 10px;
        }
    }
</style>

<div class="container">
    <img class="logo" src={logoUrl} alt="Svelte Logo" />
    <h1 class="gradient-text">Todo App</h1>
</div>
