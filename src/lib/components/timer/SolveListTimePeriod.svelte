<script lang="ts">
	import { onMount } from 'svelte';
	import SolvesListItem from './SolvesListItem.svelte';

	export let solves: Solve[] = [];
	export let title = '';

	let showTimes = false;
	let renderTimes = false;
	
	let renderTimesTimeout: NodeJS.Timeout;

	function toggleShowTimes() {
		showTimes = !showTimes;
	}

	$: {
		if (showTimes === false && renderTimes === true) {
			renderTimesTimeout = setTimeout(() => {
				renderTimes = false;
			}, 300);
		} else if (showTimes === true && renderTimes === false) {
			clearTimeout(renderTimesTimeout);
			renderTimes = true;
		}
	}

	$: {
		showTimes = solves.length < 200;
	}

	onMount(() => {
		showTimes = solves.length < 200;
	});
</script>

{#if solves.length > 0}
	<li class="time-period-list">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<h2 on:click={toggleShowTimes}>
			<div class={showTimes ? '' : 'rotated'}>
				<i class={'fa-solid fa-caret-down'}></i>
			</div>
			{title}
		</h2>
    
		<ul class={showTimes ? 'open' : ''} style="--height:{solves.length};">
			{#if renderTimes}
				{#each solves as solve}
					<SolvesListItem {solve} />
				{/each}
			{/if}
		</ul>
	</li>
{/if}

<style>
	.time-period-list {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	ul {
		transition: height 0.3s;

		list-style-type: none;
		padding: 0;

		max-height: 0;
		overflow: hidden;
		transition: max-height 0.3s;

		&.open {
			max-height: calc(var(--height) * 3rem);
		}
	}

	h2 {
		cursor: pointer;
		color: var(--greyed-color);

		font-size: 1rem;
	}

	h2 div {
		display: inline-block;
		transition: transform 0.3s ease-in-out;
	}

	.rotated {
		transform: rotate(180deg);
	}
</style>
