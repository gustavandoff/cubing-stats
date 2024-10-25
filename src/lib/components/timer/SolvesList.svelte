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
			const solvesList = $formattedCSTimerData[0].solves;
			solvesList.reverse();

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
		width: 90%;
		max-width: 15rem;
	}
</style>
