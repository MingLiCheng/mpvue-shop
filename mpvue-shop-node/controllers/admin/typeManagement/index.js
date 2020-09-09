const { mysql } = require('../../../mysql')

module.exports = {
  bannerList: async function (ctx) {
    const banner = await mysql('nideshop_ad').select();

    ctx.body = {
      list: banner
    }
  },
  bannerList: async function (ctx) {
    const banner = await mysql('nideshop_ad').select();

    ctx.body = {
      list: banner
    }
  },
}