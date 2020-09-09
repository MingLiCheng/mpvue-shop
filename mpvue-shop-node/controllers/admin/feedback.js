const {
  mysql
} = require('../../mysql')

module.exports = {
  feedbackInfoList:async function (ctx) {
    const list = await mysql('nideshop_feedback').select()
    ctx.body = {
      code: 0,
      list
    }

  }
}
