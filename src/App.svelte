<script>
  import TodoList from './components/TodoList.svelte';
  import Navbar from "./lib/Navbar.svelte";
  import Dropdown from './lib/dropdown.svelte';
</script>

<main>
  <h1>Simple To-Do App</h1>
  <TodoList />
</main>

<style>
  main {
    font-family: Arial, sans-serif;
    margin: 20px;
  }
</style>
