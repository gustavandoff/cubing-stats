<script lang="ts">
	import { browser } from '$app/environment';
	
	import '@fortawesome/fontawesome-free/css/all.min.css'

	import LoadTimes from '$lib/components/LoadTimes.svelte';

	import { rawCSTimerData, setRawCSTimerData } from '$lib/solves';

	$: if (browser && localStorage.getItem('rawCSTimerData') && !$rawCSTimerData) {
		setRawCSTimerData(JSON.parse(localStorage.getItem('rawCSTimerData') as string));
	}

	$: showLoadTimes = browser && !localStorage.getItem('rawCSTimerData');
</script>

{#if showLoadTimes}
	<LoadTimes />
{/if}

<slot />