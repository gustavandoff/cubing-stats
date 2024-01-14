<script lang="ts">
	export let imgSrc: string = '';
	export let imgAlt: string = '';
	export let title: string = '';
	export let text: string = '';
	export let route: string = '';
</script>

<a href={route} class="card">
	<img class="card-img-top" src={imgSrc} alt={imgAlt} />
	<div class="card-body">
		<h5 class="card-title">{title}</h5>
		<p class="card-text">{text}</p>
	</div>
</a>

<style>
	.card {
		display: flex;
		flex-direction: column;
		width: 200px;
		background-color: #555555;
		border-radius: 4px;
		padding: 5px;
	}

	.card-body {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		margin: 5px;
	}

	.card-title {
		margin: 10px 0 0 0;
		font-weight: 1000;
		line-height: 1.2;
		font-size: 1.25rem;
		color: #ffffff;
	}

	.card-text {
		margin: 10px 0 0 0;
		font-weight: 400;
		line-height: 1.5;
		font-size: 1rem;
		color: #ffffff;
	}

	.card-img-top {
		width: 100%;
	}
</style>
