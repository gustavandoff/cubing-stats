<script lang="ts">
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export let destructive: boolean = false;

function handleCLick() {
  dispatch('click');
}

</script>

<button on:click={handleCLick} class:destructive={destructive}>
  <slot></slot>
</button>

<style>
  button {
    background-color: #222;
    color: white;
    border: none;
		border-radius: var(--border-radius);
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background-color: #333;
    }

    &:active {
      background-color: #444;
    }
  }

  .destructive {
		background-color: #ff0000;

		&:hover {
			background-color: #990000;
		}

		&:active {
			background-color: #660000;
		}
	}
</style>