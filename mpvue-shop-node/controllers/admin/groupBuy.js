const {
  mysql
} = require('../../mysql')

module.exports = {
  // 发起一个拼团 admin
  initiateGroupBuy: async function (ctx) {
    const {
      goods_id,
      groupbuy_name,
      need_usernum,
      groupbuy_price,
      end_time
    } = ctx.request.body
    const res = await mysql('nideshop_group_buy').insert({
      groupbuy_name,
      goods_id,
      need_usernum,
      'is_finish': 0,
      'user_ids': 'oQmbb4sNZdxaUQZ0sfYgvtOP2S7c',
      'end_time': new Date(end_time),
      'groupbuy_price': parseFloat(groupbuy_price).toFixed(2)
    })

    ctx.body = {
      res,
    }
  },
  // 更新拼团信息 admin
  updateGroupBuyInfo: async function (ctx) {
    const {
      id,
      groupbuy_name,
      need_usernum,
      end_time
    } = ctx.request.body

    const res = await mysql('nideshop_group_buy').update({
      groupbuy_name,
      need_usernum,
      end_time: new Date(end_time)
    }).where('id', id)
    ctx.body = {
      res
    }
  },
  // 查询拼团信息列表
  ptInfoList: async function (ctx) { // 分类列表
    const {
      isShowAll
    } = ctx.request.query
    let sql = mysql('nideshop_group_buy').select('nideshop_group_buy.id', 'user_ids', 'goods_id', 'need_usernum', 'groupbuy_price', 'groupbuy_name',
      'end_time', 'name', 'retail_price', 'list_pic_url').join('nideshop_goods', 'nideshop_group_buy.goods_id', 'nideshop_goods.id')
    if (!isShowAll) {
      sql = sql.whereNot('nideshop_group_buy.is_finish', 1)
    }
    ptRes = await sql
    let list = ptRes.map(item => {
      item.userInfos = item.user_ids.split(',').map(v => {
        return {
          user_id: v
        }
      })
      return item
    })

    let userInfoList = []
    list.map(item => {
      item.userInfos.map(v => {
        userInfoList.push(v.user_id)
      })
    })

    let aaa = await Promise.all(
      userInfoList.map(async v => {
        const xx = await mysql('cSessionInfo').select('uuid', 'open_id', 'create_time', 'last_visit_time', 'user_info')
          .where('cSessionInfo.open_id', v).first()
        if (!xx) {
          return {}
        }
        const info = JSON.parse(xx.user_info)
        return Object.assign({}, info, {
          user_info: true,
          nickName: info.nickName,
          gender: info.gender,
          country: info.country,
          avatarUrl: info.avatarUrl,
        })
      })
    )

    list = list.map(item => {
      item.userInfos = item.userInfos.length > 0 ? item.userInfos.map(v => {
        let cc = aaa.find(item => item.openId === v.user_id)
        return cc || []
      }) : []
      return item
    })

    ctx.body = {
      list,
      ptRes
    }
  },
  // 查询详细信息
  getPtInfoById: async function (ctx) {
    const {
      id
    } = ctx.request.query
    const ptRes = await mysql('nideshop_group_buy')
      .select('nideshop_group_buy.*', 'user_ids', 'goods_id', 'end_time', 'name', 'retail_price', 'list_pic_url', 'primary_pic_url')
      .where('nideshop_group_buy.id', id)
      .join('nideshop_goods', 'nideshop_group_buy.goods_id', 'nideshop_goods.id').first()

    ptRes.userInfos = ptRes.user_ids.length > 0 ? ptRes.user_ids.split(',') : []
    ptRes.userInfos = await Promise.all(
      ptRes.userInfos.map(async item => {
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
        })
      })
    )

    ctx.body = {
      message: ptRes
    }
  },
  // 参加拼团
  joinPt: async function (ctx) {
    const {
      ptId,
      openId
    } = ctx.request.body
    console.log('ptId', ptId, 'openId', openId);

    if (!openId) {
      ctx.body = {
        code: -1,
        message: '请出入openId'
      }
    } else {
      // 首先查询
      const ptInfo = await mysql('nideshop_group_buy').select('nideshop_group_buy.user_ids', 'nideshop_group_buy.need_usernum').where('id', ptId).first()
      if (ptInfo.user_ids.split(',').length >= ptInfo.need_usernum) {
        ctx.body = {
          code: -1,
          message: '该拼团已经结束'
        }
      } else {
        console.log('22222222222222222222222222222222222222');

        let newUserIds = ptInfo.user_ids + (ptInfo.user_ids ? ',' : '') + openId;
        const ptRes = await mysql('nideshop_group_buy')
          .update({
            'nideshop_group_buy.user_ids': newUserIds,
          })
          .where('nideshop_group_buy.id', ptId)
        console.log('添加拼团成功，', '当前拼团总人数：', newUserIds.split(',').length, '所需人数:', ptInfo.need_usernum);

        if (ptRes == 1 && (newUserIds.split(',').length >= ptInfo.need_usernum)) {
          // 最后一个参加 成功后 把 订单列表中 所有对用这个拼团ID的全部 置为已发货
          console.log('最后一个参加 成功后 把 订单列表中 所有对用这个拼团ID的全部 置为已发货');

          const xx = await mysql('nideshop_group_buy')
            .update({
              'nideshop_group_buy.is_finish': 1,
            })
            .where('nideshop_group_buy.id', ptId)

          const editRes = await mysql('nideshop_order').update({
            order_status: 1
          }).where({
            'group_buy_id': ptId,
            'order_type': 1
          })
          console.log('1editReseditReseditReseditReseditReseditRes', editRes);

          ctx.body = {
            code: 0,
            message: 'SUCCESS',
            isFinish: true,
            xx,
            newUserIds,
            ptRes,
            editRes
          }
          return false
        } else {
          ctx.body = {
            code: 0,
            message: ptRes > 0 ? 'SUCCESS' : 'Fail',
            ptRes,
            isFinish: false,
            newUserIds
          }
        }
      }
    }




  },
  // 查询所有商品的列表
  goodsListMap: async function (ctx) {
    const {
      page = 1, size = 100
    } = ctx.request.query
    const list = await mysql('nideshop_goods').select('id', 'name').orderBy('id').limit(size).offset(Number(page - 1) * size);
    ctx.body = {
      list
    }
  }
}