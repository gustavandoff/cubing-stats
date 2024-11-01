<script lang="ts">
	import { currentSessionData } from '$lib/solves';

	import SolveListTimePeriod from './SolveListTimePeriod.svelte';

	let todaySolves: Solve[] = [];
	let yesterDaySolves: Solve[] = [];
	let thisWeekSolves: Solve[] = [];
	let thisMonthSolves: Solve[] = [];
	let thisYearSolves: Solve[] = [];
	let allTimeSolves: Solve[] = [];

	let minTime = '';
	let maxTime = '';

	$: {
		if ($currentSessionData?.solves) {
			const solvesList = $currentSessionData.solves.reverse();

			todaySolves = [];
			yesterDaySolves = [];
			thisWeekSolves = [];
			thisMonthSolves = [];
			thisYearSolves = [];
			allTimeSolves = [];

			const today = new Date();
			const day = today.getDay();
			const diff = today.getDate() - day + (day === 0 ? -6 : 1);
			const weekStart = new Date(today.setDate(diff));

			today.setDate(new Date().getDate());
			
			solvesList.forEach(solve => {
				if (minTime && solve.timeInHundredths < Number(minTime)) {
					return;
				}

				if (maxTime && solve.timeInHundredths > Number(maxTime)) {
					return;
				}

				const solveDate = new Date(solve.date);

				if (
					solveDate.getDate() === today.getDate() &&
					solveDate.getMonth() === today.getMonth() &&
					solveDate.getFullYear() === today.getFullYear()
				) {
					todaySolves.push(solve);
				} else if (
					solveDate.getDate() === today.getDate() - 1 &&
					solveDate.getMonth() === today.getMonth() &&
					solveDate.getFullYear() === today.getFullYear()
				) {
					yesterDaySolves.push(solve);
				} else if (solveDate >= weekStart) {
					thisWeekSolves.push(solve);
				} else if (
					solveDate.getMonth() === today.getMonth() &&
					solveDate.getFullYear() === today.getFullYear()
				) {
					thisMonthSolves.push(solve);
				} else if (solveDate.getFullYear() === today.getFullYear()) {
					thisYearSolves.push(solve);
				} else {
					allTimeSolves.push(solve);
				}
			});
		}
	}
</script>

<ul>
	<h2>
		History
	</h2>
	<div>
		<input type="text" placeholder="Min time" bind:value={minTime}>
		<input type="text" placeholder="Max time" bind:value={maxTime}>
	</div>
	<SolveListTimePeriod solves={todaySolves} title="Today" />
	<SolveListTimePeriod solves={yesterDaySolves} title="Yesterday" />
	<SolveListTimePeriod solves={thisWeekSolves} title="This week" />
	<SolveListTimePeriod solves={thisMonthSolves} title="This month" />
	<SolveListTimePeriod solves={thisYearSolves} title="This year" />
	<SolveListTimePeriod solves={allTimeSolves} title="All time" />
</ul>

<style>

	h2 {
		color: var(--greyed-color);
	}

	ul {
		border: 1px solid var(--greyed-color);
		border-radius: var(--border-radius);

		list-style-type: none;
		padding: 10px;

		overflow: auto;
		max-height: 50vh;
		width: 90%;
		max-width: 15rem;
	}
</style>
