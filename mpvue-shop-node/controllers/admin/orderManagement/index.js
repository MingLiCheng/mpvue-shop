/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-04-07 20:04:33
 */
const {
  mysql
} = require('../../../mysql')

module.exports = {
  bannerList: async function (ctx) {
    const banner = await mysql('nideshop_ad').select();

    ctx.body = {
      list: banner
    }
  },
  orderList: async function (ctx) { // 分类列表
    const { order_type, order_status } = ctx.request.query
    let sqlQuery = mysql('nideshop_order').select().join('cSessionInfo', 'nideshop_order.user_id', 'cSessionInfo.open_id')
    if(order_type){
      sqlQuery = sqlQuery.where({
        'order_type': order_type})
    }

    if (order_status) {
      sqlQuery = sqlQuery.where({
        'order_status': order_status
      })
    }
    const list = await sqlQuery

    ctx.body = {
      list: list.map(v => {
        const info = JSON.parse(v.user_info)
        return Object.assign({}, v, {
          user_info: true,
          nickName: info.nickName,
          gender: info.gender,
          country: info.country,
          avatarUrl: info.avatarUrl,
        })
      })
    }
  },
  editStatus: async function (ctx) {
    const {
      order_id,
      order_status
    } = ctx.request.body
    const res = await mysql('nideshop_order').update({
      order_status
    }).where('id', order_id)
    ctx.body = {
      code: '1',
      res
    }
  },

}