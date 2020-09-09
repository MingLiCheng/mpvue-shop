const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('koa-weapp-demo')
const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
const config = require('./config')

app.use(async (ctx, next)=> {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
      ctx.body = 200; 
    } else {
      await next();
    }
});

// // 使用响应处理中间件
app.use(response)
// 解析请求体
app.use(bodyParser())



// 引入路由分发
const router = require('./routes/weapp')
app.use(router.routes())

const adminRouter = require('./routes/admin')
app.use(adminRouter.routes())

// 启动程序，监听端口
app.listen(config.port, () => debug(`listening on port ${config.port}`))