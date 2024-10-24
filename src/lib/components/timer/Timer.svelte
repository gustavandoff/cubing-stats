<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let timerStartKey: string = 'Space';
  export let timerStopKey: string = 'Space';

  let timeElapsed = 0; // Time elapsed in milliseconds

  let holdStartTime: number | null = null;
  let holdTimer: number | null = null;
  let timerInterval: number | null = null;
  let heldLongEnough = false;

  // Handle the keydown event for the space bar
  function handleKeyDown(event: KeyboardEvent) {
    if (event.code === timerStopKey && timerInterval) {
      
      // Prevent default action (e.g., page scrolling)
      event.preventDefault();

      stopTimer();
      return;
    }

    if (event.code === timerStartKey) {
      // Prevent default action (e.g., page scrolling)
      event.preventDefault();

      if (timerInterval) {
        return;
      }

      // Ignore if already holding the start key
      if (holdStartTime !== null) return;

      holdStartTime = Date.now();
      heldLongEnough = false;

      // Set a timer to check if start key is held for at least 300 milliseconds
      holdTimer = window.setTimeout(() => {
        heldLongEnough = true;
      }, 300);
    }    
  }

  // Handle the keyup event for the space bar
  function handleKeyUp(event: KeyboardEvent) {
    if (event.code === timerStartKey) {
      event.preventDefault();

      if (holdTimer !== null) {
        clearTimeout(holdTimer);
        holdTimer = null;
      }

      holdStartTime = null;

      if (heldLongEnough && !timerInterval) {
        startTimer();
      }
    }
  }

  // Start the timer
  function startTimer() {
    timeElapsed = 0;
    const startTime = Date.now();

    timerInterval = window.setInterval(() => {
      timeElapsed = Date.now() - startTime;
    }, 10); // Update every 10ms
  }

  // Stop the timer
  function stopTimer() {
    heldLongEnough = false;
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    dispatch('time', timeElapsed);
  }

  let formatedTime = "";

  $: {
    const seconds = Math.floor(timeElapsed / 1000);
    const milliseconds = timeElapsed % 1000;
    //const msString = milliseconds.toString().padStart(3, '0');
    const hundredths = Math.floor(milliseconds / 10);
    const hundredthsString = hundredths.toString().padStart(2, '0');

    if (seconds < 60) {
      formatedTime = `${seconds}.${hundredthsString}`;
    } else {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      formatedTime = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}.${hundredthsString}`;
    }
  }

  // Add event listeners when the component is mounted
  onMount(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    }
  });

  // Remove event listeners when the component is destroyed
  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    }
  });
</script>

<!-- Display the formatted time -->
<div>
	<p class={'time ' + (holdTimer && (heldLongEnough ? 'timer-ready' : 'timer-waiting'))}>
		{formatedTime}
	</p>
</div>

<style>
	.time {
		font-size: 10rem;
		font-weight: 700;
		text-align: center;
		margin: 0;
	}

	.timer-waiting {
		color: #ff0000;
	}

	.timer-ready {
		color: #00ff00;
	}
</style>
