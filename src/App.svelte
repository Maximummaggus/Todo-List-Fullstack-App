<script>
  import TodoItem from "./components/TodoItem.svelte";
  import Title from "./components/Title.svelte";
</script>

<main>
  <Title />
  <TodoItem />
</main>

<style>
  main {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
    font-family: Arial, sans-serif;
  }

  @media (max-width: 600px) {
    main {
      padding: 0.5rem;
      max-width: 100%;
    }
  }

  @media (max-width: 400px) {
    main {
      padding: 0.5rem;
      max-width: 100%;
      box-shadow: none;
    }
  }
</style>
