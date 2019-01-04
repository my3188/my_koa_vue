const Koa = require('koa');
const route = require('koa-route');
const koaBody = require('koa-body');
const app = new Koa();

function delay(time) {
	return new Promise(function(resolve, reject) {
	  setTimeout(function(){
	    resolve();
	  }, time);
	});
};

const redirect = ctx => {
	ctx.response.redirect('/');
};

const main = ctx => {
	ctx.response.body = {main:'Hello World'};
};

let toJson = function(obj) {
	console.log('--------------------', obj)
		// return JSON.parse(obj)
}
const testget = ctx => {
	console.log('ctx.request.query', ctx.request.query)
	ctx.body = {
		'ctx.request.query': ctx.request.query,
		'ctx.request.querystring': ctx.request.querystring
	};
};


const testpost2 = async ctx => {
	/*console.log('ctx.request.body', ctx.request.body)
	ctx.response.body = {
		'ctx.request.body': ctx.request.body
	};*/

	  await delay(2000);
	  ctx.response.body = {
		'ctx.request.body': ctx.request.body
	};
};
const testpost = async ctx => {
	/*console.log('ctx.request.body', ctx.request.body)
	ctx.response.body = {
		'ctx.request.body': ctx.request.body
	};*/

	  // await delay(2000);
	  ctx.response.body = {
		'ctx.request.body': ctx.request.body
	};
};

const testput = ctx => {
	console.log('ctx.request.body', ctx.request.body)
	ctx.response.body = {
		'ctx.request.body': ctx.request.body
	};
};

const testdelete = ctx => {
	console.log('ctx.request.body', ctx.request)
	ctx.response.body = {
		'ctx.request.body': ctx.request.body
	};
};

const mayue = async function(ctx) {
	const body = ctx.request.body;
	if (!body.name) ctx.throw(400, '.name required');
	ctx.body = {
		name: body.name
	};
};

app.use(koaBody({
	multipart: true,
	strict: false, //如果为true，不解析GET,HEAD,DELETE请求
	formidable: {
		maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
	}
}));

app.use(route.get('/', main));
app.use(route.get('/mayue', mayue));
app.use(route.get('/redirect', redirect));
app.use(route.get('/testget', testget));
app.use(route.post('/testpost', testpost));
app.use(route.post('/testpost2', testpost2));
app.use(route.put('/testput', testput));
app.use(route.del('/testdelete', testdelete));


app.use(main);
console.log('app starting......')
app.listen(3000);