/*
 * @Description:
 * @Author: mlcheng2
 * @Date: 2020-04-22 21:40:26
 */
const { mysql } = require('../../mysql')

module.exports = {
  specialOfferGoodsList: async function (ctx) {
    const { page=1, size = 10 } = ctx.request.query
    const list = await mysql('nideshop_special_offer_goods').select('nideshop_special_offer_goods.*', 'name', 'goods_brief', 'list_pic_url', 'retail_price')
    .join('nideshop_goods', 'nideshop_special_offer_goods.goods_id', 'nideshop_goods.id')
    .orderBy('nideshop_special_offer_goods.id', 'desc')
    .limit(size).offset(Number(page - 1) * size)
    const total = await mysql('nideshop_special_offer_goods').count('id as total').first()
    ctx.body = {
      code: 1,
      list,
      total: total.total,
      message: 'success'
    }
  },
  addSpecialOfferGoods: async function (ctx) {
    let data = new Date()
    const {
      goods_id,
      special_offer_price,
      special_goods_num,
      end_time
    } = ctx.request.body
    const res = await mysql('nideshop_special_offer_goods').insert({
      goods_id,
      special_offer_price: parseFloat(special_offer_price).toFixed(2),
      special_goods_num,
      end_time: end_time || data.setDate(data.getDate() + 1),
      is_show: 0
    }).orderBy('id')
    ctx.body = {
      code: res.length > 0 ? 1 : -1,
      res,
      message: res.length > 0  ? 'SUCCESS' : 'Fail'
    }
  },
  delSpecialOfferGoods: async function (ctx) {
    const { id } = ctx.request.body
    const res = await mysql('nideshop_special_offer_goods').del().where('id',id)
    console.log('res',res);

    ctx.body = {
      code: res > 0 ? 1 : -1,
      res,
      message: res > 0 ? 'SUCCESS' : 'Fail'
    }

  }
}