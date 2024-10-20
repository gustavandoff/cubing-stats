<script lang="ts">
	import BaseCard from '../BaseCard.svelte';
	import SolvesListItem from './SolvesListItem.svelte';

	export let solves: Solve[] = [];
	export let title = '';

	let showTimes = solves.length < 200;

	function toggleShowTimes() {
		showTimes = !showTimes;
	}
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
			<!-- {#if showTimes} -->
			{#each solves as solve}
				<SolvesListItem {solve} />
			{/each}
			<!-- {/if} -->
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
		color: rgb(116, 116, 116);

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
