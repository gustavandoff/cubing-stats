<script lang="ts">
	import { onMount } from 'svelte';

	import { addSolve } from '$lib/solves';

	import SolvesList from '$lib/components/timer/SolvesList.svelte';

	import TimerWrapper from '$lib/components/timer/TimerWrapper.svelte';
	import ToggleSwitch from '$lib/components/ToggleSwitch.svelte';

	import { draw2x2Scramble, draw3x3Scramble, get2x2Scramble, get3x3Scramble } from '$lib/puzzleSimulators/scrambler';

	let battleMode = false;
	let battlersFinished = 0;

	let typeTimer = false;

	let puzzleType = '3';

	let scrambleIndex = 0;
	let scrambleMemory = 5;
	let scrambleList: string[] = Array.from({ length: scrambleMemory });
	
	let drawnScramble = '';
	let scramble = '';

	function nextScramble() {
		if (scrambleIndex === scrambleMemory - 1) {
			scrambleList.shift();
			scrambleList.push(getScramble());
			scramble = scrambleList[scrambleIndex];
			drawnScramble = draw3x3Scramble(scramble);
		} else {
			scrambleIndex++;
			scramble = scrambleList[scrambleIndex];
			drawnScramble = draw3x3Scramble(scramble);
		}
	}

	function prevScramble() {
		if (scrambleIndex > 0) {
			scrambleIndex--;
			scramble = scrambleList[scrambleIndex];
			drawnScramble = draw3x3Scramble(scramble);
		}
	}

	function getScramble(): string {
		if (puzzleType === '3') {
			return get3x3Scramble();
		} else {
			return get2x2Scramble();
		}
	}

	const saveTime = (time: number) => {
		console.log('time: ', time);

		if (time === 0) {
			nextScramble();
			return;
		}

		if (!battleMode) {
			const newSolve: SessionSolve = [
				[0, time],
				scramble,
				"",
				Math.floor(new Date().getTime()/1000)
			];
			addSolve(newSolve);
			nextScramble();
			return;
		}

		battlersFinished++;
		if (battlersFinished >= 2) {
			battlersFinished = 0;
			nextScramble();
		}
	};

	onMount(() => {
		scrambleList = Array.from({ length: scrambleMemory }).map(() => getScramble());
		scramble = scrambleList[scrambleIndex];
		drawnScramble = draw3x3Scramble(scramble);
	});
</script>

<div class="wrapper">
	<div class="container-left">
		<SolvesList />
	</div>

	<div class="container-center">
		<div class="scramble-container">
			<!-- <div class="puzzle-selector">
				<select bind:value={puzzleType}>
					<option value="3">3x3</option>
					<option value="2">2x2</option>
				</select>
			</div> -->
			<div class="scramble">
				<button
					class={'change-scramble ' + (scrambleIndex === 0 && 'disabled')}
					on:click={prevScramble}
				>
					<i class="fa-solid fa-backward-step"></i>
				</button>
				<span>
					{scramble}
				</span>
				<button class="change-scramble" on:click={nextScramble}>
					<i class="fa-solid fa-forward-step"></i>
				</button>
			</div>
		</div>

		<div class={'timer-container'}>
			<TimerWrapper type={typeTimer ? 'type-timer' : 'timer'} battlers={1} on:save-time={e => saveTime(e.detail)} />
		</div>
		<ToggleSwitch bind:checked={typeTimer} />
	</div>

	<div class="container-right">
		<div class="drawn-scramble">
			{@html drawnScramble}
		</div>
	</div>
</div>

<style>
	.wrapper {
		height: 100vh;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
	}
	.container-center {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.container-left {
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: start;
		padding-left: 2rem;
		padding-top: 3rem;
	}

	.container-right {
		display: flex;
		flex-direction: column;
		align-items: end;
		justify-content: end;
		padding: 1rem;
	}

	.scramble-container {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.timer-container {
		margin-top: 10vh;

		&.battle-mode {
			display: flex;
			gap: 50px;
		}
	}

	.scramble {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 20px;

		font-size: 2rem;
		margin-top: 2rem;
	}

	.scramble > span {
		text-align: center;
	}

	.change-scramble {
		cursor: pointer;
		color: #ffffff;

		font-size: 3rem;

		background: none;
		border: none;

		&:hover {
			color: var(--hovered-color);
		}
	}

	.disabled {
		pointer-events: none;
		color: var(--greyed-color);
	}
</style>
