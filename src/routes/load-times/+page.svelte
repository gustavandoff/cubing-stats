<script lang="ts">
	import { goto } from '$app/navigation';
	import { setRawCSTimerData } from '$lib/solves';
	let files: FileList;
	let errorMessage: string;

	$: if (files) {
		const file = files[0];
		const reader = new FileReader();

		errorMessage = '';

		if (!file?.name.endsWith('.txt')) {
			errorMessage = 'Please select a valid file';
		} else {
			reader.onload = (e) => {
				const data = JSON.parse(e.target?.result as string);
				setRawCSTimerData(data);

				goto('/');
			};
			reader.readAsText(file);
		}
	}
</script>

<div class="container">
    <div class="button">
        <label for="file-upload"> Upload csTimer-file </label>
        <input id="file-upload" name="file-upload" bind:files type="file" />
    </div>

    {#if errorMessage}
        <p class="error">
            {errorMessage}
        </p>
    {/if}
</div>


<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 80vh;
    }

	.button {
		display: inline-block;
		border-radius: 4px;
		background-color: #555555;
		border: none;
		color: #ffffff;
		text-align: center;
		font-size: 42px;
		transition: all 0.5s;
		cursor: pointer;
	}

    label {
        cursor: pointer;
        display: inline-block;
		padding: 40px;
    }

	input[type='file'] {
		display: none;
	}

    .error {
        color: red;
    }

</style>
