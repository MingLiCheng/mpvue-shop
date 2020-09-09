const {
  mysql
} = require('../../mysql')

module.exports = {
  // 管理员 添加一个  发起一个砍价 的商品
  initiateReduceBuy: async function (ctx) {
    const {
      goods_id,
      reduce_price,
      end_time
    } = ctx.request.body
    const res = await mysql('nideshop_reduce_buy_goods').insert({
     goods_id,
     reduce_price,
     end_time: new Date(end_time)
    })

    ctx.body = {
      code: res > 0 ? 1 : -1,
      message: res > 0 ? 'SUCCESS':'Fail'
    }
  },
  updateReduceBuy: async function (ctx) {
    const { end_time,id } = ctx.request.body
    const res = await mysql('nideshop_reduce_buy_goods').update({
      end_time: new Date(end_time)
    }).where('id', id)

    ctx.body = {
      res
    }
  },
  delReduceBuyGoods: async function(ctx){
    const {
      id
    } = ctx.request.body

    const res = await mysql('nideshop_reduce_buy_goods').del().where('id', id)

    ctx.body = {
      code: 0,
      list: res
    }
  },
  // 查询拼团信息列表
  reduceBuyInfoList: async function (ctx) { // 列表
    const ptRes = await mysql('nideshop_reduce_buy_goods')
    .select('nideshop_reduce_buy_goods.id', 'reduce_price', 'goods_id', 'end_time', 'name', 'retail_price', 'list_pic_url')
    .join('nideshop_goods', 'nideshop_reduce_buy_goods.goods_id', 'nideshop_goods.id').orderBy('nideshop_reduce_buy_goods.id', 'asc')
    .limit(10)

    ctx.body = {
      list: ptRes,
    }
  },
  // 查询详细信息
  getReduceBuyInfoById: async function (ctx) {
    const {
      id
    } = ctx.request.query
    const ptRes = await mysql('nideshop_reduce_buy')
      .select('nideshop_reduce_buy.*', 'name', 'list_pic_url', 'nideshop_reduce_buy_goods.end_time', 'nideshop_reduce_buy_goods.reduce_price')
      .join('nideshop_reduce_buy_goods', 'nideshop_reduce_buy_goods.goods_id', 'nideshop_reduce_buy.goods_id')
      .where('nideshop_reduce_buy.id', id)
      .join('nideshop_goods', 'nideshop_reduce_buy.goods_id', 'nideshop_goods.id')
      .first()
      // console.log('ptRes', ptRes);


      const initiateUserRes = await mysql('cSessionInfo').select('uuid', 'open_id', 'create_time', 'last_visit_time', 'user_info').where('cSessionInfo.open_id', ptRes.initiate_user_id).first()
      let userInfo = JSON.parse(initiateUserRes.user_info)
      ptRes.initiateUserInfo = Object.assign({}, userInfo, {
        user_info: true,
        nickName: userInfo.nickName,
        gender: userInfo.gender,
        country: userInfo.country,
        avatarUrl: userInfo.avatarUrl,
      })

    ptRes.userInfos = ptRes.user_ids.length > 0 ? ptRes.user_ids.split(',') : []
    ptRes.userPrices = ptRes.user_prices.length > 0 ? ptRes.user_prices.split(',') : []
    ptRes.userInfos = await Promise.all(
      ptRes.userInfos.map(async (item,index) => {
        const userInfo = await mysql('cSessionInfo')
          .select('uuid', 'open_id', 'create_time', 'last_visit_time', 'user_info')
          .where('cSessionInfo.open_id', item).first()
        const info = JSON.parse(userInfo.user_info)
        return Object.assign({}, info, {
          user_info: true,
          nickName: info.nickName,
          gender: info.gender,
          country: info.country,
          avatarUrl: info.avatarUrl,
          userPrice: ptRes.userPrices[index]
        })
      })
    )

    ctx.body = {
      message: ptRes
    }
  },
  // 参加砍价  用户点击参加某个商品的拼团
  joinReduceBuy: async function (ctx) {
    const { goods_id, openId } = ctx.request.body
    // 先查询一下
    const qRes = await mysql('nideshop_reduce_buy').select().where({goods_id, initiate_user_id: openId})
    if (qRes.length>0){
      ctx.body = {
        code: -1,
        message: '您已参加该商品的拼团活动'
      }
      return false
    }
    // 生成一个新记录
    const iRes = await mysql('nideshop_reduce_buy').insert({
      initiate_user_id: openId,
      goods_id,
      user_ids:'oQmbb4sNZdxaUQZ0sfYgvtOP2S7c',
      user_prices: 0.01,
    })
    console.log('qRes', iRes);

    ctx.body = {
      code: iRes.length > 0 ? 1 : -1,
      message: iRes.length > 0 ? iRes[0] : 'Fail'
    }
  },
  // 好友帮忙
  reduceBuyForOther: async function (ctx) {
    const { rbId,openId } = ctx.request.body
    const ptInfo = await mysql('nideshop_reduce_buy')
    .select('nideshop_reduce_buy.user_ids', 'nideshop_reduce_buy.initiate_user_id', 'nideshop_reduce_buy.user_prices', 'nideshop_reduce_buy_goods.reduce_price', 'nideshop_reduce_buy.goods_id')
    .join('nideshop_reduce_buy_goods', 'nideshop_reduce_buy_goods.goods_id', 'nideshop_reduce_buy.goods_id')
    .where('nideshop_reduce_buy.id', rbId).first()
    console.log('ptInfo', ptInfo);

    const ptRes = await mysql('nideshop_reduce_buy')
      .update({
        'user_ids': ptInfo.user_ids + (ptInfo.user_ids ? ',' : '') + openId,
        'user_prices': ptInfo.user_prices + (ptInfo.user_prices ? ',' : '') + Math.round(Math.random() * 5),
      })
      .where('nideshop_reduce_buy.id', rbId)

      // 查询当前总砍价
      const totalRes = await mysql('nideshop_reduce_buy').select('nideshop_reduce_buy.user_prices').where('nideshop_reduce_buy.id', rbId).first()
      console.log('totalRes', totalRes);

      const totalPrice = totalRes.user_prices.split(',').reduce((prev, curr) => parseFloat(prev)  + parseFloat(curr) )
      console.log('totalPrice', totalPrice, 'ptInfo.reduce_price',ptInfo.reduce_price);

      if (totalPrice >= ptInfo.reduce_price){// 砍价结束
        // 生成一个为付款的订单
        const orderRes = await mysql('nideshop_order').insert({
          user_id: ptInfo.initiate_user_id, goods_id: ptInfo.goods_id, allprice: ptInfo.reduce_price, order_status: 0, pay_status: 0, order_type: 2 // 拼团订单
        })
        const xx = await mysql('nideshop_reduce_buy').update({
          result_status: 2
        }).where('id', rbId)
        console.log('orderRes', orderRes);
        ctx.body = {
          code: 2, //结束
          message: '结束'
        }

      }else{
        ctx.body = {
          code: ptRes > 0 ? 1 : -1,
          message: ptRes > 0 ? 'SUCCESS' : 'Fail'
        }
      }


  },
  // 查询当前参加的砍价的相关信息列表
  getReduceBuyListByOpenId: async function (ctx) {
    const { openId } = ctx.request.query
    const res = await mysql('nideshop_reduce_buy').select('nideshop_reduce_buy.*', 'nideshop_reduce_buy_goods.reduce_price', 'nideshop_goods.name as goods_name', 'nideshop_goods.goods_brief', 'nideshop_goods.retail_price', 'nideshop_goods.list_pic_url')
    .join('nideshop_reduce_buy_goods', 'nideshop_reduce_buy.goods_id', 'nideshop_reduce_buy_goods.goods_id')
    .join('nideshop_goods', 'nideshop_reduce_buy.goods_id', 'nideshop_goods.id')
    .where('nideshop_reduce_buy.initiate_user_id', openId)
    ctx.body = {
      code: 1,
      list: res
    }
  }

}