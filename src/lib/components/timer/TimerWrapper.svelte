<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	import Timer from './Timer.svelte';
	import TypeTimer from './TypeTimer.svelte';

	export let type: 'timer' | 'type-timer' = 'timer';
	export let battlers = 1;
</script>

{#if type === 'timer'}
	<div class="timer-container">
		{#each Array.from({ length: battlers }) as _, i}
			<Timer on:time={(e) => dispatch('save-time', e.detail)} />
		{/each}
	</div>
{:else}
	<TypeTimer on:time={(e) => dispatch('save-time', e.detail)} />
{/if}

<style>
  .timer-container {
    display: flex;
    gap: 4rem;
    max-width: 50vw;
    flex-wrap: wrap;

    justify-content: center;
  }
</style>