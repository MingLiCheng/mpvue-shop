<template>
  <div class="my">
    <div class="myinfo">
      <div class="user-avatar">
        <open-data v-if="!isLogin" type="userAvatarUrl" @click="toLogin"></open-data>
        <img v-if="isLogin" :src="userInfo.avatarUrl" alt>
      </div>
      <div class="user-nickname" @click="toLogin">
        <p><open-data type="userNickName" class="nickname"></open-data></p>
        <p v-if="!isLogin" class="login-btn">立即登录</p>
      </div>
    </div>
    <div class="iconlist">
      <div @click="goTo(item.url)" v-for="(item, index) in listData" :key="index">
        <span class="iconfont" :class="item.icon"></span>
        <span>{{item.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
  import {
    get,
    toLogin,
    login
  } from "../../utils";
  export default {
    onShow() {
      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
      if (login()) {

        this.userInfo = login();
        this.isLogin = true
        // console.log(this.userInfo);
        // this.avator = this.userInfo.avatarUrl;
      }
    },
    data() {
      return {
        isLogin: false,
        avator: "http://weapp.cdbook.xyz/images/2.png",
        allcheck: false,
        listData: [],
        Listids: [],
        userInfo: {},
        listData: [{
            title: "我的订单",
            icon: "icon-unie64a",
            url: "/pages/myorder/main"
          },
          // {
          //   title: "优惠券",
          //   icon: "icon-youhuiquan",
          //   url: ""
          // },
          // {
          //   title: "我的足迹",
          //   icon: "icon-zuji",
          //   url: ""
          // },
          {
            title: "我的收藏",
            icon: "icon-shoucang",
            url: "/pages/collectlist/main"
          },
          {
            title: "地址管理",
            icon: "icon-dizhiguanli",
            url: "/pages/address/main"
          },
          {
            title: "联系客服",
            icon: "icon-lianxikefu",
            url: ""
          },
          {
            title: "帮助中心",
            icon: "icon-bangzhuzhongxin",
            url: ""
          },
          {
            title: "意见反馈",
            icon: "icon-yijianfankui",
            url: "/pages/feedback/main"
          }
        ]
      };
    },
    components: {},
    methods: {
      doLogin () {
        console.log('xxx');

      qcloud.setLoginUrl('http://127.0.0.1:5757/weapp/login')
      const _this = this
      qcloud.login({
        success: function (userinfo) {
          wx.setStorageSync('userinfo', userinfo)
          // _this.$store.dispatch('setIsLogin', true)
          // _this.$store.dispatch('setOpenId', userinfo.openId)
          // _this.userInfo = userinfo
          console.log('LoginSuccess', userinfo)
          wx.showToast({
            title: '授权成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail: function (err) {
          console.log('登录失败', err)
        }
      })
    },
      goTo(url) {
        if (toLogin()) {
          wx.navigateTo({
            url: url
          });
        }
      },
      toLogin() {
        if (!this.userInfo.avatarUrl) {
          wx.navigateTo({
            url: "/pages/login/main"
          });
        }
      }
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
