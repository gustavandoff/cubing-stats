<script lang="ts">
	import { Chart, type EChartsOptions } from 'svelte-echarts';
	import { goto } from '$app/navigation';

	import { allSinglePBs, formatedCSTimerData } from '$lib/solves';
	import { getAllAoX } from '$lib/utils';

	export let dataType: string;

	let data: Solve[] = [];
	let options: EChartsOptions = {};
	
	const incorrectAvgCount = (avgCount: number) => {
		return !([5, 12, 25, 50].includes(avgCount) || avgCount % 100 === 0);
	};

	$: {
		if (dataType.startsWith('ao')) {
			const avgCount = +dataType.slice(2);
			if (incorrectAvgCount(avgCount)) {
				goto('/');
			} else {
				data = getAllAoX(avgCount, $formatedCSTimerData[0].solves);
			}
		} else {
			data = [];
		}
	}

	$: options = {
		xAxis: {
			data: data.map((data) => data.date),
			type: 'category'
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				data: data.map((data) => data.time),
				type: 'line',
				smooth: true
			}
		]
	};
</script>

<div class="app">
	<Chart {options} />
</div>

<style>
	.app {
		width: 100vw;
		height: 50vh;
	}
</style>
