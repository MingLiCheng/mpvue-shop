const jwt = require('jsonwebtoken')
const {
  mysql
} = require('../../../mysql')





module.exports = {
    adminLogin: async function(ctx) {
        const { email, password } = ctx.request.body
        const userInfo = await mysql('nideshop_admin').select('*').where({'email': email}).first()
        console.log('userInfo', userInfo);

        if (userInfo && userInfo.password == password) {
            const token = jwt.sign({
              email: email
            }, 'jwtSecret', {
                expiresIn: '2h'
              })
          await mysql('nideshop_admin').update({
            last_login_time: new Date().getTime()
          }).where({
            'email': email
          }).first()
            ctx.body = {
              code: 0,
              data: {
                token: `Bearer ${token}`,
                message: 'SUCCESS',
                userInfo: userInfo
              },
            }
          } else {
            ctx.body = {
              code: -1,
              data: {
                msg: '用户名或密码错误'
              },
            }
          }
    }
}