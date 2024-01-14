<script>
	import ao5Icon from '$lib/images/ao5icon.png';
	import ao12Icon from '$lib/images/ao12icon.png';
	import ao100Icon from '$lib/images/ao100icon.png';

	import BaseCard from '$lib/components/BaseCard.svelte';
	import LoadTimes from '$lib/components/LoadTimes.svelte';
	
	import { rawCSTimerData } from '$lib/solves';
</script>

{#if !$rawCSTimerData}
	<LoadTimes />
{/if}

<div class="stat-list">
	<BaseCard
		route="/ao5"
		imgSrc={ao5Icon}
		imgAlt="Ao5"
		title="Ao5 over time"
		text="Shows a graph of all the averages of 5"
	/>
	<BaseCard
		route="/ao12"
		imgSrc={ao12Icon}
		imgAlt="Ao12"
		title="Ao12 over time"
		text="Shows a graph of all the averages of 12"
	/>
	<BaseCard
		route="/ao100"
		imgSrc={ao100Icon}
		imgAlt="Ao100"
		title="Ao100 over time"
		text="Shows a graph of all the averages of 100"
	/>
</div>

<style>
	.stat-list {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}
</style>
