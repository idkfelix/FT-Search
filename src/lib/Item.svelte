<script>
  export let item
  import {GetSKUs} from './GetSKUs.js'
</script>

<div class="item">
  <!-- Image and Title (Link) -->
  <a href={item.url}>
    <img src={item.images[0].url} alt=""/>
    <p>{item.name}</p>
  </a>

  <!-- Current Price -->
  <span>
    ${item.price_info.final_price}

    <!-- Show Original Price -->
    {#if item.price_info.final_price != item.price_info.regular_price}
      <strike>${item.price_info.regular_price}</strike>
    {/if}

    <!-- Get SKUs Button -->
    <button 
      style="float: right"
      on:click={async() => {item.skus = await GetSKUs(item.url)}}
    >
      Get SKUs
    </button>
  </span>

  <!-- Copy Fetched SKUs -->
  {#if item.skus}
    <div class="skus">
      {#each item.skus as s}
        <button 
          class="sku"
          on:click={async() => await navigator.clipboard.writeText(s.sku)}
        >
          {#if s.label} {s.label} - {/if} {s.sku}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
	.item {
		flex: 0 0 200px;
    &> a {
      color: white;
      text-decoration: none;
      &> img {
        width: 100%;
      }
    }
	}

  .skus {
    display: flex;
    flex-direction: column;
    min-width: 100%;
    &> button {
      margin-top: 5px;
    }
  }

  .sku {
    min-width: 100%;
  }
</style>

