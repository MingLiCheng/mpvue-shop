const {
    mysql
} = require('../../../mysql')

module.exports = {
    addNewGoods:async function (ctx) {
        const {
            category_id,
            name,
            goods_brief,
            goods_number,
            retail_price,
            list_pic_url
        } = ctx.request.body
        const res = await mysql('nideshop_goods').insert({
            category_id,
            name,
            goods_brief,
            goods_number,
            retail_price,
            list_pic_url,
            primary_pic_url: list_pic_url,
            goods_unit: '件',
            promotion_desc: '限时购',
            promotion_tag:'',
            app_exclusive_price:0.00,
            is_app_exclusive:0,
            is_limited: 0,
            is_hot: 0,
        })
        ctx.body = {
            res
        }
    },
    bannerList: async function (ctx) {
        const banner = await mysql('nideshop_ad').select();

        ctx.body = {
            list: banner
        }
    },
    getGoodsSwiperImages: async function (ctx) {
        const { goodsId } = ctx.request.query
          const images = await mysql('nideshop_goods_gallery').where({
              goods_id: goodsId
          }).limit(4).select();
          ctx.body = {
              list: images
          }
    },
    editGoodsSwiperImages: async function (ctx) {
        const { id,img_url } = ctx.request.body
          const res = await mysql('nideshop_goods_gallery').update({
              img_url,
          }).where('id', id)
          ctx.body = {
              code: res > 0 ? 0 : -1,
              message: res > 0 ? 'SUCCESS' : 'Fail'
          }
    },
    addGoodsSwiperImages: async function (ctx) {
        const { goodsId,img_url } = ctx.request.body
          const res = await mysql('nideshop_goods_gallery').insert({
              goods_id: goodsId,
              img_url,
              img_desc:'',
              sort_order:'5'
          })
          ctx.body = {
              res
          }
    },
    editBannerInfoById: async function (ctx) {
        const {
            id,
            name,
            link,
            image_url,
            content,
        } = ctx.request.body
        const banner = await mysql('nideshop_ad').update({
            name,
            link,
            image_url,
            content,
        }).where('id', id);

        ctx.body = {
            list: banner
        }
    },
    editGoodsInfoById: async function (ctx) {
        const {
            id,
            name,
            goods_brief,
            goods_number,
            retail_price,
            list_pic_url
        } = ctx.request.body
        const res = await mysql('nideshop_goods').update({
            name,
            goods_brief,
            goods_number,
            retail_price,
            list_pic_url
        }).where('id', id)
        ctx.body = {
            res
        }
    },
    editGoodsDescInfoById: async function (ctx) {
        const { id,primary_pic_url,list_pic_url,goods_desc } = ctx.request.body
        const res = await mysql('nideshop_goods').update({primary_pic_url, list_pic_url, goods_desc}).where('id',id)
        ctx.body = {
            code: res > 0 ? 1 : -1,
            message: res > 0 ? 'SUCCESS' : 'Fail'
        }
    },
    getGoodsInfoById: async function (ctx) {
        const {
            id,
        } = ctx.request.query
        const list = await mysql('nideshop_goods').select().where('id', id).first()
        ctx.body = {
            detail:list
        }
    },
    // 删除商品分类信息
    delGoodsTypeInfo: async function (ctx) {
        const {
            id
        } = ctx.request.body
        console.log('id', id);

        const res = await mysql('nideshop_category').del().where('id', id)

        ctx.body = {
            code: 0,
            list: res
        }
    },
    // 删除商品西
    delGoodsInfoById: async function (ctx) {
        const { id } = ctx.request.body
        const res = await mysql('nideshop_goods').del().where('id',id)
        ctx.body = {
            code: res > 0 ? 0 : -1,
            message: res > 0 ? 'SUCCESS' : 'Fail'
        }
    }

}