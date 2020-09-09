<template>
  <div class="index">
    <div class="search">
      <div @click="toMappage">{{ cityName }}</div>
      <div @click="toSearch">
        <input class="search-input" type="text" placeholder="搜索商品" />
        <span class="icon"></span>
      </div>
    </div>
    <div class="swiper">
      <swiper
        class="swiper-container"
        indicator-dots="true"
        autoplay="true"
        interval="3000"
        circular="true"
        duration="500"
      >
        <block v-for="(item, index) in banner" :key="index">
          <swiper-item class="swiper-item">
            <image :src="item.image_url" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="channel">
      <div
        @click="categoryList(item.id)"
        v-for="(item, index) in channel"
        :key="index"
      >
        <img :src="item.icon_url" alt />
        <p>{{ item.name }}</p>
      </div>
    </div>
    <div class="newgoods">
      <div class="newgoods-top">
        <div class="top">
          <p>特价商品</p>
          <p>查看全部</p>
        </div>
      </div>
      <div class="list">
        <ul>
          <scroll-view class="scroll-view" :scroll-x="true">
            <li
              @click="goodsDetail(item.goods_id,1)"
              v-for="(item, index) in specialOfferGoodsList"
              :key="index"
            >
              <img :src="item.list_pic_url" alt />
              <p>{{ item.name }}</p>
              <p>{{ item.goods_brief }}</p>
              <p><span>￥{{ item.special_offer_price}} <span style="text-decoration: line-through; color:#cecece"> ￥{{ item.retail_price }}</span> </span></p>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <div class="brand">
      <div @click="tobrandList" class="head">团购专区</div>
      <div class="content">
        <ul>
          <li v-for="(item, index) in fight" :key="index">
            <div class="top fruit-vegetable">
              <div class="title">{{ item.name }}</div>
              <div class="tag">
                <span>#优质选材</span>
                <span>#正品保证</span>
              </div>
            </div>
            <div class="bottom">
              <div class="title">
                <span class="tag">万人团</span>
                <span class="text">{{ item.name }}</span>
              </div>
              <!-- <div class="tips">共十款商品正在疯抢</div> -->
              <div class="avatar-time">
                <div class="avatar-total">
                  <img
                    v-for="(avatar, list) in item.userInfos"
                    :key="list"
                    :src="avatar.avatarUrl"
                    alt
                  />
                  <!-- <img src="http://weapp.cdbook.xyz/images/2.png" alt />
                  <img src="http://weapp.cdbook.xyz/images/3.png" alt />-->
                  <span class="total"
                    >等{{ item.userInfos.length }}人参与拼团</span
                  >
                </div>
                <!-- <div class="time">09:16:44 后结束</div> -->
              </div>
              <div class="fight">
                <span class="go-fight" @click="toFight(item.id)">去拼单</span>
              </div>
            </div>
          </li>
        </ul>

        <!-- <div @click="branddetail(item.id)" v-for="(item, index) in brandList" :key="index">
          <div>
            <p>{{}}</p>
            <p>{{}}</p>
          </div>
          <img :src="item.new_pic_url" alt="">
        </div>-->
      </div>
    </div>

    <div class="bargin">
      <div class="head">砍价专区</div>
      <div class="content">
        <ul>
          <li v-for="(item, index) in ReduceBuyList" :key="index">
            <div class="left">
              <img :src="item.list_pic_url" alt />
              <div class="lite-footer-sign" v-if="item.isJoined">
                <div class="ribbon-green">砍价中</div>
              </div>
              <div class="lite-footer-sign" v-if="item.isJoined && item.resultSatus == 2">
                <div class="ribbon-green">已完成</div>
              </div>
            </div>
            <div class="right">
              <div class="top">
                <div class="title">[只亏一次，亏完涨价]{{ item.name }}</div>
                <div class="num">2565人已0元拿</div>
              </div>
              <div class="bottom">
                <div class="price">
                  <del class="old-price">价值{{item.retail_price}}</del>
                  <div class="now-price">特惠价{{ item.reduce_price }}元</div>
                </div>
                <div class="btn" v-if="item.isJoined && item.resultSatus != 2" @click="toBarginInfo(item)">查看详情</div>
                <div class="btn" v-if="!item.isJoined && item.resultSatus != 2" @click="toBargin(item)">砍价{{item.reduce_price}}元得</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- <div class="brand">
      <div @click="tobrandList" class="head">
        品牌制造商直供
      </div>
      <div class="content">
        <div @click="branddetail(item.id)" v-for="(item, index) in brandList" :key="index">
          <div>
            <p>{{item.name}}</p>
            <p>{{item.floor_price}}元起</p>
          </div>
          <img :src="item.new_pic_url" alt="">
        </div>
      </div>
    </div>-->
    <div class="newgoods">
      <div @click="goodsList('new')" class="newgoods-top">
        <div class="top">
          <p>新品首发</p>
          <p>查看全部</p>
        </div>
      </div>
      <div class="list">
        <ul>
          <scroll-view class="scroll-view" :scroll-x="true">
            <li
              @click="goodsDetail(item.id)"
              v-for="(item, index) in newGoods"
              :key="index"
            >
              <img :src="item.list_pic_url" alt />
              <p>{{ item.name }}</p>
              <p>{{ item.goods_brief }}</p>
              <p>￥{{ item.retail_price }}</p>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <div class="newgoods hotgoods">
      <div @click="goodsList('hot')" class="newgoods-top">
        <div class="top">
          <p>
            人气推荐
            <span></span> 好物精选
          </p>
          <p>查看全部</p>
        </div>
      </div>
      <div class="list">
        <ul>
          <scroll-view class="scroll-view" :scroll-x="true">
            <li
              @click="goodsDetail(item.id)"
              v-for="(item, index) in hotGoods"
              :key="index"
            >
              <img :src="item.list_pic_url" alt />
              <p>{{ item.name }}</p>
              <p>{{ item.goods_brief }}</p>
              <p>￥{{ item.retail_price }}</p>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <div class="topicList">
      <div @click="totopic" class="topicList-top">
        专题精选
        <span class="icon"></span>
      </div>
      <div class="list">
        <ul>
          <scroll-view class="scroll-view" :scroll-x="true">
            <li
              @click="topicdetail(item.id)"
              v-for="(item, index) in topicList"
              :key="index"
            >
              <img :src="item.item_pic_url" alt />
              <div class="btom">
                <div>
                  <p>{{ item.title }}</p>
                  <p>{{ item.subtitle }}</p>
                </div>
                <div>{{ item.price_info }}元起</div>
              </div>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <div class="newcategory">
      <div class="list" v-for="(item, index) in newCategoryList" :key="index">
        <div class="head">{{ item.name }}好物</div>
        <div class="sublist">
          <div
            @click="goodsDetail(subitem.id)"
            v-for="(subitem, subindex) in item.goodsList"
            :key="subindex"
          >
            <img :src="subitem.list_pic_url" alt />
            <p>{{ subitem.name }}</p>
            <p>￥{{ subitem.retail_price }}</p>
          </div>
          <div @click="categoryList(item.id)">
            <div class="last">
              <p>{{ item.name }}好物</p>
              <span class="icon"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get,post,toLogin,login } from "../../utils";
