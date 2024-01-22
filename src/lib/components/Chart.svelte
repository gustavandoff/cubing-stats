<script lang="ts">
	import { Chart, type EChartsOptions } from 'svelte-echarts';
	import type { SeriesOption } from 'echarts';
	import { goto } from '$app/navigation';

	import { formatedCSTimerData } from '$lib/solves';
	import { getAllAoX } from '$lib/utils';

	export let statTypes: string;

	let options: EChartsOptions = {};

	const incorrectAvgCount = (avgCount: number) =>
		!([5, 12, 25, 50].includes(avgCount) || avgCount % 100 === 0);

	interface TempSeries {
		times: string[];
		dates: string[];
		type: 'line';
	}

	let series: SeriesOption[];
	let dates: string[];

	$: {
		console.log('Starting loading times');
		const startTime = new Date().getTime();
		const splitStatTypes = statTypes.split(';');

		let tempSeries: TempSeries[] = [];
		let tempDates: string[] = [];

		splitStatTypes.forEach((stat) => {
			if (stat.startsWith('ao')) {
				const avgCount = +stat.slice(2);
				if (incorrectAvgCount(avgCount)) {
					goto('/');
				} else {
					const currentSolves = getAllAoX(avgCount, $formatedCSTimerData[0].solves);

					const newTimes = currentSolves.map((solve) => solve.time);
					const curruntDates = currentSolves.map((solve) => solve.date);

					let i = 0;

					while (curruntDates[i] || tempDates[i]) {
						if (curruntDates[i] < tempDates[i] || !tempDates[i]) {
							tempDates.splice(i, 0, curruntDates[i]);
						}
						i++;
					}

					tempSeries.push({
						times: newTimes,
						dates: curruntDates,
						type: 'line'
					});
				}
			}
		});

		tempSeries.sort((a, b) => b.times.length - a.times.length);

		series = tempSeries.map((s) => {
			let iModifier = 0;
			const times = tempDates.map((date, i) => {
				i = i + iModifier;

				if (s.dates[i] > date) {
					iModifier--;
					return s.times[i - 1];
				}
				return s.times[i];
			});

			return {
				data: times,
				type: 'line'
			};
		});

		dates = tempDates;

		const time = new Date().getTime() - startTime;
		console.log(`Done in ${time}ms`);
	}

	$: options = {
		xAxis: {
			data: dates,
			type: 'category'
		},
		yAxis: {
			type: 'value'
		},
		series
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
