<script lang="ts">
  import SolveInformationPopup from "./SolveInformationPopup.svelte";

  export let solve: Solve;

  let showPopup = false;

  let popupParent: HTMLElement;

  function onClose() {
    showPopup = false;
  }

  function openPopup() {
    showPopup = true;
  }
  
  </script>

<li>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="solve-time-container" on:click={openPopup} title="More info" bind:this={popupParent}>
    <span>{solve.time}</span>
    <!-- <span>{solve.date}</span> -->
    {#if showPopup}
      <SolveInformationPopup {solve} {onClose} {popupParent} />
    {/if}
  </div>
</li>

<style>
  li {
    box-sizing: border-box;
    padding: 0.5rem;
    border-bottom: 1px solid var(--greyed-color);
  }

  .solve-time-container {
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: end; 
    gap: 1.5rem;

    &:hover {
			color: var(--hovered-color);
		}
  }
</style>