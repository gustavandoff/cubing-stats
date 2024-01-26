<script lang="ts">
	import { Chart, type EChartsOptions } from 'svelte-echarts';
	import type { SeriesOption } from 'echarts';
	import { goto } from '$app/navigation';

	import { formattedCSTimerData } from '$lib/solves';
	import { getAllAoX, getAllPbs } from '$lib/utils';

	export let statTypes: string;

	let options: EChartsOptions = {};

	const incorrectAvgCount = (avgCount: number) =>
		!([5, 12, 25, 50].includes(avgCount) || avgCount % 100 === 0);

	interface TempSeries {
		times: string[];
		dates: string[];
		type: 'line';
	}

	let series: SeriesOption[] = [];
	let dates: string[] = [];

	let loading = true;

	const setUpOptions = async () => {
		const splitStatTypes = statTypes.split(';');
		splitStatTypes.sort((a, b) => a.length - b.length);

		const statTypesWithValue = splitStatTypes.map((stat) => {
			const chars = stat.split('').filter((char) => isNaN(+char));
			const numbers = stat.split('').filter((char) => !isNaN(+char));
			return {
				name: chars.join(''),
				value: +numbers.join('')
			};
		});

		const calculatedAverages: { [index: string]: Solve[] } = {};

		let tempSeries: TempSeries[] = [];
		let tempDates: string[] = [];

		statTypesWithValue.forEach((stat) => {
			switch (stat.name) {
				case 'a':
					if (!incorrectAvgCount(stat.value)) {
						const currentSolves = getAllAoX(stat.value, $formattedCSTimerData[0].solves);

						calculatedAverages['a' + stat.value] = currentSolves;

						const newTimes = currentSolves.map((solve) => solve.time);
						const currentDates = currentSolves.map((solve) => solve.date);

						let i = 0;

						while (currentDates[i] || tempDates[i]) {
							if (currentDates[i] < tempDates[i] || !tempDates[i]) {
								tempDates.splice(i, 0, currentDates[i]);
							}
							i++;
						}

						tempSeries.push({
							times: newTimes,
							dates: currentDates,
							type: 'line'
						});
					}
					break;
				case 'pba':
					if (!incorrectAvgCount(stat.value)) {
						const currentAverages = calculatedAverages['a' + stat.value] || getAllAoX(stat.value, $formattedCSTimerData[0].solves);
						const averagePbs = getAllPbs(currentAverages);

						const newTimes = averagePbs.map((solve) => solve.time);
						const currentDates = averagePbs.map((solve) => solve.date);

						let i = 0;

						while (currentDates[i] || tempDates[i]) {
							if (currentDates[i] < tempDates[i] || !tempDates[i]) {
								tempDates.splice(i, 0, currentDates[i]);
							}
							i++;
						}

						tempSeries.push({
							times: newTimes,
							dates: currentDates,
							type: 'line'
						});

					}
					break;
				case 's':
					if (!stat.value) {
						const newTimes = $formattedCSTimerData[0].solves.map((solve) => solve.time);
						const currentDates = $formattedCSTimerData[0].solves.map((solve) => solve.date);

						let i = 0;

						while (currentDates[i] || tempDates[i]) {
							if (currentDates[i] < tempDates[i] || !tempDates[i]) {
								tempDates.splice(i, 0, currentDates[i]);
							}
							i++;
						}

						tempSeries.push({
							times: newTimes,
							dates: currentDates,
							type: 'line'
						});
					}

					break;
				case 'pbs':
					if (!stat.value) {
						const singlePbs = getAllPbs($formattedCSTimerData[0].solves);
						const newTimes = singlePbs.map((solve) => solve.time);
						const currentDates = singlePbs.map((solve) => solve.date);

						let i = 0;

						while (currentDates[i] || tempDates[i]) {
							if (currentDates[i] < tempDates[i] || !tempDates[i]) {
								tempDates.splice(i, 0, currentDates[i]);
							}
							i++;
						}

						tempSeries.push({
							times: newTimes,
							dates: currentDates,
							type: 'line'
						});
					}

					break;
				default:
					break;
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

		options = {
			xAxis: {
				data: dates,
				type: 'category'
			},
			yAxis: {
				type: 'value'
			},
			series
		};
	};

	$: {
		loading = true;

		console.log('Starting loading times');
		console.log('url params', statTypes);
		const startTime = new Date().getTime();

		setUpOptions().then(() => {
			setTimeout(() => {
				loading = false;

				const time = new Date().getTime() - startTime;
				console.log(`Done in ${time}ms`);
			}, 0);
		});
	}
</script>

<div class="app">
	{#if !loading}
		<Chart {options} />
	{/if}
</div>

<style>
	.app {
		width: 100vw;
		height: 50vh;
	}
</style>
