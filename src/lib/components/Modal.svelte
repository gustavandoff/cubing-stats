<script lang="ts">
import { createEventDispatcher, onDestroy, onMount } from 'svelte';
import { modalOpen } from '$lib/solves';

const dispatch = createEventDispatcher();

function closeModal() {
  dispatch('close');
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

onMount(() => {
  window.addEventListener('keydown', handleKeydown);
  $modalOpen = true;
});

onDestroy(() => {
  window.removeEventListener('keydown', handleKeydown);
  $modalOpen = false;
});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="modal-background" on:click={closeModal}></div>
<div class="modal-container">
  <div>
    <button on:click={closeModal}>
      <i class="fas fa-times"></i>
    </button>
    <slot></slot>
  </div>
</div>

<style>
  .modal-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
    z-index: 100;

		display: flex;
		align-items: center;
		justify-content: center;

    pointer-events: none;
	}

  .modal-container > div {
    pointer-events: auto;

    display: flex;
    flex-direction: column;
  }

  .modal-background {
		background-color: rgba(100, 100, 100, 0.3);
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
    z-index: 100;
  }

  button {
    position: relative;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #ffffff;
    cursor: pointer;
    padding: 0;
    margin-right: 1rem;

    text-align: end;

    top: 2.5rem;
  }

  button:hover {
    color: var(--hovered-color);
  }
</style>