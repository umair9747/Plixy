# CoinMarketCap PRO-API interface
Simple API interface for [CoinMarketCap's PRO API](https://pro.coinmarketcap.com/).
Requests are asynchronous and use [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). For simpler implementation, the [request-promise](https://www.npmjs.com/package/request-promise) module is used.

# Functions
`requestGlobalMetrics()`, `requestCoinBySymbol(symbol, [option])`, `requestCoinByRank(rank)`, `requestTopCoins(number)` 

# Installation & use
> npm i cmc-info

How to use in your code: [see example](https://github.com/n3onis/cmc-info/blob/master/example.js).

For getting multiple attributes of a coin at the same time, leave out the second argument in `requestCoinBySymbol(symbol, [option])` (for meta information, e.g. name, rank, supply, quotes) or use the 'quote' argument (for quotes only, e.g. price, volume).  
For getting only a specific attribute, you can use the other [options](#arguments) specified below.  
\* Note that requesting a single attribute uses the same amount of API credits as requesting the whole object with all attributes.

# API key
You can register and get a free API key [here](https://pro.coinmarketcap.com/account). There are also paid options for more advanced and commercial use.  
The free plan includes 300 credits per day. For comparison, `requestCoinBySymbol` uses 1 credit per call.

# Use examples:
  - **requestCoinBySymbol('BTC')**  
  
response:
  ```
{ 
	id: 1,
	name: 'Bitcoin',
	symbol: 'BTC',
	slug: 'bitcoin',
	circulating_supply: 17548650,
	total_supply: 17548650,
	max_supply: 21000000,
	date_added: '2013-04-28T00:00:00.000Z',
	num_market_pairs: 6643,
	tags: [ 'mineable' ],
	platform: null,
	cmc_rank: 1,
	last_updated: '2019-02-20T14:25:27.000Z',
	quote:
	{ 
	  USD:
	  { 	
	    price: 3967.45596071,
	    volume_24h: 8870574483.8468,
	    percent_change_1h: -0.558352,
	    percent_change_24h: -0.290679,
	    percent_change_7d: 9.24773,
	    market_cap: 69623496044.91354,
	    last_updated: '2019-02-20T14:25:27.000Z'
	  }
	} 
}
```

Example use (*1 API credit*):  
`let data = requestCoinBySymbol('BTC');`  
`console.log(data['name'])` => Bitcoin  
`console.log(data['circulating_supply'])` => 17548650  
`console.log(data['quote'])` => 
	  '{ 	
	    price: 3967.45596071,
	    volume_24h: 8870574483.8468,
	    percent_change_1h: -0.558352,
	    percent_change_24h: -0.290679,
	    percent_change_7d: 9.24773,
	    market_cap: 69623496044.91354,
	    last_updated: '2019-02-20T14:25:27.000Z'
	  }'  
`console.log(data['quote']['price'])` => 3967.45596071
		
  - **requestCoinBySymbol('BTC, 'quote')**  

response:
```
{ 
  price: 3968.8811105,
  volume_24h: 8872096540.73199,
  percent_change_1h: -0.522632,
  percent_change_24h: -0.254862,
  percent_change_7d: 9.28697,
  market_cap: 69648505499.77582,
  last_updated: '2019-02-20T14:24:26.000Z'
}
```

Example use (*1 API credit*):  
`let data = requestCoinBySymbol('BTC', 'quote');`  
`console.log(data['price]);` => 3968.8811105  
`console.log(data['volume_24h]);` => 8872096540.73199
  - **requestCoinBySymbol('BTC', [option])**  

  [option] list:
  `name`
  `symbol`
  `slug`
  `circulating_supply`
  `total_supply`
  `max_supply`
  `date_added`
  `num_market_pairs`
  `tags`
  `platform`
  `cmc_rank`
  `last_updated`
  `price`
  `volume_24h`
  `percent_change_1h`
  `percent_change_24h`
  `percent_change_7d`
  `market_cap`  


Example use (*1 API credit*):  
`console.log(requestCoinBySymbol('BTC', price))` => 3968.8811105