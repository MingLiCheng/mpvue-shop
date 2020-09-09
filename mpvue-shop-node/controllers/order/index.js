const {
    mysql
} = require('../../mysql');

async function submitAction(ctx) {
    const {
        openId,
    } = ctx.request.body;
    let goodsId = ctx.request.body.goodsId;
    let allPrise = ctx.request.body.allPrise
    //是否存在在订单
    const isOrder = await mysql('nideshop_order').where({
        user_id: openId,
    }).select();
    // 存在
    // var nowgoodsid = "";
    if (isOrder.length > 0) {
        //现在的goodsId加上以前的
        // goodsId = isOrder[0].goods_id + ',' + goodsId;
        // allPrise = isOrder[0].allprise + allPrise
        const data = await mysql('nideshop_order').where({
            user_id: openId,
        }).update({
            user_id: openId,
            goods_id: goodsId,
            allprice: allPrise
        })
        if (data) {
            ctx.body = {
                data: true
            }
        } else {
            ctx.body = {
                data: false
            }
        }
    } else {
        const data = await mysql('nideshop_order').insert({
            user_id: openId,
            goods_id: goodsId,
            allprice: allPrise
        })
        if (data) {
            ctx.body = {
                data: true
            }
        } else {
            ctx.body = {
                data: false
            }
        }
    }


}
async function detailAction(ctx) {
    const openId = ctx.query.openId;
    const addressId = ctx.query.addressId || '';
    const orderDetail = await mysql('nideshop_order').where({
        user_id: openId,
    }).select();

    var goodsIds = orderDetail[0].goods_id.split(",");
    console.log(goodsIds);

    const list = await mysql('nideshop_cart').andWhere({
        user_id: openId
    }).whereIn('goods_id', goodsIds).select();

    //收货地址
    var addressList;
    if (addressId) {
        addressList = await mysql("nideshop_address")
            .where({
                user_id: openId,
                id: addressId
            }).orderBy('is_default', 'desc')
            .select();
    } else {
        addressList = await mysql("nideshop_address")
            .where({
                user_id: openId,
            }).orderBy('is_default', 'desc')
            .select();
    }


    ctx.body = {
        allPrise: orderDetail[0].allprice,
        goodsList: list,
        address: addressList[0] || {}
    }

}
async function listAction(ctx) {
    const {
        order_status,
        openId
    } = ctx.request.query
    console.log('order_status', order_status, 'openId', openId);
    let sql = mysql('nideshop_order').select()
    if (!openId) {
        ctx.body = {
            message: '请传入参数： openId'
        }
        return false
    }else {
        sql = sql.where('user_id',openId)
    }
    if (order_status){
        sql = sql.where('user_id', openId).where('order_status', order_status)
    }
    const list = await sql
    list.map( item => {
        item.goodsInfos = item.goods_id.split(',').map(v => {
            return {
                goods_id: v
            }
        })
        return item
    })
    res = await Promise.all(
            list.map(async item => {
                item.goodsInfos = await Promise.all(
                    item.goodsInfos.map(async goodInfo => {
                        let goodInfores = await mysql('nideshop_goods').select().where('id', goodInfo.goods_id).first()
                        return {
                            ...goodInfores
                        }
                    })
                )
                return item
            })
    )

    ctx.body = {
        list:res
    }
}
async function editStatus(ctx) {
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
}
async function addOrder(ctx) {
    const {
        openId,
        goodsIds,
        allPrice,
        order_type,
        ptId
    } = ctx.request.body
    console.log('openId, goodsIds, allPrice,order_type', openId, goodsIds, allPrice, order_type);
    if (order_type != '1'){
        const res = await mysql('nideshop_order').insert({
            user_id: openId,
            goods_id: goodsIds,
            allprice: allPrice,
            order_status: 0,
            pay_status: 0,
            order_type,
        })
        ctx.body = {
            code: res > 1 ? 1 : -1,
            message: res > 1 ? 'SUCCESS' : 'Fail',
            res
        }
    } else if (order_type == '1'){ // 拼团订单
        const res = await mysql('nideshop_order').insert({
            user_id: openId,
            goods_id: goodsIds,
            allprice: allPrice,
            order_status: 0,
            pay_status: 0,
            order_type,
            group_buy_id: ptId
        })
        ctx.body = {
            code: res > 1 ? 1 : -1,
            message: res > 1 ? 'SUCCESS' : 'Fail',
            res
        }
    }
}
module.exports = {
    submitAction,
    detailAction,
    listAction,
    editStatus,
    addOrder
}