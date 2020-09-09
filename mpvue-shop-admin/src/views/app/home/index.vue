<template>
  <div class="page">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="card see-data">
          <p class="title">
            <!-- <i class="fa fa-th-large fa-lg"></i>浏览量 -->
          </p>
          <div class="see-data-list">
            <div class="list-item">
              <p class="see-history">9999+</p>
              <h3>总浏览量</h3>
            </div>
            <div class="list-item">
              <p class="see-history">+10</p>
              <h3>今日浏览量</h3>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card dbsx">
          <p class="title">
            <i class="fa fa-file-text-o"></i>信息一览
          </p>
          <ul>
            <li>
              <router-link to="#">
                <span class="num">{{commentsNum}}</span>

                <span>专题总量</span>
              </router-link>
            </li>
            <li>
              <router-link to="#">
                <span class="num">{{goodsNum}}</span>

                <span>商品总量</span>
              </router-link>
            </li>
          </ul>
          <ul>
            <li>
              <router-link to="#">
                <span class="num">{{successOrder}}</span>

                <span>成交量</span>
              </router-link>
            </li>
            <li>
              <router-link to="#">
                <span class="num">{{helpNum}}</span>

                <span>建议与反馈</span>
              </router-link>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card bbxx" style="height:296px">
          <p class="title">
            <i class="fa fa-server"></i>版本信息
          </p>
          <div class="table">
            <p>
              <span class="tit">当前版本</span>v1.0.0
            </p>
            <p>
              <span class="tit">基于框架</span>vue3.0全家桶 + element-ui
            </p>
            <p>
              <span class="tit">主要特色</span>单页面 / 响应式 / 无限级菜单 / 后台管理 / 极简
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="card">
          <pie-echarts class="echart_tem" ref="echarts"></pie-echarts>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card">
          <bar-echarts class="echart_tem"></bar-echarts>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card">
          <line-echarts class="echart_tem"></line-echarts>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="table_container" id="weifahuo">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="id" label="订单编号" align="center" width="330"></el-table-column>
            <el-table-column prop="order_state" label="订单状态" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.order_status == 0" style="color: black;">待付款</span>
                <span v-if="scope.row.order_status == 1" style="color: red;">待发货</span>
                <span v-if="scope.row.order_status == 2" style="color: blue;">待收货</span>
                <span v-if="scope.row.order_status == 3" style="color: green;">已完成</span>
                <span v-if="scope.row.order_status == -1" style="color: hotpink;">订单取消</span>
              </template>
            </el-table-column>
            <el-table-column prop="pay_status" label="支付状态" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.pay_status == '0'" style="color: black;">未支付</span>
                <span v-if="scope.row.pay_status == '1'" style="color: green;">已支付</span>
                <span v-if="scope.row.pay_status == '-1'" style="color: hotpink;">退款</span>
              </template>
            </el-table-column>
            <el-table-column prop="allprice" label="订单金额" align="center">
              <template slot-scope="scope">
                <span>{{ parseFloat(scope.row.allprice) | priceFormat }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="open_id" label="用户" align="center">
              <template slot-scope="scope">
                <span>
                  <a style="color: #4db3ff">{{ scope.row.open_id }}</a>
                </span>
              </template>
            </el-table-column>

            <el-table-column prop="operation" align="center" label="操作" fixed="right" width="280">
              <template slot-scope="scope">
                <el-button
                  :disabled="scope.row.order_status != 1"
                  type="primary"
                  icon="edit"
                  size="small"
                  @click="openFahuo(scope.row.id)"
                >发货</el-button>
                <!-- v-if="scope.row.order_status == 0" -->
                <el-button
                  :disabled="scope.row.order_status != 0"
                  type="danger"
                  icon="edit"
                  size="small"
                >取消订单</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div class="help_table">
        <el-table :data="helpData" border style="width: 100%">
          <el-table-column type="index" align="center" label="序号" width="180"></el-table-column>
          <el-table-column prop="user_id" label="用户" width="280"></el-table-column>
          <el-table-column prop="msg_content" label="反馈内容" width="580"></el-table-column>

          <el-table-column label="反馈时间">
            <template slot-scope="scope">{{ parseFloat(scope.row.msg_time)  | dateFormat}}</template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import { Message } from "element-ui";
import pieEcharts from "@/components/public/pieEcharts";
import barEcharts from "@/components/public/barEcharts";
import lineEcharts from "@/components/public/lineEcharts";
export default {
  data() {
    return {
      tableData: [],
      commentsNum: 16,
      goodsNum: 13,
      successOrder: 55,
      helpNum: 0,
      helpData: []
    };
  },
  components: {
    pieEcharts,
    barEcharts,
    lineEcharts
  },
  mounted() {
    this.getOrderListByTradeStatus();
    // this.getCommentNum();
    // this.getGoodsNum();
    // this.getHelpNum();
    this.getFeedBackList();
  },
  methods: {
    cancel() {
      return false;
    },
    // 获取订单
    async getOrderListByTradeStatus() {
      this.$axios.get("/list/orderList").then(res => {
        this.tableData = res.data.list;
        console.log("res", res);
      });
      // console.log("订单", orders);
      // this.tableData = orders.data.data.list;
      // this.successOrder = orders.data.data.list.length;
    },
    async getFeedBackList() {
      this.$axios.get("/feedback/feedbackInfoList").then(res => {
        this.helpData = res.data.list;
        this.helpNum =res.data.list.length
        console.log("res", res);
      });
    },
    cancelOrder(order_id) {
      var that = this;
      this.$confirm("确定取消订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const res = that.$axios.post("/order/editStatus", {
            trade_status: "-1", // 取消
            pay_status: "-1", // 取消
            order_id
          });
          // if (res.data.data.message == "SUCCESS") {
          //   Message.success("发货成功");
          // } else {
          //   Message.error("失败，未知错误");
          // }

          that.$message({
            type: "success",
            message: "取消订单成功!"
          });
          that.getOrderListByTradeStatus();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });

      console.log("取消订单", order_id);
    },
    openFahuo(order_id) {
      this.$prompt("请输入运单号", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\d{10}/,
        inputErrorMessage: "请输入10位数字"
      })
        .then(({ value }) => {
          this.loading = true;
          setTimeout(async () => {
            // 改变状态
            const res = await this.$axios.post("/order/editStatus", {
              order_status: "2", //已发货
              order_id
            });
            if (res.data.code == "1") {
              this.$message.success("发货成功");
            } else {
              this.$message.error("失败，未知错误");
            }
            this.loading = false;
            this.getOrderListByTradeStatus();
          }, 1000);
        })
        .catch(() => {
          console.log("this", this);
          Message.info("取消输入");
        });
    },
    // 获取评论总量
    async getCommentNum() {
      this.axios.get("/api/comment/list").then(res => {
        // if (res.data.data.message == "SUCCESS") {
        //   this.$router.push("/index");
        // }
        this.commentsNum = res.data.data.list.length;
      });
    },
    // 获取商品数量
    async getGoodsNum() {
      this.axios.get("/api/selectgoods").then(res => {
        // if (res.data.data.message == "SUCCESS") {
        //   this.$router.push("/index");
        // }
        this.goodsNum = res.data.data.list.length;
      });
    },
    // 获取建议数量
    async getHelpNum() {
      this.axios.get("/api/help/list").then(res => {
        // console.log('建议',res);
        this.helpData = res.data.data.list;
        this.helpNum = res.data.data.list.length;
      });
    }
  }
};
</script>

