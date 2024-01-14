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
			};
			reader.readAsText(file);
		}
	}
</script>

<div class="modal-background">
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
</div>

<style>
    .modal-background {
        background-color: rgba(0, 0, 0, 0.6);
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;

        display: flex;
        align-items: center;
        justify-content: center;
    }

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
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
