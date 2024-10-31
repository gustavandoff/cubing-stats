<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let inputTime = '';

  let placeholderChars = [
    {
      text: '0',
      show: true
    }, {
      text: ':',
      show: true
    }, {
      text: '0',
      show: true
    }, {
      text: '0',
      show: true
    }, {
      text: '.',
      show: true
    }, {
      text: '0',
      show: true
    }, {
      text: '0',
      show: true
    }
  ];

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {

      inputTime = inputTime.replace(/\D/g, '');
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

    placeholderChars = placeholderChars.toReversed().map((c, i) => {
      return {
        ...c,
        show: i >= inputTime.length
      };
    }).toReversed();
  }

</script>


<div class="time">
  <input
    type="text"
    bind:value={inputTime}
    on:keydown={handleKeydown}
  >
    <div class="placeholder">
      <div class="placeholder-text">
        {#each placeholderChars as c}
          <span style={c.show ? '' : 'color: rgba(0,0,0,0)'}>
            {c.text}
          </span>
        {/each}
      </div>
    </div>
</div>

<style>
  .time {
    position: relative;
    box-sizing: border-box;
    font-size: 10rem;
    font-weight: 500;
    text-align: end;
    margin: 0;
    width: 50rem;
    border: 1px solid #fff;
    border-radius: var(--border-radius);
    display: flex;
    justify-content: center;
  }

  .time input {
    box-sizing: border-box;
    background-color: transparent;
    border: none;
    font-size: 10rem;
    color: #fff;
    width: 80%;
    text-align: end;
    outline: none;
    margin: 0;
    padding: 0;
  }

  .time input[type="text"] {
    font-family: 'Roboto', sans-serif;
  }

  .placeholder {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 10rem;
    color: #fff;
    width: 100%;
    height: 100%;
    text-align: end;
    pointer-events: none; /* Allows clicks to pass through */
    display: flex;
    justify-content: center;
  }

  .placeholder-text {
    box-sizing: border-box;
    width: 80%;
    height: 100%;
    color: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: end;
  }
</style>