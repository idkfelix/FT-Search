<script>
    import InfiniteScroll from "svelte-infinite-scroll";
	import {Search} from './Search.js'
	
	let items = []
	let query = ''
	let page = 0
</script>

<svelte:head>
	<title>FT Search</title>
</svelte:head>

<main class="dark">
	<input 
		placeholder="Search Items"
		bind:value={query}
		on:change={async() => {
				page = 1
				items = await Search(query, page)
		}}
	/>
	
	<div class="container">
		{#each items as item}
			<a href={item.url} class="item">
				<img src={item.images[0].url} alt=""/>
				<p>{item.name}</p>
				<p>
					${item.price_info.final_price}
					{#if item.price_info.final_price != item.price_info.regular_price}
						<strike>${item.price_info.regular_price}</strike>
					{/if}
				</p>
			</a>
		{/each}
	</div>
	
	<InfiniteScroll 
		on:loadMore={async() => {
			items = [
				...items, 
				...(await Search(query,(++page)))
			]
		}} 
		threshold={150} 
		window={true} 
	/>
</main>

<style>	
	main {
		padding: 20px;
		max-width: 900px;
		margin: 0 auto 0 auto;
	}

	input {
		width: 100%;
		font-size: x-large
	}
	
	.container {
		margin-top: 20px;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 20px;
	}
	
	.item {
		flex: 0 0 200px;
		color: white;
		text-decoration: none;
		&> img {
			width: 100%;
		}
	}
</style>