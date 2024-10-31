<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let inputTime = '';

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {

      if (inputTime.length === 0) {
        return;
      }

      let timeInHundredths = Number(inputTime);
      let timeMinutes = 0;

      if (inputTime.length > 4) {
        timeInHundredths = Number(inputTime.slice(-4));
        timeMinutes = Number(inputTime.slice(0, -4));
      }

      const time = timeMinutes * 60 * 1000 + timeInHundredths * 10;

      dispatch('time', time);
      inputTime = '';
    }
	}

  $: inputTime = inputTime.replace(/\D/g, '');

</script>


<div>
	<input placeholder="00" type="text" class="time" bind:value={inputTime} on:keydown={handleKeydown}>
</div>

<style>
	.time {
		font-size: 10rem;
		font-weight: 500;
		text-align: center;
		margin: 0;
    width: 50rem;
	}

</style>