<script lang="ts">
  import { formattedCSTimerData, currentSession } from '$lib/solves';

  function handleSessionChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    currentSession.set(target.value);
  }

  $: sessionNames = $formattedCSTimerData.sort((a, b) => a.sessionData.rank - b.sessionData.rank).map(session => session.sessionName);
</script>


<select value={String($currentSession)} on:change={handleSessionChange}>
  {#each sessionNames as session}
    <option value={String(session)}>{session}</option>
  {/each}
</select>

<style>
  select {
    box-sizing: border-box;
    padding: 0.25rem 0.5rem;
    border: 1px solid var(--greyed-color);
    border-radius: var(--border-radius);
    background-color: #121212;
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;
  }

  option {
    font-size: 1rem;
  }

  select:focus {
    border: 1px solid #007bff;
  }
</style>