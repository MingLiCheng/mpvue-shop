<!--
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-04-08 15:47:03
 -->
<!--
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-04-08 20:57:58
 -->
<template>
  <section>
    <div class="table_container">
      <el-table
        v-loading="loading"
        :data="orderlist"
        max-height="700"
        border
        :default-sort="{prop: 'date', order: 'descending'}"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
        <el-table-column prop="id" label="订单编号" align="center" width="330"></el-table-column>
        <el-table-column prop="order_state" label="订单状态" align="center" width="160">
          <template slot-scope="scope">
            <span v-if="scope.row.order_status == 0" style="color: black;">待付款</span>
            <span v-if="scope.row.order_status == 1" style="color: red;">待发货</span>
            <span v-if="scope.row.order_status == 2" style="color: blue;">待收货</span>
            <span v-if="scope.row.order_status == 3" style="color: green;">已完成</span>
            <span v-if="scope.row.order_status == -1" style="color: hotpink;">订单取消</span>
          </template>
        </el-table-column>
        <el-table-column prop="pay_status" label="支付状态" align="center" width="160">
          <template slot-scope="scope">
            <span v-if="scope.row.pay_status == '0'" style="color: black;">未支付</span>
            <span v-if="scope.row.pay_status == '1'" style="color: green;">已支付</span>
            <span v-if="scope.row.pay_status == '-1'" style="color: hotpink;">退款</span>
          </template>
        </el-table-column>
        <el-table-column prop="allprice" label="订单金额" align="center" width="160">
          <template slot-scope="scope">
            <span>{{ parseFloat(scope.row.allprice)  | priceFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="open_id" label="用户" align="center" width="320">
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
  </section>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: '-1',
          label: '全部'
        },{
        value: '0',
        label: '未支付'
      }, {
        value: '1',
        label: '待发货'
      }, {
        value: '2',
        label: '待收货'
      }, {
        value: '3',
        label: '已完成'
      }],
      value: '-1',
      orderlist: [],
      loading: false,
      keyword: '',
      dialog: {
        show: false,
        operation: ''
      },
      form: {},
      goodsList: [],
      dataList: [],
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 100, // 总数
        page_size: 5, // 1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    openFahuo (order_id) {
      this.$prompt('请输入快递单号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
        inputPattern: /\d{10}/,
        inputErrorMessage: '请输入10位数字'
      }).then(({ value }) => {
        this.loading = true
        setTimeout(async () => {
          // 改变状态
          const res = await this.$axios.post('/order/editStatus', {
            order_status: '2', //已发货
            order_id
          })
          if (res.data.code == '1') {
            this.$message.success('发货成功')
          } else {
            this.$message.error('失败，未知错误')
          }
          this.loading = false
          this.getOrderList()
        }, 1000);
      }).catch(() => {
        console.log('this', this);
        this.$message.info('取消输入')
      });
    },
    toUserInfo(id){
      this.$router.push(`/user/userinfo/${id}`)
    },
    handleCurrentChange(page) {

    },
    handleSizeChange(page_size) {
      this.paginations.page_size = page_size;

    },
    getOrderList () {
      this.$axios.get('/list/orderList').then(res => {
        this.orderlist = res.data.list
        console.log('res', res)
      })
    },
    onDeleteUser(row,index){
      this.$message.error('暂不支持')
    }
  },

}
</script>

<style lang="less">
.order-list-wrapper{

}
</style>
