<script lang="ts">
  import Button from "../Button.svelte";

  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function handleLogin() {
    dispatch('login');
  }

  function handleSignup() {
    dispatch('signup');
  }


</script>

<div>
  <Button on:click={handleLogin}>Log in</Button>
  <Button on:click={handleSignup}>Sign up</Button>
</div>

<style>
  div {
    display: flex;
    gap: 1rem;
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
</style>