import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import moment from 'moment'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import '@/assets/css/reset.less'



axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL='http://127.0.0.1:5757/admin'
Vue.http = Vue.prototype.$http = Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.filter('dateFormat', function (dateStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dateStr).format(pattern)
})
Vue.filter('genderFormat', function (dateStr) {
  return dateStr == 1 ? '男' : '女'
})
Vue.filter('priceFormat', function (dateStr) {
  return dateStr.toFixed('2')
})


router.beforeEach((to, from, next) => { // 跳转前
  if((to.name !== 'signin') && !window.localStorage.getItem('token')){
    next('/signin')
    return
  }
  console.log('before each invoked')
  next() // next 必须执行，才能跳转
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
