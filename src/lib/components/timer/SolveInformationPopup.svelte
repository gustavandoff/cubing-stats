<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { draw3x3Scramble } from '$lib/scrambler';
  import { removeSolve } from '$lib/solves';

	export let solve: Solve;
	export let onClose: () => void;
	export let popupParent: HTMLElement;

	let popupContent: HTMLElement;

	function handleClickOutside(event: MouseEvent) {
		if (
			popupContent &&
			!popupContent.contains(event.target as Node) &&
			popupParent &&
			!popupParent.contains(event.target as Node)
		) {
			onClose();
		}
	}

  function handleDelete() {
    removeSolve(1, solve.scramble || '', solve.timeInHundredths);
    onClose();
  }

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
	});

	onDestroy(() => {
		document.removeEventListener('click', handleClickOutside);
	});
</script>

<div class="popup-content" bind:this={popupContent}>
	<div class="popup-body">
		<span class="time">{solve.time}</span>
		<span class="scramble">{solve.scramble}</span>
		<span>
			{@html draw3x3Scramble(solve.scramble || '')}
		</span>
		<span>{solve.comment}</span>
		<span class="date">{solve.date}</span>
		<div class="solve-control-group">
      <div>
        <button>+2</button>
        <button>DNF</button>
      </div>
			<button class="delete-button" on:click={handleDelete}>Delete</button>
		</div>
	</div>
</div>

<style>
	.popup-content {
		color: #fff;
		cursor: auto;

		background-color: #555555;

		position: absolute;
		padding: 1rem;
		border-radius: 0.5rem;
	}

	.popup-body {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.time {
		font-size: 2rem;
		margin-top: 1rem;
	}

	.scramble {
		font-size: 1.25rem;
    white-space: nowrap;
	}

	.date {
		font-size: 1rem;
	}

	.solve-control-group {
		display: flex;
		gap: 1rem;
    justify-content: space-between;
	}

	button {
		background-color: #333333;
		color: #fff;
		border: none;
		border-radius: 0.25rem;
		padding: 0.5rem 1rem;
		cursor: pointer;

		&:hover {
			background-color: #444444;
		}

		&:active {
			background-color: #222222;
		}
	}

	.delete-button {
		background-color: #ff0000;

		&:hover {
			background-color: #cc0000;
		}

		&:active {
			background-color: #aa0000;
		}
	}
</style>