<style lang="scss">
$top: top;
$bottom: bottom;
$left: left;
$right: right;
$leftright: ($left, $right);
$pinkk: #eec2d3;
$bluee: #409eff;
$yelloww: #f4d884;
$grennn: #89dda0;
$purplee: #78a2ea;
$lightBluee: #b8d6ff;

$list: bluee pinkk yelloww grennn purplee lightBluee;
$list1: $bluee $pinkk $yelloww $grennn $purplee $lightBluee;
%shadow {
  background: #fff;
  -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
  border-color: rgba(0, 0, 0, 0.2);
  .title {
    font-size: 14px;
    padding: 10px;
    width: 100%;
    i {
      margin-right: 5px;
    }
  }
}

@mixin flex($direction: row, $content: space-between) {
  display: flex;
  flex-direction: $direction;
  justify-content: $content;
}
.see-data {
  height: 296px;
  margin-bottom: 20px;
  .see-data-list {
    margin-top: 40px;
    display: flex;
    justify-content: space-around;
    .list-item {
      text-align: center;
    }
    h3 {
      font-size: 14px;
      font-weight: normal;
    }
  }
}
.card {
  color: #666;
  @extend %shadow;

  ul {
    @include flex;
    padding: 0px;
    li {
      flex: 1;
      list-style: none;

      a {
        color: #666666;
        align-items: center;
        padding-top: 20px;
        padding-bottom: 20px;
        text-decoration: none;
        @include flex(column);
        span {
          height: 44px;
        }
        .num {
          line-height: 44px;
          font-size: 42px;
          color: $bluee;
          margin: 0px;
        }
      }
      .kjfs-bluee {
        color: $bluee;
      }
      .kjfs-pinkk {
        color: $pinkk;
      }
      .kjfs-yelloww {
        color: $yelloww;
      }
      .kjfs-grennn {
        color: $grennn;
      }
      .kjfs-purplee {
        color: $purplee;
      }
      .kjfs-lightBluee {
        color: $lightBluee;
      }
      &:hover {
        .kjfs-bluee {
          color: #ffffff;
          background: $bluee;
        }
        .kjfs-pinkk {
          color: #ffffff;
          background: $pinkk;
        }
        .kjfs-yelloww {
          color: #ffffff;
          background: $yelloww;
        }
        .kjfs-grennn {
          color: #ffffff;
          background: $grennn;
        }
        .kjfs-purplee {
          color: #ffffff;
          background: $purplee;
        }
        .kjfs-lightBluee {
          color: #ffffff;
          background: $lightBluee;
        }
      }
    }
  }
  .table {
    padding: 21px;
    p {
      height: 52px;
      line-height: 52px;
      border: 1px solid #cccccc;
      overflow: hidden;
      border-top: none;
      @include flex(null, flex-start);
      margin: 0px;
      &:first-child {
        border-top: 1px solid #cccccc;
      }
      .tit {
        width: 90px;
        min-width: 90px;
        height: 100%;
        text-align: center;
        border-right: 1px solid #cccccc;
        margin-right: 18px;
      }
      span.gitbox {
        flex: 1;
        height: 100%;
        overflow: hidden;
        @include flex(row, flex-start);
        a {
          &:first-child {
            margin-right: 30px;
          }
        }
      }
    }
  }
}
.see-history {
  color: #409eff;
  //   font-weight: bold;
  margin-bottom: 10px;
  font-size: 42px;
}
.kjfs {
  height: 328px !important;
}
.echart_tem {
  height: 300px;
}
.table_container {
  margin-top: 20px;
}
.help_table {
  margin-top: 20px;
}
</style>
