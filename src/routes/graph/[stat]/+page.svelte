<script lang="ts">
    import Chart from '$lib/components/Chart.svelte';

	import { rawCSTimerData } from '$lib/solves';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="container">
    {#if $rawCSTimerData}
        <Chart statTypes={data.statTitle} />
    {/if}
    
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
