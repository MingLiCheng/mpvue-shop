/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-04-07 20:04:38
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
  bannerList: async function (ctx) {
    const banner = await mysql('nideshop_ad').select();

    ctx.body = {
      list: banner
    }
  },
}