<template>
  <div class="bargin">
    <div class="header">
      <img class="avatar" :src="initiateUserInfo.avatarUrl" alt="">
      <div class="goods">
        <div class="nickname">{{initiateUserInfo.nickName}}</div>
        <div class="title">我发现一件好货，来一起砍价0元拿吧</div>
        <div class="goods-info">
          <div class="left">
            <img :src="bargin.list_pic_url" alt="">
          </div>
          <div class="right">
            <div class="title1">[只亏一次，亏完涨价]{{bargin.name}}</div>
            <div class="price-num">
              <div class="price">￥{{bargin.reduce_price}}</div>
              <!-- <div class="num">7491人已0元拿</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="title-info">已砍<span class="price-bargin">{{reducePriceTotal}}</span>元，还差<span class="price-bargin">{{reduce_goods_price}}</span>元</div>

      <button class="share bargin-btn" v-if="!isShare" hover-class="none" open-type="share" value="">喊好友砍一刀</button>
      <button class="share bargin-btn" hover-class="none" @click="helpFriend" value="">帮好友砍一刀</button>
      <div class="last-time">还剩{{endDay}}:{{endHouse}}:{{endMinute}}:{{endSecond}}结束，快来砍价吧~</div>

      <!-- <div>已完成</div> -->
      <div class="bargin-list">
        <div class="title">砍价帮</div>
        <div class="list">
          <ul>
            <li v-for="(item,index) in bargin.userInfos" :key="index">
              <div class="left">
                <img :src="item.avatarUrl" alt="">
                <div class="user-info">
                  <div class="name">{{item.nickName}}</div>
                  <div class="tip">感情深，刀法稳</div>
                </div>
              </div>
              <div class="right">
                砍掉{{ item.userPrice }}元
              </div>
            </li>

          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { get ,post,getStorageOpenid,toLogin} from "../../utils";
export default {
  onPullDownRefresh() {},
  onReachBottom() {},
  created() {},
  mounted() {
    this.id = this.$root.$mp.query.id;
    console.log('this.$root.$mp.query',this.$root.$mp.query);

    if(this.$root.$mp.query.isShare === 'true'){
      // 通过分享分享进来的
      console.log('isShare');
      this.isShare = true

    }else{
      this.isShare = false
    }
    this.getBargin()
  },

  data() {
    return {
      topicList: [],
      isShare: false,
      page: 1,
      total: "",
      id:"",
      bargin:{},
      endDay: "00",
      endHouse: "00",
      endMinute: "00",
      endSecond: "00",
      reducePriceTotal: 0,
      initiateUserInfo:{
        avatarUrl:'',
        nickName:''
      },
      reduce_goods_price:0,
      isFinish: false
    };
  },
  components: {},
  onShareAppMessage(){
    return {
      title: '好友邀请您帮忙砍价',
      // desc: '好友邀请您帮忙砍价',
      path: `/pages/bargain/main?id=${this.id}&isShare=true` // 路径，传递参数到指定页面。
    }
  },
  methods: {
    async helpFriend(){
      console.log('111');
      if(!toLogin()){
        return false
      }
      let params = {
        rbId: this.id,
        openId: getStorageOpenid()
      }
      try {
        const res = await post('/reduceBuy/reduceBuyForOther',params)
      if(res.code == 1){
        wx.showToast({
          title: "砍价成功", //提示的内容,
          icon: "success", //图标,
          duration: 2000, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: res => { }
        });
        this.getBargin()
      }else if(res.code == 2){
        wx.showToast({
          title: "当前砍价已完成", //提示的内容,
          icon: "none", //图标,
          duration: 2000, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: res => {
           }
        });
                setTimeout(() => {

            wx.switchTab({
              url: '/pages/index/main'
            })
        }, 1000);
      }else{
        wx.showToast({
          title: "砍价失败", //提示的内容,
          icon: "none", //图标,
          duration: 2000, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: res => {
           }
        });

      }
      } catch (error) {
        console.log('error',error);

      }

    },
    async getBargin(){
      let data = await get('/reduceBuy/getReduceBuyInfoById',{id:this.id})
      console.log('data',data);
      this.bargin = data.message
      this.initiateUserInfo.avatarUrl = data.message.initiateUserInfo.avatarUrl
      this.initiateUserInfo.nickName = data.message.initiateUserInfo.nickName
      this.reducePriceTotal = data.message.userPrices.reduce((prev,curr) => (parseFloat(prev)*100 + parseFloat(curr)*100)/100)
      console.log('reducePriceTotal',this.reducePriceTotal);

      this.reduce_goods_price = (data.message.reduce_price*100 - this.reducePriceTotal*100)/100
      console.log('reducePriceTotal',this.reduce_goods_price);
      this.countDown()
      this.isFinish = data.message.result_status == 2 ? true : false
    },
    timeFormat(param) {
      return param < 10 ? "0" + param : param;
    },
    // 倒计时
    countDown(it) {
      var interval = setInterval(() => {
        // 获取当前时间，同时得到活动结束时间数组
        let newTime = new Date().getTime(); // 对结束时间进行处理渲染到页面
        let endTime = new Date(this.bargin.end_time).getTime();
        let obj = null; // 如果活动未结束，对时间进行处理
        if (endTime - newTime > 0) {
          let time = (endTime - newTime) / 1000; // 获取天、时、分、秒
          let day = parseInt(time / (60 * 60 * 24));
          let hou = parseInt((time % (60 * 60 * 24)) / 3600);
          let min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60);
          let sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60);
          obj = {
            day: this.timeFormat(day),
            hou: this.timeFormat(hou),
            min: this.timeFormat(min),
            sec: this.timeFormat(sec)
          };
        } else {
          // 活动已结束，全部设置为'00'
          obj = {
            day: "00",
            hou: "00",
            min: "00",
            sec: "00"
          };
          clearInterval(interval);
        }
        this.endDay = obj.day + "天";
        this.endHouse = obj.hou;
        this.endMinute = obj.min;
        this.endSecond = obj.sec;
        // this.countDownList =
        //   obj.day + "天" + obj.hou + "时" + obj.min + "分" + obj.sec + "秒";
      }, 1000);
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>
