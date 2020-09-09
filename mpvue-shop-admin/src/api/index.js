import { getRequest, postRequest } from './request'

export default {
  $$path: {
    topicList:'/list/topicList',
topicCategory:'/list/topicCategory',
addressList:'/list/addressList',
adminList:'/list/adminList',
attributeList:'/list/attributeList',
attributeCategory:'/list/attributeCategory',
attributeCategory:'/list/attributeCategory',
brandList:'/list/brandList',
cartList:'/list/cartList',
categoryList:'/list/categoryList',
channelList:'/list/channelList',
commentList:'/list/commentList',
collectList:'/list/collectList',
feedbackList:'/list/feedbackList',
footprintList:'/list/footprintList',
goodsList:'/list/goodsList',
keyWordsList:'/list/keyWordsList',
orderList:'/list/orderList',
searchHistory:'/list/searchHistory',
shipperList:'/list/shipperList',

  },
  gettopicList (params) {
    return getRequest(this.$$path.topicList, params)
  },
  gettopicCategory (params) {
    return getRequest(this.$$path.topicCategory, params)
  },
  getaddressList (params) {
    return getRequest(this.$$path.addressList, params)
  },
  getadminList (params) {
    return getRequest(this.$$path.adminList, params)
  },
  getattributeList (params) {
    return getRequest(this.$$path.attributeList, params)
  },
  getattributeCategory (params) {
    return getRequest(this.$$path.attributeCategory, params)
  },
  getattributeCategory (params) {
    return getRequest(this.$$path.attributeCategory, params)
  },
  getbrandList (params) {
    return getRequest(this.$$path.brandList, params)
  },
  getcartList (params) {
    return getRequest(this.$$path.cartList, params)
  },
  getcategoryList (params) {
    return getRequest(this.$$path.categoryList, params)
  },
  getchannelList (params) {
    return getRequest(this.$$path.channelList, params)
  },
  getcommentList (params) {
    return getRequest(this.$$path.commentList, params)
  },
  getcollectList (params) {
    return getRequest(this.$$path.collectList, params)
  },
  getfeedbackList (params) {
    return getRequest(this.$$path.feedbackList, params)
  },
  getfootprintList (params) {
    return getRequest(this.$$path.footprintList, params)
  },
  getgoodsList (params) {
    return getRequest(this.$$path.goodsList, params)
  },
  getkeyWordsList (params) {
    return getRequest(this.$$path.keyWordsList, params)
  },
  getorderList (params) {
    return getRequest(this.$$path.orderList, params)
  },
  getsearchHistory (params) {
    return getRequest(this.$$path.searchHistory, params)
  },
  getshipperList (params) {
    return getRequest(this.$$path.shipperList, params)
  },
}
