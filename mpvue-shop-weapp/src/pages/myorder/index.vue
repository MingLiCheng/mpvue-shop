<template>
  <div class="myorder">
    <wux-popup position="bottom" :visible="visible" @close="closePopup">
      <div class="pay-wrap">
        <div class="opeartion-wrap">
          <span @click="canclePay">取消</span>
          <span class="title">确认支付</span>
        </div>
        <div class="money-wrap">
          <div class="title">payment</div>
          <div class="money">￥{{ allPrice }}</div>
        </div>
        <div class="payee-wrap">
          <span>收款方</span>
          <span>美洁生鲜</span>
        </div>
        <div class="save-wrap">
          <div class="save-btn" @click="openPlain(orderId)">立即支付</div>
        </div>
      </div>
    </wux-popup>
    <div class="header">
      <ul>
        <li :class="{active: cur==3}" @click="getMyOrder(3)">全部</li>
        <li :class="{active: cur==0}" @click="getMyOrder(0)">待付款</li>
        <li :class="{active: cur==1}" @click="getMyOrder(1)">待发货</li>
        <li :class="{active: cur==2}" @click="getMyOrder(2)">待收货</li>
        <li :class="{active: cur==-1}" @click="getMyOrder(-1)">待确认</li>
      </ul>
    </div>
    <div class="content">
      <ul>
        <li v-for="(item,index) in orderArray" :key="index">
          <div
            class="type"
          >{{ item.group_buy_id ? '(拼团订单)' : ''}}{{item.order_status==0?'待付款':item.order_status==1?'待发货':order_status==2?'待收货':order_status==3?'已完成':'待确认'}}</div>
          <div class="goods" v-for="(list,i) in item.goodsInfos" :key="i">
            <div class="goods-img">
              <img :src="list.list_pic_url" alt />
            </div>
            <div class="goods-info">
              <div class="one">
                <div class="title">{{list.name}}</div>
                <div class="price-num">
                  <div class="price">￥{{list.retail_price}}</div>
                  <div class="num">x1</div>
                </div>
              </div>
              <div class="tag">
                <span>七天无理由退换</span>
              </div>
            </div>
          </div>
          <div class="total">
            共1件商品 合计:
            <span class="total-price">￥{{item.allprice}}</span>
          </div>
          <div class="bottom">
            <div class="btn" v-if="item.order_status==0" @click="pay(item.id,item.allprice)">立即付款</div>
            <!-- <div class="btn" v-if="item.order_status==0">立即评价</div> -->
            <div
              class="btn"
              v-if="item.order_status==1||item.order_status==2||item.order_status==-1"
            >确认收货</div>
          </div>
        </li>
        <!-- <li>
          <div class="type">已发货</div>
          <div class="goods">
            <div class="goods-img">
              <img src="http://placekitten.com/350/200" alt />
            </div>
            <div class="goods-info">
              <div class="one">
                <div class="title">得力便利贴粘性强便签纸无粘性白色牛皮纸便条</div>
                <div class="price-num">
                  <div class="price">￥8.9</div>
                  <div class="num">x1</div>
                </div>
              </div>
              <div class="tag">
                <span>七天无理由退换</span>
              </div>
            </div>
          </div>
          <div class="goods">
            <div class="goods-img">
              <img src="http://placekitten.com/350/200" alt />
            </div>
            <div class="goods-info">
              <div class="one">
                <div class="title">得力便利贴粘性强便签纸无粘性白色牛皮纸便条</div>
                <div class="price-num">
                  <div class="price">￥8.9</div>
                  <div class="num">x1</div>
                </div>
              </div>
              <div class="tag">
                <span>七天无理由退换</span>
              </div>
            </div>
          </div>
          <div class="total">
            共1件商品 合计:
            <span class="total-price">￥9.7</span>
          </div>
          <div class="bottom">
            <div class="btn">立即付款</div>
            <div class="btn">立即评价</div>
            <div class="btn">确认收货</div>
          </div>
        </li>-->
      </ul>
    </div>
    <wux-keyboard id="wux-keyboard" />
  </div>
</template>

<script>
import { get, post, getStorageOpenid } from "../../utils";
import { $wuxKeyBoard } from "../../../static/wux/index.js";
export default {
  onPullDownRefresh() {},
  onReachBottom() {},
  created() {},
  mounted() {
    this.openId = getStorageOpenid();
    this.getMyOrder(3);
  },
  data() {
    return {
      topicList: [],
      page: 1,
      total: "",
      cur: 3,
      openId: "",
      orderArray: [],
      visible: false,
      orderId: "",
      allPrice: ""
    };
  },
  components: {},
  methods: {
    async getMyOrder(status) {
      console.log("status", status);
      let orderStatus = "";
      if (status != 3) {
        orderStatus = status;
      }
      this.cur = status;
      try {
        const res = await get("/order/listAction", {
          order_status: orderStatus,
          openId: this.openId
        });
        this.orderArray = res.list;
        console.log("sdd", res);
      } catch (error) {
        console.log("error", error);
      }
    },
    closePopup() {
      this.visible = false;
    },
    pay(id, allPrice) {
      this.visible = true;
      this.orderId = id;
      this.allPrice = allPrice;
      console.log(id, allPrice);
    },
    // 取消支付
    canclePay() {
      this.visible = false;
      wx.showToast({
        title: "取消支付",
        icon: "none",
        duration: 2000
      });
      // setTimeout(() => {
      //   wx.redirectTo({
      //     url: "/pages/myorder/main"
      //   });
      // }, 500);
    },
    // 立即支付
    openPlain() {
      const fn = async (title, status) => {
        wx.hideLoading();
        wx.showToast({
          title,
          duration: 2000
        });

        if (status) {
          // let order_status ="";
          // if(this.type =='1'){
          //   order_status = "-1"
          // }else {
          //   order_status = "1"
          // }
            const res = await post("/order/editStatus", {
              order_id: this.orderId,
              // pay_status: "1", // 已经支付
              order_status: "1" // 等待发货
            });
            console.log("res", res);

          console.log('res.code',res.code == "1");

          if (res.code == "1") {
            setTimeout(() => {
              this.visible = false;
              this.getMyOrder(3);
            }, 1000);
          } else {
            wx.showToast({
              title: "发生未知错误联系管理员",
              duration: 2000
            });
            wx.redirectTo({
              url: "/pages/feedback/main"
            });
          }
        } else {
          setTimeout(() => {
            wx.redirectTo({
              url: "/pages/myorder/main"
            });
          }, 1000);
        }
      };

      $wuxKeyBoard().show({
        className: "className",
        titleText: "安全键盘",
        cancelText: "取消",
        inputText: "输入数字密码",
        showCancel: true,
        disorder: false,
        maxlength: 6,
        callback(value) {
          console.log(`输入的密码是：${value}`);

          wx.showLoading({
            title: "验证支付密码"
          });

          return new Promise((resolve, reject) => {
            // setTimeout(
            //   () =>
            //     Math.ceil(Math.random() * 10) >= 6
            //       ? resolve(fn("密码正确", true))
            //       : reject(fn("密码错误", false)),
            //   2000
            // );
            setTimeout(() => {
              this.visible = false;
              if (`${value}` == "123456") {
                resolve(fn("密码正确", true));
              } else {
                reject(fn("密码错误", false));
              }
            }, 2000);
          });
        }
      });
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>
