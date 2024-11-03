<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { draw3x3Scramble } from '$lib/puzzleSimulators/scrambler';
  import { removeSolve } from '$lib/solves';

	import Button from '../Button.svelte';

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
		if (!confirm('Are you sure you want to delete this solve?')) {
			return;
		}
    removeSolve(solve.scramble || '', solve.timeInHundredths);
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
	<span class="time">{solve.time}</span>
	<span class="scramble">{solve.scramble}</span>
	<span>
		{@html draw3x3Scramble(solve.scramble || '')}
	</span>
	<span>{solve.comment}</span>
	<span class="date">{solve.date}</span>
	<div class="solve-control-group">
		<div>
			<Button>+2</Button>
			<Button>DNF</Button>
		</div>
		<Button destructive on:click={handleDelete}>Delete</Button>
	</div>
</div>

<style>
	.popup-content {
		color: #fff;
		cursor: auto;

		background-color: var(--background-color);
		border-radius: var(--border-radius);
		border: 1px solid #ccc;
		padding: 1rem;
		width: 40rem;

		position: absolute;
		top: 3rem;
		left: 20rem;
		right: 0;

		display: flex;
		flex-direction: column;
		gap: 1rem;

		z-index: 99;
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

</style>
