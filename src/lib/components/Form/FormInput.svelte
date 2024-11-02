
<script lang="ts">
  export let placeholder = '';
  export let type = 'text';
  export let required = false;
  export let value = '';

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    value = target.value;
  }

</script>

<input {value} on:input={handleInput} type={type} placeholder={placeholder} required={required} />

<style>
   input {
    box-sizing: border-box;
		width: 100%;
		padding: 0.5rem;
		margin-bottom: 1rem;
		border: 1px solid #ccc;
		border-radius: var(--border-radius);
    background-color: var(--input-background-color);
    color: #fff;
	}

  input:focus {
    border: 1px solid #007bff;
    outline: none;
  }
</style>