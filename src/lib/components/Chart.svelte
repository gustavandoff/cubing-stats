<script lang="ts">
	import { Chart, type EChartsOptions } from 'svelte-echarts';

    import { allSinglePBs, formatedCSTimerData, allAo5 } from '$lib/solves';

    $: console.log('allSinglePBs: ', $allSinglePBs);
    $: console.log('formatedCSTimerData: ', $formatedCSTimerData);
    $: console.log('allAo5: ', $allAo5);

    let data: Solve[] = [];
    let options: EChartsOptions = {};

    $: {
        data = $allAo5[0].solves;
        console.log('data: ', data);
    }

	$: options = {
		xAxis: {
			data: data.map(data => data.date),
			type: 'category'
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				data: data.map(data => data.timeInMillis),
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
