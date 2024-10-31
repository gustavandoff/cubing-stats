<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let type: "submit" | "button" | "reset" | null | undefined;

  const dispatch = createEventDispatcher();
</script>

<button type={type} on:click={() => dispatch('click')}>
  <slot></slot>
</button>

<style>
  button {
		width: 100%;
		padding: 0.5rem;
    margin: 0;
		border: none;
		border-radius: var(--border-radius);
		cursor: pointer;
	}

	button:hover {
    background-color: var(--hovered-color);
	}
</style>