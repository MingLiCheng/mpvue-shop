/*
 * @Description:
 * @Author: mlcheng2
 * @Date: 2020-04-16 14:28:48
 */
const {
  mysql
} = require('../../mysql')
module.exports = {
  editKeyWords: async function (ctx) {
    const {
      id,
      keyword,
      is_hot,
      is_default,
      is_show,
      sort_order,
      scheme_url,
      type
    } = ctx.request.body
    if (id) {
      const res = await mysql('nideshop_keywords').update({
        keyword,
        is_hot,
        is_default,
        is_show,
        sort_order,
        scheme_url,
        type
      }).where('id', id)
      ctx.body = {
        code: res > 0 ? 1 : -1,
        message: res > 0 ? 'SUCCESS' : 'Fail',
      }
    } else {
      const res = await mysql('nideshop_keywords').insert({
        keyword,
        is_hot,
        is_default,
        is_show,
        sort_order,
        scheme_url,
        type
      })
      ctx.body = {
        code: res > 0 ? 1 : -1,
        message: res > 0 ? 'SUCCESS' : 'Fail',
      }
    }
  },
  keyWordsList: async function (ctx) {
    const list = await mysql('nideshop_keywords').select()
    ctx.body = {
      code: 1,
      list
    }
  },
  searchHistoryList: async function (ctx) { // 分类列表
    const list = await mysql('nideshop_search_history').select()
    ctx.body = {
      code: 1,
      list
    }
  },
}