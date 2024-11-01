<script lang="ts">
	import { browser } from '$app/environment';
    
	import IconCard from '$lib/components/IconCard.svelte';

	$: showLoadTimes = browser && !localStorage.getItem('rawCSTimerData');
</script>

<div class="stat-list" class:inactive={showLoadTimes}>
    <IconCard
        route='/graph/'
        svg='<i class="fa-solid fa-chart-line"></i>'
        title="Line graphs"
        text="Line graphs of all your solves, averages or PBs"
    />
    <IconCard
        route='/list/'
        svg='<i class="fa-solid fa-list-ul"></i>'
        title="List"
        text="List all your solves, averages or PBs"
    />
</div>

<style>
	.stat-list {
		display: flex;
        flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}

	.stat-list.inactive {
		pointer-events: none;
	}
</style>
