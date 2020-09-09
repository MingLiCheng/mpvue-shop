<template>
  <section class="pt-manage-wrapper">
    <!-- <h1>拼团列表</h1> -->
    <div class="query-box">
      <div></div>
      <div>
        <el-button type="primary" @click="addKjBuy">发起一个砍价</el-button>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="id">
        <template slot-scope="scope">
          <p>{{ scope.row.id }}</p>
        </template>
      </el-table-column>
      <el-table-column label="goods_id">
        <template slot-scope="scope">
          <p>{{ scope.row.goods_id }}</p>
        </template>
      </el-table-column>
      <el-table-column label="name">
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <!--
            <el-table-column label="user_ids">
                <template slot-scope="scope">
                    <p> {{ scope.row.user_ids && scope.row.user_ids.split(',').length }}</p>
                </template>
            </el-table-column> -->
      <el-table-column label="retail_price">
        <template slot-scope="scope">
          <p>{{ scope.row.retail_price }}</p>
        </template>
      </el-table-column>
      <el-table-column label="list_pic_url">
        <template slot-scope="scope">
          <p class="banner-image-box">
            <img :src="scope.row.list_pic_url" alt="" srcset="" />
          </p>
        </template>
      </el-table-column>
      <el-table-column label="end_time">
        <template slot-scope="scope">
          {{ scope.row.end_time | dateFormat }}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex; justify-content: flex-end;">
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog
      title="拼团详情"
      v-if="editDialogTableVisible"
      :visible.sync="editDialogTableVisible"
    >
      <AddKjBuyDialog
        v-if="editDialogTableVisible"
        :visible.sync="editDialogTableVisible"
        :dialogObj="dialogObj"
        :baseInfo="selectBaseInfo"
        @refreshList="refreshList"
      ></AddKjBuyDialog>
    </el-dialog>
  </section>
</template>

<script>
import AddKjBuyDialog from "./components/AddKjBuyDialog.vue";
export default {
  components: { AddKjBuyDialog },
  data() {
    return {
      editDialogTableVisible: false,
      dialogObj: {
        type: "add",
      },
      selectBaseInfo: {},

      tableData: [],
      total: 0,
      form: {
        page: 1,
        size: 10,
      },
    };
  },
  created() {
    this.getReduceBuyInfoList(this.form);
  },
  methods: {
    handleEdit(item){
      console.log('item',item);

      this.selectBaseInfo = {
        id: item.id,
        goods_id: item.goods_id,
        reduce_price: item.reduce_price,
        end_time: item.end_time,
      };
      this.dialogObj = {
        type: "edit",
      };
      this.editDialogTableVisible = true;
    },
    handleDelete(info){
      this.$confirm("此操作将永久删除该选项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$axios.post(
            "/reduceBuy/delReduceBuyGoods",
            { id: info.id }
          );
          if (res.data.code === 0) {
            this.$message.success("删除成功");
            this.refreshList();
          } else {
            this.$message.error("删除失败");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    addKjBuy() {
      this.selectBaseInfo = {
        goods_id: "",
        reducebuy_name: "",
        reduce_price: "",
        end_time: "",
      };
      this.dialogObj = {
        type: "add",
      };
      this.editDialogTableVisible = true;
    },
    refreshList(){
        this.getReduceBuyInfoList(this.form);
    },
    sizeChange(value) {
      this.form.size = value;
      this.getReduceBuyInfoList(this.form);
    },
    currentChange(value) {
      this.form.page = value;
      this.getReduceBuyInfoList(this.form);
    },
    async getReduceBuyInfoList(params) {
      const res = await this.$axios.get("/reduceBuy/reduceBuyInfoList", {
        params,
      });
      console.log("res", res);
      if (res.data.list) {
        this.tableData = res.data.list;
        this.total = res.data.total;
      } else {
        this.tableData = [];
        this.total = 0;
      }
    },
  },
};
</script>

<style lang="less">
.pt-manage-wrapper {
        .query-box{
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 20px;
    }
  .banner-image-box {
    // width: 100px;
    height: 60px;
    display: flex;
    justify-content: center;
    img {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
