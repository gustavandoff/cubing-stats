<script lang="ts">
	import { formattedCSTimerData } from '$lib/solves';

	import SolveListTimePeriod from './SolveListTimePeriod.svelte';

	let todaySolves: Solve[] = [];
	let yesterDaySolves: Solve[] = [];
	let thisWeekSolves: Solve[] = [];
	let thisMonthSolves: Solve[] = [];
	let thisYearSolves: Solve[] = [];
	let allTimeSolves: Solve[] = [];

	$: {
		if ($formattedCSTimerData[0]?.solves) {
			todaySolves = $formattedCSTimerData[0].solves.filter((solve) => {
				const solveDate = new Date(solve.date);
				const today = new Date();
				return (
					solveDate.getDate() === today.getDate() &&
					solveDate.getMonth() === today.getMonth() &&
					solveDate.getFullYear() === today.getFullYear()
				);
			}).reverse();

			yesterDaySolves = $formattedCSTimerData[0].solves.filter((solve) => {
				const solveDate = new Date(solve.date);
				const yesterday = new Date();
				yesterday.setDate(yesterday.getDate() - 1);
				return (
					solveDate.getDate() === yesterday.getDate() &&
					solveDate.getMonth() === yesterday.getMonth() &&
					solveDate.getFullYear() === yesterday.getFullYear()
				);
			}).reverse();;

			thisWeekSolves = $formattedCSTimerData[0].solves.filter((solve) => {
				const solveDate = new Date(solve.date);
				const today = new Date();
				const day = today.getDay();
				const diff = today.getDate() - day + (day === 0 ? -6 : 1);
				const weekStart = new Date(today.setDate(diff));
				return (
					solveDate >= weekStart && !todaySolves.includes(solve) && !yesterDaySolves.includes(solve)
				);
			}).reverse();;

			thisMonthSolves = $formattedCSTimerData[0].solves.filter((solve) => {
				const solveDate = new Date(solve.date);
				const today = new Date();
				return (
					solveDate.getMonth() === today.getMonth() &&
					solveDate.getFullYear() === today.getFullYear() &&
					!todaySolves.includes(solve) &&
					!yesterDaySolves.includes(solve) &&
					!thisWeekSolves.includes(solve)
				);
			}).reverse();;

			thisYearSolves = $formattedCSTimerData[0].solves.filter((solve) => {
				const solveDate = new Date(solve.date);
				const today = new Date();
				return (
					solveDate.getFullYear() === today.getFullYear() &&
					!todaySolves.includes(solve) &&
					!yesterDaySolves.includes(solve) &&
					!thisWeekSolves.includes(solve) &&
					!thisMonthSolves.includes(solve)
				);
			}).reverse();;

			allTimeSolves = $formattedCSTimerData[0].solves.filter((solve) => {
				return (
					!todaySolves.includes(solve) &&
					!yesterDaySolves.includes(solve) &&
					!thisWeekSolves.includes(solve) &&
					!thisMonthSolves.includes(solve) &&
					!thisYearSolves.includes(solve)
				);
			}).reverse();;
		}
	}
</script>

<ul>
	<h2>
		History
	</h2>
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
		border-radius: 5px;

		list-style-type: none;
		padding: 10px;

		overflow: auto;
		max-height: 50vh;
	}
</style>
