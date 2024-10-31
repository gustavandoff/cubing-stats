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

  $: {
    inputTime = inputTime.replace(/\D/g, '');
    if (inputTime.length > 4) {
      inputTime = `${inputTime.slice(0, -4)}:${inputTime.slice(-4, -2)}.${inputTime.slice(-2)}`;
    } else if (inputTime.length > 2) {
      inputTime = `${inputTime.slice(0, -2)}.${inputTime.slice(-2)}`;
    }
  }

</script>


<div class="time">
  <input placeholder="0:00.00" type="text" bind:value={inputTime} on:keydown={handleKeydown}>
</div>

<style>
	.time {
    box-sizing: border-box;
		font-size: 10rem;
		font-weight: 500;
		text-align: end;
		margin: 0;
    width: 50rem;
    border: 1px solid var(--greyed-color);
    border-radius: var(--border-radius);
    display: flex;
    justify-content: center;

    & input {
      box-sizing: border-box;
      background-color: transparent;
      border: none;
      font-size: 10rem;
      font-weight: 500;
      color: #fff;
      width: 80%;
      text-align: end;
      outline: none;
    }
	}

</style>