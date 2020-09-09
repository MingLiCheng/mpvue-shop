import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    "usingComponents": {
      "wux-popup": "../../../static/wux/popup/index",
      "wux-cell-group": "../../../static/wux/cell-group/index",
      "wux-cell": "../../../static/wux/cell/index",
      "wux-button": "../../../static/wux/button/index",
      "wux-keyboard": "../../../static/wux/keyboard/index"
    }
  }
}
