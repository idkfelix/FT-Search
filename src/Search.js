export const Search = async (query,page) => {
	let url = 'https://fasttimes.com.au/rest/V1/products-render-info?' + new URLSearchParams({
		// Required fields
		'currencyCode': 'AUD',
		'storeId': 1,
		'searchCriteria[pageSize]': 20,
		'searchCriteria[currentPage]': page,
		// Filter to return useful stuff
		'fields': 'items[url,name,id,price_info[final_price,regular_price],images[url]]',
	})
	
	// Transform query to upper case and split to array
	let words = query.toUpperCase().split(' ')
	
	// Create filter for each word
	for(var i = 0; i < words.length; i += 1){
		url += '&' + new URLSearchParams({
			// Dynamic keys have to be in [] for some reason?
			[`searchCriteria[filter_groups][${i}][filters][0][field]`]: 'name',
			[`searchCriteria[filter_groups][${i}][filters][0][value]`]: `%${words[i]}%`,
			[`searchCriteria[filter_groups][${i}][filters][0][condition_type]`]: 'like',
		})
	}

	// Return nothing if the query is empty
	if(query === '') return []
	
	// Fetch items with constructed query and get JSON data
	let res = await fetch('https://corsproxy.io/?' + encodeURIComponent(url))
		.then(r => r.json())
	
	// Return results, empty if no results
	return res.items ?? []
}