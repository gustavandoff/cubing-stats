<script lang="ts">
	import { browser } from '$app/environment';

	import ao5Icon from '$lib/images/ao5icon.png';
	import ao12Icon from '$lib/images/ao12icon.png';
	import ao25Icon from '$lib/images/ao25icon.png';
	import ao50Icon from '$lib/images/ao50icon.png';
	import ao100Icon from '$lib/images/ao100icon.png';

	import BaseCard from '$lib/components/BaseCard.svelte';
	import LoadTimes from '$lib/components/LoadTimes.svelte';

	import { rawCSTimerData, setRawCSTimerData } from '$lib/solves';

	$: if (browser && localStorage.getItem('rawCSTimerData') && !$rawCSTimerData) {
		setRawCSTimerData(JSON.parse(localStorage.getItem('rawCSTimerData') as string));
	}

	$: showLoadTimes = browser && !localStorage.getItem('rawCSTimerData');
	$: currentUrl = browser ? window.location.origin : '';
</script>

{#if showLoadTimes}
	<LoadTimes />
{/if}

<div class="stat-list" class:inactive={showLoadTimes}>
	<BaseCard
		route={currentUrl + '/graph/ao5'}
		imgSrc={ao5Icon}
		imgAlt="Ao5"
		title="Ao5 over time"
		text="Shows a graph of all the averages of 5"
	/>
	<BaseCard
		route={currentUrl + '/graph/ao12'}
		imgSrc={ao12Icon}
		imgAlt="Ao12"
		title="Ao12 over time"
		text="Shows a graph of all the averages of 12"
	/>
	<BaseCard
		route={currentUrl + '/graph/ao25'}
		imgSrc={ao25Icon}
		imgAlt="Ao25"
		title="Ao25 over time"
		text="Shows a graph of all the averages of 25"
	/>
	<BaseCard
		route={currentUrl + '/graph/ao50'}
		imgSrc={ao50Icon}
		imgAlt="Ao50"
		title="Ao50 over time"
		text="Shows a graph of all the averages of 50"
	/>
	<BaseCard
		route={currentUrl + '/graph/ao100'}
		imgSrc={ao100Icon}
		imgAlt="Ao100"
		title="Ao100 over time"
		text="Shows a graph of all the averages of 100"
	/>
</div>

<slot />

<style>
	.stat-list {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}

	.stat-list.inactive {
		pointer-events: none;
	}
</style>
