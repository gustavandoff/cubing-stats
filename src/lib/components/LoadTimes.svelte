<script lang="ts">
	import { goto } from '$app/navigation';
	import { setRawCSTimerData } from '$lib/solves';

	import IconCard from '$lib/components/IconCard.svelte';

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
				data.properties.sessionData = JSON.parse(data.properties.sessionData);
				setRawCSTimerData(data);
			};
			reader.readAsText(file);
		}
	}
</script>

<div class="modal-background">
	<div>
		<label for="file-upload" class="card">
			<span class="card-svg-top">
				<i class="fa-solid fa-upload"></i>
			</span>
			<div class="card-body">
				<h2 class="card-title">Upload csTimer-file</h2>
			</div>
		</label>
		<input id="file-upload" name="file-upload" bind:files type="file" />

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
	.card {
		display: flex;
		align-items: center;
		background-color: #555555;
		border-radius: var(--border-radius);
		padding: 5px 10px;
		text-decoration: none;
	}

	.card > *:not(:last-child)::after {
		content: '';
		border-left: 2px solid #ffffff;
		margin: 0 10px;
	}

	.card-title {
		font-weight: 700;
		line-height: 1.2;
		font-size: 2rem;
		color: #ffffff;
	}

	.card-svg-top {
		text-align: center;
		font-size: 50px;
		color: #fff;
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
