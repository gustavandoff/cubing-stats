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
		<h5 class="card-title">{title}</h5>
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

	.card-svg-top {
		text-align: center;
		font-size: 50px;
		color: #fff;
	}
</style>
