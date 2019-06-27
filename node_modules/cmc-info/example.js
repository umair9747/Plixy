let cmc_api = require('./cmc-api.js');
let cmc = new cmc_api('YOUR_API_KEY');

cmc.requestCoinBySymbol('BTC', 'price')
	.then(data => {
		console.log(data);
	})
	.catch(error => {
		console.error("error");
	});
