<script>
    import InfiniteScroll from "svelte-infinite-scroll";
	import {Search} from './Search.js'
	
	let items = []
	let query = ''
	let page = 0

	let type = ''
	const types = [
		"PO Hood",
		"T-Shirt",
    "Crew",
    "Knit",
    "Jersey",
    "Polo",
    "Jean",
		"Pant",
    "Short",
    "Deck",
	]
</script>

<svelte:head>
	<title>FT Search</title>
</svelte:head>

<main class="dark">
  <h1>
    Fast Times Search
  </h1>

	<input
		class="search" 
		placeholder="Search Items"
		bind:value={query}
    on:change={async() => {
      page = 1
      items = await Search(query+' '+type, page)
    }}
    on:keydown={async(e) => {
      if(e.key == "Enter"){
        page = 1
        items = await Search(query+' '+type, page)
      }
    }}
	/>
	
	<div>
		<label for="Any" class="type" style={type == '' && "outline: solid 2px white;"}> Any
			<input type="radio" name="type" id="Any" on:change={() => type = ''}>
		</label>
		{#each types as t}
			<label 
				for={t} 
				class="type"
				style={type == t && "outline: solid 2px white;"}
			>
				{t}
				<input
					type="radio"
					name="type"
					id={t}
					on:change={() => type = t}
				>
			</label>
		{/each}
	</div>

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
				...(await Search(query+' '+type,(++page)))
			]
		}} 
		threshold={150} 
		window={true} 
	/>
</main>

<style>
  h1 {
    font-size: 50px;
    text-align: center;
    margin: 15px 0 15px 0;
  }

	main {
		padding: 20px;
		max-width: 900px;
		margin: 0 auto 0 auto;
	}

	.search {
		width: 100%;
		font-size: x-large;
		margin-bottom: 10px;
	}

	.type {
		font-size: large;
		background-color: grey;
		padding: 2px 10px 2px 10px;
		margin: 5px 5px 8px 5px;
		border-radius: 3px;
		text-align: center;
    display: inline-flex;
    align-content: center;
    justify-content: center;
		&> input {
			display: none;
		}
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