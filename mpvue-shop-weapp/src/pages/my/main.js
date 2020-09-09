import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    "usingComponents": {
      "wux-button": "../../static/wux/button/index"
    },
    "navigationBarBackgroundColor": "#ffffff",
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "我的",
    "backgroundColor": "#f5f5f5",
  }
}