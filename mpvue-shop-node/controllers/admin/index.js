/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-04-07 21:44:28
 */
const {
  mysql
} = require('../../mysql')

module.exports = {
  topicList: async function (ctx) {
    const { page , size} = ctx.request.query
    const banner = await mysql('nideshop_topic').select().orderBy('sort_order', 'asc').limit(size).offset(Number(page - 1) * size);
    const total = await mysql('nideshop_topic').count('id as total').first()
    ctx.body = {
      list: banner,
      total: total.total
    }
  },
  topicDetail: async function (ctx) {
    const { id } = ctx.request.query
    const banner = await mysql('nideshop_topic').select().where('id', id).orderBy('sort_order', 'asc').first()
    ctx.body = {
      detail: banner,
    }
  },
  editTopicDetail: async function (ctx) {
    const { id, title ,subtitle,avatar,scene_pic_url,item_pic_url,content } = ctx.request.body
    const banner = await mysql('nideshop_topic').update({
      title, subtitle, avatar, scene_pic_url, item_pic_url, content
    }).where('id', id)
    ctx.body = {
      code:  banner > 0 ? 0 : -1,
      message: banner > 0 ? 'SUCCESS' : 'Fail'
    }
  },
  topicCategory: async function (ctx) {
    const banner = await mysql('nideshop_topic_category').select();
    ctx.body = {
      list: banner
    }
  },
  addressList: async function (ctx) {
    const banner = await mysql('nideshop_address').select();
    ctx.body = {
      list: banner
    }
  },
  adminList: async function (ctx) {
    const banner = await mysql('nideshop_admin').select();
    ctx.body = {
      list: banner
    }
  },
  userList: async function (ctx) {
    const res = await mysql('cSessionInfo').select('uuid', 'open_id', 'create_time', 'last_visit_time', 'user_info')
    ctx.body = {
      list: res.map(v => {
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
  attributeList: async function (ctx) {
    const banner = await mysql('nideshop_attribute').select();
    ctx.body = {
      list: banner
    }
  },
  attributeCategory: async function (ctx) {
    const banner = await mysql('nideshop_attribute_category').select();
    ctx.body = {
      list: banner
    }
  },
  attributeCategory: async function (ctx) {
    const banner = await mysql('nideshop_attribute_category').select();
    ctx.body = {
      list: banner
    }
  },
  brandList: async function (ctx) { // 品牌
    const banner = await mysql('nideshop_brand').select();

    ctx.body = {
      list: banner
    }
  },
  cartList: async function (ctx) { // 品牌
    const banner = await mysql('nideshop_cart').select();
    ctx.body = {
      list: banner
    }
  },
  categoryList: async function (ctx) { // 分类列表
    const list = await mysql('nideshop_category').select()
    ctx.body = {
      list
    }
  },
  channelList: async function (ctx) { // 分类列表
    const list = await mysql('nideshop_channel').select()
    ctx.body = {
      list
    }
  },
  commentList: async function (ctx) { // 分类列表
    const list = await mysql('nideshop_comment').select()
    ctx.body = {
      list
    }
  },
  collectList: async function (ctx) { // 分类列表
    const list = await mysql('nideshop_collect').select()
    ctx.body = {
      list
    }
  },
  feedbackList: async function (ctx) { // 分类列表
    const list = await mysql('nideshop_feedback').select()
    ctx.body = {
      list
    }
  },
  footprintList: async function (ctx) { // 分类列表
    const list = await mysql('nideshop_footprint').select()
    ctx.body = {
      list
    }
  },
  goodsList: async function (ctx) { // 分类列表
    let { page = 1, size = 10 } = ctx.request.query
    const list = await mysql('nideshop_goods').select('nideshop_goods.*', 'nideshop_category.name  as category_name').join('nideshop_category', 'nideshop_category.id', 'nideshop_goods.category_id').orderBy('nideshop_goods.id', 'desc').limit(size).offset(Number(page-1) * size)
    const total = await mysql('nideshop_goods').count('id as total').first()
    ctx.body = {
      list,
      total: total.total
    }
  },
  goodsTypeList: async function (ctx) { // 分类列表
    let { page = 1, size = 10 } = ctx.request.query
    const list = await mysql('nideshop_category').select().where('level', 'L1').orderBy('sort_order', 'asc').limit(size).offset(Number(page-1) * size)
    const total = await mysql('nideshop_category').where('level', 'L1').count('id as total').first()
    ctx.body = {
      list,
      total: total.total
    }
  },
  geyGoodsTypeChildren: async function (ctx) { // 分类列表
    let { id, page,size  } = ctx.request.query
    const list = await mysql('nideshop_category').select().where('parent_id', id).orderBy('sort_order', 'asc').limit(size).offset(Number(page - 1) * size)
    const total = await mysql('nideshop_category').where('parent_id', id).count('id as total').first()
    ctx.body = {
      list,
      total: total.total
    }
  },
  editGoodsTypeInfo: async function (ctx) { // 分类列表
    let { id, name,front_desc, icon_url,banner_url,img_url, wap_banner_url  } = ctx.request.body
    const res = await mysql('nideshop_category').update({
      name, front_desc, icon_url, banner_url, img_url, wap_banner_url
    }).where('id', id)
    ctx.body = {
      res,
    }
  },
  keyWordsList: async function (ctx) { // 分类列表
    const list = await mysql('nideshop_keywords').select()
    ctx.body = {
      list
    }
  },


  shipperList: async function (ctx) { // 分类列表
    const list = await mysql('nideshop_shipper').select()
    ctx.body = {
      list
    }
  },


}