<script lang="ts">
  import { formattedCSTimerData, currentSession } from '$lib/solves';

  let session = $currentSession;

  function handleSessionChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    session = target.value;
    currentSession.set(session);
  }
</script>

<select bind:value={session} on:change={handleSessionChange}>
  {#each $formattedCSTimerData as session}
    <option value={session.sessionName}>{session.sessionName}</option>
  {/each}
</select>