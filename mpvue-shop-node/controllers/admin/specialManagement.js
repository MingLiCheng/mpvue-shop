const {
  mysql
} = require('../../mysql')

module.exports = {
  delTopicDetail: async function (ctx) {
    const { id } = ctx.request.body
    const list = await mysql('nideshop_topic').del().where('id', id)
    ctx.body = {
      code: 0,
      list
    }

  }
}
