<script lang="ts">
  import { formattedCSTimerData, currentSession } from '$lib/solves';

  function handleSessionChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    currentSession.set(target.value);
  }
</script>

<select value={String($currentSession)} on:change={handleSessionChange}>
  {#each $formattedCSTimerData as session}
    <option value={String(session.sessionName)}>{session.sessionName}</option>
  {/each}
</select>