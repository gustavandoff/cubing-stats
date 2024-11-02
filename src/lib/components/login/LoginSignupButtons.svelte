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

  function handleUpload() {
    dispatch('upload');
  }


</script>

<div>
  <Button on:click={handleLogin}>Log in</Button>
  <Button on:click={handleSignup}>Sign up</Button>
  <Button on:click={handleUpload}>
    <i class="fa-solid fa-upload"></i>
  </Button>
</div>

<style>
  div {
    display: flex;
    gap: 1rem;
    position: absolute;
    right: 1rem;
    top: 1rem;
  }

  .fa-upload {
    font-size: 1.5rem;
  }
</style>