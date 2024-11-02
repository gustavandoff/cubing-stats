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