import { mapState, mapMutations } from "vuex";
export default {
  onShow() {
    // 获取当前用户已参加的砍价的信息
    this.getKjInfoList()
    this.getFightList();
    this.getData();
    this.getSpecialOfferGoodsList()
  },
  computed: {
    ...mapState(["cityName"]),
  },
  onPullDownRefresh: function() {
    this.getKjInfoList()
    this.getFightList();
    this.getCityName();
    this.getData();
    this.getSpecialOfferGoodsList()
  },
  mounted() {
    this.getCityName();
    this.getData();
  },
  data() {
    return {
      banner: [],
      channel: [],
      brandList: [],
      newGoods: [],
      hotGoods: [],
      topicList: [],
      newCategoryList: [],
      fight: [],
      bargin: [],
      ReduceBuyList:[],
      specialOfferGoodsList:[]

    };
  },
  components: {},
  methods: {
    ...mapMutations(["update"]),
    async getKjInfoList(){
      const data = await get("/reduceBuy/reduceBuyInfoList");
      const res = await get('/reduceBuy/getReduceBuyListByOpenId',{
          openId:wx.getStorageSync("openId")
        })
        let list = data.list.map(item => {
          item.isJoined = false
          res.list.map(xItem => {
            if(item.goods_id == xItem.goods_id){
              item.isJoined = true
              item.reduceId = xItem.id,
              item.resultSatus = xItem.result_status||-1
            }
          })
          return item
        })
        console.log('listxxxxxxxxx',list);


        this.ReduceBuyList = list
    },
    async getBargin() {
      let data = await get("/reduceBuy/reduceBuyInfoList");
      console.log("砍价", data);
      this.bargin = data.list;
    },
    async getSpecialOfferGoodsList() {
      let data = await get("/specialOffer/specialOfferGoodsList");
      console.log("特价商品", data);
      this.specialOfferGoodsList = data.list;
    },
    async getReduceBuyListByOpenId(){
      console.log('请求砍价列表');
      if(login){

        console.log('ReduceBuyListres',res);

        if(res.code){
          this.ReduceBuyList = res.list
        }
      }
    },
    toMappage() {
      var _this = this;
      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
      wx.getSetting({
        success(res) {
          //如果没有同意授权,打开设置
          if (!res.authSetting["scope.userLocation"]) {
            wx.openSetting({
              success: (res) => {
                _this.getCityName();
              },
            });
          } else {
            wx.navigateTo({
              url: "/pages/mappage/main",
            });
          }
        },
      });
    },
    getCityName() {
      var _this = this;
      var myAmapFun = new amapFile.AMapWX({
        key: "e545e7f79a643f23aef187add14e4548",
      });
      myAmapFun.getRegeo({
        success: function (data) {
          //成功回调
          console.log(data);
          // data[0].regeocodeData.formatted_address
          // _this.cityName = data[0].regeocodeData.formatted_address;
          _this.update({ cityName: data[0].regeocodeData.formatted_address });
        },
        fail: function (info) {
          //失败回调
          console.log(info);
          //如果用户拒绝授权
          // 默认为北京
          _this.cityName = "北京市";
          _this.update({ cityName: "北京市" });
        },
      });
    },
    toSearch() {
      wx.navigateTo({
        url: "/pages/search/main",
      });
    },
    async getData() {
      const data = await get("/index/index");
      this.banner = data.banner;
      this.channel = data.channel;
      this.brandList = data.brandList;
      this.newGoods = data.newGoods;
      this.hotGoods = data.hotGoods;
      this.topicList = data.topicList;
      this.newCategoryList = data.newCategoryList;
    },
    async getFightList() {
      let data = await get("/groupBuy/ptInfoList");
      this.fight = data.list;
      console.log("拼团", data);
    },

    goodsDetail(id,isSo=0) {
      wx.navigateTo({
        url: "/pages/goods/main?id=" + id+'&isSo='+isSo,
      });
    },
    categoryList(id) {
      wx.navigateTo({
        url: "/pages/categorylist/main?id=" + id,
      });
    },
    goodsList(info) {
      if (info == "hot") {
        wx.navigateTo({
          url: "/pages/newgoods/main?isHot=" + 1,
        });
      } else {
        wx.navigateTo({
          url: "/pages/newgoods/main?isNew=" + 1,
        });
      }
    },
    topicdetail(id) {
      wx.navigateTo({
        url: "/pages/topicdetail/main?id=" + id,
      });
    },
    totopic() {
      wx.navigateTo({
        url: "/pages/topic/main",
      });
    },
    tobrandList() {
      wx.navigateTo({
        url: "/pages/brandlist/main",
      });
    },
    branddetail(id) {
      wx.navigateTo({
        url: "/pages/branddetail/main?id=" + id,
      });
    },
    toFight(goodsId) {
      console.log("tofight");
      wx.navigateTo({
        url: "/pages/fight/main?id=" + goodsId,
      });
    },
    toBargin(item) {
      // 先判断是否参加该拼团信息
      console.log('item',item);
      let goods_id = item.goods_id
      let openId = "",_this = this;
      toLogin && (openId = wx.getStorageSync("openId"));


      wx.showModal({
        title: "提示",
        content: "是否确认参加此砍价活动？",
        async success(res) {
          if (res.confirm) {
            console.log("用户点击确定");
            console.log("toBargin");
            const res = await post('/reduceBuy/joinReduceBuy',{goods_id,openId})
            console.log('res',res);
            if(res.code == 1){
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
              })
              setTimeout(() => {
                wx.navigateTo({
                  url: "/pages/bargain/main?id=" + res.message,
                });
              },2002)
            }else{
              wx.showToast({
                title: res.message,
                icon: 'none',
                duration: 2000
              })
            }


            // wx.navigateTo({
            //   url: "/pages/bargain/main?id=" + item.id,
            // });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
    toBarginInfo(item){
      if(!item.reduceId){
        wx.showToast({
                title: '发生未知错误',
                icon: 'none',
                duration: 2000
              })
              return false
      }
      wx.navigateTo({
                  url: "/pages/bargain/main?id=" + item.reduceId,
                });
    },
    async joinReduceBuy (params){ // goods_id, openId
      const res = await post('/reduceBuy/joinReduceBuy',params)
      console.log('res',res);

      if(res.data.code == 1){

      }
    }
  },
  created() {},
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
