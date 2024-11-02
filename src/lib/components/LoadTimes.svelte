<script lang="ts">
	import { setRawCSTimerData } from '$lib/solves';

	import Modal from '$lib/components/Modal.svelte';

	import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

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
				try {
					const data = JSON.parse(e.target?.result as string);
					data.properties.sessionData = JSON.parse(data.properties.sessionData);
					setRawCSTimerData(data);
					dispatch('close');
				} catch (error) {
					errorMessage = 'Invalid file';
				}
			};
			reader.readAsText(file);
		}
	}
</script>

<Modal on:close={() => dispatch('close')}>
	<div class="card">
		<label for="file-upload">
			<span class="card-svg-top">
				<i class="fa-solid fa-upload"></i>
			</span>
			<div class="card-body">
				<h2 class="card-title">Upload csTimer-file</h2>
			</div>
		</label>
	</div>
	
	<input id="file-upload" name="file-upload" bind:files type="file" />

	{#if errorMessage}
		<p class="error">
			{errorMessage}
		</p>
	{/if}
</Modal>

<style>
	.card {
		background-color: #121212;
		padding: 1.5rem 2rem;
		border-radius: var(--border-radius);
	}

	.card > label > *:not(:last-child)::after {
		content: '';
		border-left: 2px solid #ffffff;
		margin: 0 1rem;
	}

	.card-title {
		font-weight: 700;
		font-size: 2rem;
	}

	.card-svg-top {
		text-align: center;
		font-size: 3rem;
	}

	label {
		cursor: pointer;
		display: flex;
		align-items: center;

		&:hover {
			color: var(--hovered-color);
		}
	}

	input[type='file'] {
		display: none;
	}

	.error {
		color: red;
	}
</style>
