<script lang="ts">
	export let svg: string = '';
	export let title: string = '';
	export let text: string = '';
	export let route: string = '';
</script>

<a href={route} class="card">
    <span class="card-svg-top">
        {@html svg}
    </span>
	<div class="card-body">
		<h2 class="card-title">{title}</h2>
		<p class="card-text">{text}</p>
	</div>
</a>

<style>
	.card {
		display: flex;
        align-items: center;
		background-color: #555555;
		border-radius: 4px;
		padding: 5px 10px;
		text-decoration: none;
	}

    .card > *:not(:last-child)::after {
        content: '';
        border-left: 2px solid #ffffff;
        margin: 0 10px;
    }

	.card-body {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	.card-title {
		margin: 5px 0 0 0;
		font-weight: 1000;
		font-size: 2rem;
		color: #ffffff;
	}

	.card-text {
		margin: 5px 0 5px 0;
		font-weight: 400;
		line-height: 1.5;
		font-size: 1rem;
		color: #ffffff;
	}

	.card-svg-top {
		text-align: center;
		font-size: 60px;
		color: #fff;
	}
</style>
