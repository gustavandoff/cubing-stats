<script lang="ts">
	import { currentSessionData } from '$lib/solves';
	import { convertHundredths } from '$lib/utils';

	import SolveListTimePeriod from './SolveListTimePeriod.svelte';
	import SessionChooser from './SessionChooser.svelte';

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
			const solvesList = $currentSessionData.solves.toReversed();

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

			today.setDate(new Date().getTime());
			
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

	$: mean = convertHundredths(Math.round($currentSessionData?.sessionData.stat[2] / 10));
</script>

<ul>
	<h2>
		Session
		<div>
			<SessionChooser />
		</div>
	</h2>
	<div>
		Solves / mean
		<span>{ $currentSessionData?.sessionData.stat[0] } / { mean }</span>
	</div>
	<!-- <div>
		<input type="text" placeholder="Min time" bind:value={minTime}>
		<input type="text" placeholder="Max time" bind:value={maxTime}>
	</div> -->
	<SolveListTimePeriod solves={todaySolves} title="Today" />
	<SolveListTimePeriod solves={yesterDaySolves} title="Yesterday" />
	<SolveListTimePeriod solves={thisWeekSolves} title="This week" />
	<SolveListTimePeriod solves={thisMonthSolves} title="This month" />
	<SolveListTimePeriod solves={thisYearSolves} title="This year" />
	<SolveListTimePeriod solves={allTimeSolves} title="All time" />
</ul>

<style>

	h2 {
		font-size: 1.1rem;
		color: var(--greyed-color);

		& > div {
			display: flex;
			margin-top: 0.5rem;
		}
	}

	ul {
		border: 1px solid var(--greyed-color);
		border-radius: var(--border-radius);

		list-style-type: none;
		padding: 10px;
		margin: 0;

		overflow: auto;
		max-height: calc(100vh - 7rem);
		width: 90%;
		max-width: 15rem;
	}
</style>
