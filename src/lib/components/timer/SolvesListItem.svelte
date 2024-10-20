<script lang="ts">
  export let solve: Solve;
</script>

<li>
  <div class="solve-time-container">
    <span>{solve.time}</span>
    <!-- <span>{solve.date}</span> -->
  </div>
</li>

<style>
  li {
    box-sizing: border-box;
    padding: 0.5rem;
    border-bottom: 1px solid #ccc;
  }

  .solve-time-container {
    width: 100%;
    display: flex;
    justify-content: end; 
    gap: 1.5rem;
  }
</style>