const router = require('koa-router')({
    prefix: '/admin'
})
const controllers = require('../controllers')

// 测试接口
router.get('/test', (ctx, next) => {
    console.log('/test')
    ctx.body = {
      code: 0,
      msg: 'The api of admin is running'
    }
})

// 反馈
router.get('/feedback/feedbackInfoList', controllers.admin.feedback.feedbackInfoList)

router.post('/user/adminLogin', controllers.admin.user.index.adminLogin)

router.post('/goods/addNewGoods', controllers.admin.goodsManagement.index.addNewGoods)
router.get('/goodsManagement/bannerList',controllers.admin.goodsManagement.index.bannerList)
router.post('/goodsManagement/editBannerInfoById', controllers.admin.goodsManagement.index.editBannerInfoById)
router.post('/goodsManagement/delGoodsTypeInfo', controllers.admin.goodsManagement.index.delGoodsTypeInfo)
router.post('/goodsManagement/delGoodsInfoById', controllers.admin.goodsManagement.index.delGoodsInfoById)

// 文章管理
router.get('/list/topicList',controllers.admin.index.topicList)
router.get('/list/topicDetail', controllers.admin.index.topicDetail)
router.post('/list/editTopicDetail', controllers.admin.index.editTopicDetail)
router.post('/specialManagement/delTopicDetail', controllers.admin.specialManagement.delTopicDetail)


router.get('/list/topicCategory',controllers.admin.index.topicCategory)
router.get('/list/addressList',controllers.admin.index.addressList)
router.get('/list/userList',controllers.admin.index.userList)
router.get('/list/adminList',controllers.admin.index.adminList)
router.get('/list/attributeList',controllers.admin.index.attributeList)
router.get('/list/attributeCategory',controllers.admin.index.attributeCategory)
router.get('/list/attributeCategory',controllers.admin.index.attributeCategory)
router.get('/list/brandList',controllers.admin.index.brandList)
router.get('/list/cartList',controllers.admin.index.cartList)
router.get('/list/categoryList',controllers.admin.index.categoryList)
router.get('/list/channelList',controllers.admin.index.channelList)
router.get('/list/commentList',controllers.admin.index.commentList)
router.get('/list/collectList',controllers.admin.index.collectList)
router.get('/list/feedbackList',controllers.admin.index.feedbackList)
router.get('/list/footprintList',controllers.admin.index.footprintList)
router.get('/list/goodsList',controllers.admin.index.goodsList)

router.get('/list/goodsTypeList', controllers.admin.index.goodsTypeList)
router.get('/list/geyGoodsTypeChildren', controllers.admin.index.geyGoodsTypeChildren)
router.post('/list/editGoodsTypeInfo', controllers.admin.index.editGoodsTypeInfo)
router.post('/goodsType/delGoodsTypeInfo', controllers.admin.goodsManagement.index.delGoodsTypeInfo) // id
router.post('/goods/editGoodsInfoById', controllers.admin.goodsManagement.index.editGoodsInfoById) // id
router.get('/goods/getGoodsSwiperImages', controllers.admin.goodsManagement.index.getGoodsSwiperImages) // id
router.post('/goods/editGoodsSwiperImages', controllers.admin.goodsManagement.index.editGoodsSwiperImages) // id
router.post('/goods/editGoodsDescInfoById', controllers.admin.goodsManagement.index.editGoodsDescInfoById) // id
router.post('/goods/addGoodsSwiperImages', controllers.admin.goodsManagement.index.addGoodsSwiperImages) // id
router.get('/goods/getGoodsInfoById', controllers.admin.goodsManagement.index.getGoodsInfoById) // id


router.get('/list/keyWordsList',controllers.admin.index.keyWordsList)


router.get('/list/orderList',controllers.admin.orderManagement.index.orderList)
router.post('/order/editStatus', controllers.admin.orderManagement.index.editStatus)

// 搜索历史
router.get('/list/searchHistoryList', controllers.admin.searchHistory.searchHistoryList)

// 热搜词
router.get('/list/keyWordsList', controllers.admin.searchHistory.keyWordsList)
router.post('/keywords/editKeyWords', controllers.admin.searchHistory.editKeyWords)
router.get('/list/shipperList',controllers.admin.index.shipperList)
router.get('/list/ptInfoList', controllers.admin.groupBuy.ptInfoList)
router.post('/groupBuy/initiateGroupBuy', controllers.admin.groupBuy.initiateGroupBuy)
router.post('/groupBuy/updateGroupBuyInfo', controllers.admin.groupBuy.updateGroupBuyInfo) //修改

router.get('/groupBuy/getPtInfoById', controllers.admin.groupBuy.getPtInfoById) // 查询详情
router.post('/groupBuy/joinPt', controllers.admin.groupBuy.joinPt) // 列表
router.get('/groupBuy/goodsListMap', controllers.admin.groupBuy.goodsListMap) // 查询详情


// 砍价reduceBuyInfoList
router.get('/reduceBuy/reduceBuyInfoList', controllers.admin.reduceBuy.reduceBuyInfoList)
router.post('/reduceBuy/initiateReduceBuy', controllers.admin.reduceBuy.initiateReduceBuy)
router.post('/reduceBuy/updateReduceBuy', controllers.admin.reduceBuy.updateReduceBuy)
router.post('/reduceBuy/delReduceBuyGoods', controllers.admin.reduceBuy.delReduceBuyGoods)
router.get('/reduceBuy/getReduceBuyInfoById', controllers.admin.reduceBuy.getReduceBuyInfoById) // 查询详情
router.post('/reduceBuy/joinReduceBuy', controllers.admin.reduceBuy.joinReduceBuy) // 查询详情

// 特价商品 模块

router.get('/specialOffer/specialOfferGoodsList', controllers.admin.specialOfferGoods.specialOfferGoodsList) // 获取特价商品列表
router.post('/specialOffer/addSpecialOfferGoods', controllers.admin.specialOfferGoods.addSpecialOfferGoods) // 获取特价商品列表
router.post('/specialOffer/delSpecialOfferGoods', controllers.admin.specialOfferGoods.delSpecialOfferGoods) // 删除特价商品列表

module.exports = router