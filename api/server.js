const Koa = require('koa');
const Router = require('koa-router');
const Axios = require('axios');
const cors = require('@koa/cors');


const app = new Koa();
const router = new Router();
const port = 3000;
const url = "https://api.coinmarketcap.com/v1/ticker/"

app.use(cors());


const handleRes = () => {

	const request = Axios.get(url)
	.then(response => {
		return response.data;
	})
	.catch(error => {
		return error.response.data;
	});

	return {
		db : request
	};

};

handleRes().db
.then(data => {
	let result; 
	router.get('/', async function(ctx) {
		ctx.body = data;
	});

	router.get("/coin", async function(ctx){
		let qs = ctx.query.search;
		data.forEach((item) => {
			if(item.symbol == qs){
				result = {status : "success", symbol: item.symbol, price_usd: item.price_usd};
			}

		});
		if (!result){
			 ctx.status = 404;
			 ctx.body = {status : "error"};

		}
		else {
			ctx.body = result;
		}
		result = "";

	});
});



app.use(router.routes()).use(router.allowedMethods());


app.listen(port);