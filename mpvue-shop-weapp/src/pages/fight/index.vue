<template>
  <div class="fight">
    <div class="header">
      <div class="title">洁美万人团 今日疯抢中</div>
      <div class="time">
        <span class="time-content">
          距结束&nbsp;&nbsp;
          <span class="time-box">{{endDay}}</span> ：
          <span class="time-box">{{endHouse}}</span> ：
          <span class="time-box">{{endMinute}}</span> ：
          <span class="time-box">{{endSecond}}</span>
        </span>
      </div>
    </div>
    <div class="content">
      <div class="goods-top">
        <div class="left">
          <img :src="fightInfo.primary_pic_url" alt />
          <div class="num">{{fightInfo.need_usernum}}件成团</div>
        </div>
        <div class="right">
          <div>
            <div class="title">{{fightInfo.name}}</div>
            <div class="tag">
              <span>降价补差</span>
              <span>正品保证</span>
              <span>新鲜速递</span>
            </div>
            <!-- <div class="progress">
              <div class="progress-total">
                <span class="progerss-buy"></span>
              </div>
              <div class="bought-num">已抢9件</div>
            </div>-->
          </div>

          <div class="price">
            <span class="text">万人团价</span>
            <span class="now-price">
              ￥
              <span class="n-price">{{fightInfo.groupbuy_price}}</span>
            </span>
            <del class="old-price">￥{{fightInfo.retail_price}}</del>
          </div>
        </div>
      </div>
      <div class="goods-btn" @click="joinFight()">立即参与拼单</div>
      <div class="goods-person">
        <div class="header">
          {{fightInfo.need_usernum}}人已抢
          <span>{{ joinNum }}</span>件，
          <span>{{endDay}}:{{endHouse}}:{{endMinute}}:{{endSecond}}</span>后结束
        </div>
        <div class="avatar-list">
          <img v-for="(item, index) in fightInfo.userInfos" :key="index" :src="item.avatarUrl" />
          <!-- <img src="http://weapp.cdbook.xyz/images/2.png" />
          <img src="http://weapp.cdbook.xyz/images/3.png" />-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post } from "../../utils";
export default {
  onPullDownRefresh() {},
  onReachBottom() {},
  created() {

  },
  mounted() {
    this.ptId = this.$root.$mp.query.id;
  },
  onShow(){
        this.ptId = this.$root.$mp.query.id;
    this.getFightInfo();
  },
  data() {
    return {
      topicList: [],
      page: 1,
      total: "",
      ptId: "",
      fightInfo: {},
      joinNum: 0,
      endDay: "00",
      endHouse: "00",
      endMinute: "00",
      endSecond: "00",
      goodsId:'',
      goodsPrice:''
    };
  },
  components: {},
  methods: {
    async getFightInfo() {
      const data = await get("/groupBuy/getPtInfoById", { id: this.ptId });
      this.fightInfo = data.message;
      this.joinNum = data.message.userInfos.length
      console.log(data);
      this.goodsId = data.message.goods_id;
      this.goodsPrice = data.message.groupbuy_price;
      this.countDown();
    },
    async joinFight() {
      const openID = wx.getStorageSync("openId");
      wx.redirectTo({
              url: "/pages/order/main?type=1&goodsNum=1&goodsId="+this.goodsId +'&goodsPrice='+this.goodsPrice+'&ptId='+this.ptId
              //type=1，为拼团
            });
      // try {
      //   const data = await post("/groupBuy/joinPt", {
      //     ptId: this.ptId,
      //     openId: openID
      //   });
      //   if(data.code != -1){
      //      wx.showToast({
      //     title: "参与成功！",
      //     icon: "success",
      //     duration: 2000
      //   });
      //   setTimeout(this.getFightInfo,2000)
      //   }

      // } catch (error) {
      //   console.log("join", error);
      // }
    },
    timeFormat(param) {
      return param < 10 ? "0" + param : param;
    },
    // 倒计时
    countDown(it) {
      var interval = setInterval(() => {
        // 获取当前时间，同时得到活动结束时间数组
        let newTime = new Date().getTime(); // 对结束时间进行处理渲染到页面
        let endTime = new Date(this.fightInfo.end_time).getTime();
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
