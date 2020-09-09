<template>
  <div class="order">
    <wux-popup position="bottom" :visible="visible" @close="closePopup">
      <div class="pay-wrap">
        <div class="opeartion-wrap">
          <span @click="canclePay">取消</span>
          <span class="title">确认支付</span>
        </div>
        <div class="money-wrap">
          <div class="title">payment</div>
          <div class="money">￥{{ allprice }}</div>
        </div>
        <div class="payee-wrap">
          <span>收款方</span>
          <span>美洁生鲜</span>
        </div>
        <div class="save-wrap">
          <div class="save-btn" @click="openPlain">立即支付</div>
        </div>
      </div>
    </wux-popup>
    <div @click="toAddressList" v-if="addressId" class="address">
      <div class="item">
        <div class="list">
          <div class="addresslist">
            <div>
              <span>{{ address.name }}</span>
              <div v-if="address.is_default" class="moren">默认</div>
            </div>
            <div class="info">
              <p>{{ address.mobile }}</p>
              <p>{{ address.address + address.address_detail }}</p>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    <div @click="toAddressList" v-else class="seladdress">请选择收货地址</div>
    <div class="orderbox">
      <div class="item">
        <div>商品合计</div>
        <div>￥{{ allprice }}</div>
      </div>
      <div class="item">
        <div>运费</div>
        <div>免运费</div>
      </div>
      <div class="item">
        <div>优惠券</div>
        <div>暂无</div>
      </div>
    </div>
    <div class="cartlist">
      <div class="item" v-for="(item, index) in listData" :key="index">
        <div class="con">
          <div class="left">
            <div class="img">
              <img :src="item.list_pic_url" alt />
            </div>
            <div class="info">
              <p>{{ item.goods_name }}</p>
              <p>￥{{ item.retail_price }}</p>
            </div>
          </div>
          <div class="right">
            <div class="num">x{{ item.number || 1 }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div>实付 : ￥{{ allprice }}</div>
      <div @click="pay">支付</div>
    </div>
    <wux-keyboard id="wux-keyboard" />
  </div>
</template>

<script>
import { get, post, login, getStorageOpenid } from "../../utils";
import { $wuxKeyBoard } from "../../../static/wux/index.js";
export default {
  onShow() {
    if (wx.getStorageSync("addressId")) {
      this.addressId = wx.getStorageSync("addressId");
      this.getAddressInfo(this.addressId);
    }
    this.openId = getStorageOpenid();
  },
  created() {},
  mounted() {
    this.type = this.$root.$mp.query.type;
    this.goodsId = this.$root.$mp.query.goodsId;
    this.goodsNum = this.$root.$mp.query.goodsNum;
    this.goodsPrice = this.$root.$mp.query.goodsPrice;
    this.ptId = this.$root.$mp.query.ptId;
    if (this.type == "1" || this.type == "2") {
      this.goodsDetail();
    } else {
      this.getDetail();
    }
  },
  data() {
    return {
      addressId: "",
      openId: "",
      allprice: "",
      listData: [],
      address: {},
      visible: false,
      type: "", //订单类型  1：拼团
      goodsId: "",
      goodsNum: "",
      goodsPrice: "", //拼团价,
      ptId: "",
      isFinish: false,
      orderId: "",
    };
  },
  components: {},
  methods: {
    async getAddressInfo(id) {
      const addressInfo = await get("/address/detailAction", { id });
      this.address = addressInfo.data;
    },
    async goodsDetail() {
      this.allprice = this.goodsNum * this.goodsPrice;
      let goodsInfo = await get("/goods/detailaction", {
        id: this.goodsId,
        openId: this.openId,
        isSo: 0,
      });
      console.log("goodsInfo", goodsInfo);
      goodsInfo.info.number = this.goodsNum;
      this.listData = [goodsInfo.info];
    },
    closePopup() {
      this.visible = false;
    },
    async pay() {
      // this.visible = true;
      let goodsIds = "";
      let type = "";
      let listDataArray = this.listData;
      let params = {};
      if (this.type == "1") {
        // 拼团
        goodsIds = this.goodsId;
        type = "1";
        const data = await post("/groupBuy/joinPt", {
          ptId: this.ptId,
          openId: this.openId,
        });
        console.log('data',data);
        this.isFinish = true

        if (data.code != -1) {
          wx.showToast({
            title: "参与成功！",
            icon: "success",
            duration: 2000,
          });
          params = {
            goodsIds:this.goodsId,
            order_type: type,
            openId: this.openId,
            addressId: this.addressId,
            allPrice: this.allprice,
            ptId: this.ptId,
          };
          console.log('团-------------params',params)
          this.createOrder(params);
        }else{
          wx.showToast({
            title: "该拼团已结束",
            duration: 2000,
          });
          setTimeout(() => {
            wx.switchTab({
                url: "/pages/index/main",
              });
          }, 2600);
        }
      } else {
        type = "0";
        goodsIds = listDataArray.map((item) => item.id).join(",");
        params = {
          goodsIds,
          order_type: type,
          openId: this.openId,
          addressId: this.addressId,
          allPrice: this.allprice,
        };
        this.createOrder(params);
      }
    },
    // 取消支付
    canclePay() {
      this.visible = false;
      wx.showToast({
        title: "取消支付",
        icon: "none",
        duration: 2000,
      });
    },
    // 立即支付
    openPlain() {
      const fn = async (title, status) => {
        wx.hideLoading();
        wx.showToast({
          title,
          duration: 2000,
        });
        if (status) {
          let order_status = "";
          if (this.type == "1") {
            order_status = "4";
          } else {
            order_status = "1";
          }
          console.log("this.orderId", this.orderId);

          const res = await post("/order/editStatus", {
            order_id: this.orderId,
            pay_status: "1", // 已经支付
            order_status: order_status, // 等待发货
          });
          console.log("res", res);
          if (res.code == "1") {
            setTimeout(() => {
              wx.redirectTo({
                url: "/pages/myorder/main",
              });
            }, 600);
          } else {
            wx.showToast({
              title: "发生未知错误联系管理员",
              duration: 2000,
            });
            wx.redirectTo({
              url: "/pages/feedback/main",
            });
          }
        } else {
          setTimeout(() => {
            wx.redirectTo({
              url: "/pages/myorder/main",
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
            title: "验证支付密码",
          });

          return new Promise((resolve, reject) => {
            setTimeout(() => {
              this.visible = false;
              if (`${value}` == "123456") {
                resolve(fn("密码正确", true));
              } else {
                reject(fn("密码错误", false));
              }
            }, 2000);
          });
        },
      });
    },
    // 生成订单
    async createOrder(params) {
      console.log('createOrder------------params', params);
      // 临时解决方案，传送 openid把购物车的商品全部提交，暂时不支持勾选商品
      wx.showLoading();
      const res = await post("/order/addOrder", params);
      console.log("生成订单", res);
      if (res.code != "1") {
        wx.hideLoading();
        wx.showToast({
          title: "失败，发生未知错误",
          icon: "none",
          duration: 2000,
        });
      } else {
        // 成功
        this.orderId = res.res[0];
        wx.hideLoading();
        this.toPay();
        console.log("shengcheng生成订单成功", res.res[0]);
      }
    },
    toPay() {
      this.visible = true;
      console.log("this.visible", this.visible);
    },
    toAddressList() {
      console.log("xxxxxxxxxxxxxxxxxxxx 选择收获地址");

      wx.navigateTo({
        url: "/pages/addressSelect/main",
      });
    },
    toselectAddress() {
      wx.navigateTo({
        url: "/pages/addaddress/main",
      });
    },
    async getDetail() {
      const data = await get("/order/detailAction", {
        openId: this.openId,
        addressId: this.addressId,
      });
      console.log(data);

      if (data) {
        this.allprice = data.allPrise;
        this.listData = data.goodsList;
        this.address = data.address;
        console.log("sdd", this.listData);
      }
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "./style";
</style>
