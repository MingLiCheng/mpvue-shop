<template>
  <section class="goods-list-wrapper">
    <div class="query-box">
      <div></div>
      <div>
        <el-button type="primary" @click="addGoodsHandle">添加一个商品</el-button>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="id">
        <template slot-scope="scope">
          <p>
            <el-link type="primary" @click="showGoodsSwiperImages(scope.row)">{{
              scope.row.id
            }}</el-link>
          </p>
        </template>
      </el-table-column>
      <el-table-column label="name">
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column label="goods_brief">
        <template slot-scope="scope">
          <p>{{ scope.row.goods_brief }}</p>
        </template>
      </el-table-column>
      <el-table-column label="category_name">
        <template slot-scope="scope">
          <p>{{ scope.row.category_name }}</p>
        </template>
      </el-table-column>
      <el-table-column label="goods_number">
        <template slot-scope="scope">
          <p>{{ scope.row.goods_number }}</p>
        </template>
      </el-table-column>
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
      <!-- <el-table-column label="primary_pic_url">
        <template slot-scope="scope">
          <p class="banner-image-box">
            <img :src="scope.row.primary_pic_url" alt="" srcset="" />
          </p>
        </template>
      </el-table-column> -->

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleInfoEdit(scope.$index, scope.row)"
            >详情</el-button
          >
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
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
      titel="商品信息"
      v-if="editDialogVisible"
      :visible.sync="editDialogVisible"
    >
      <EditGoodsInfoDialog
        v-if="editDialogVisible"
        :visible.sync="editDialogVisible"
        :baseInfo="selectInfo"
        @refreshList="refreshList"
      ></EditGoodsInfoDialog>
    </el-dialog>

    <el-dialog
      titel="商品轮播信息"
      v-if="imageDialogVisible"
      :visible.sync="imageDialogVisible"
    >
      <EditGoodsImages
        v-if="imageDialogVisible"
        :visible.sync="imageDialogVisible"
        :baseInfo="selectInfo"
        @refreshList="refreshList"
      ></EditGoodsImages>
    </el-dialog>

    <el-dialog
      titel="添加商品信息"
      v-if="addDialogVisible"
      :visible.sync="addDialogVisible"
    >
      <AddGoodsInfoDialog
        v-if="addDialogVisible"
        :visible.sync="addDialogVisible"
        :baseInfo="selectInfo"
        @refreshList="refreshList"
      ></AddGoodsInfoDialog>
    </el-dialog>
  </section>
</template>

<script>
import EditGoodsInfoDialog from "./components/EditGoodsInfoDialog";
import AddGoodsInfoDialog from "./components/AddGoodsInfoDialog";
import EditGoodsImages from "./components/EditGoodsImages";
export default {
  components: { EditGoodsInfoDialog, EditGoodsImages,AddGoodsInfoDialog },
  data() {
    return {
      tableData: [],
      total: 0,
      selectInfo: {},
      editDialogVisible: false,
      imageDialogVisible: false,
      addDialogVisible: false,
      form: {
        page: 1,
        size: 10,
      },
    };
  },
  created() {
    this.getGoodsListInfo(this.form);
  },
  methods: {
    addGoodsHandle(){
      this.addDialogVisible = true
    },
    handleDelete(index, info) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$axios.post(
            "/goodsManagement/delGoodsInfoById",
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
    showGoodsSwiperImages(info) {
      console.log("info", info);
      this.selectInfo = info;
      this.imageDialogVisible = true;
    },
    handleEdit(index, info) {
      this.selectInfo = info;
      this.editDialogVisible = true;
    },
    handleInfoEdit(index,info){
      this.$router.push(`/goods_management/goods_index/goods_info/${info.id}`)
    },
    refreshList() {
      this.getGoodsListInfo(this.form);
    },
    sizeChange(value) {
      this.form.size = value;
      this.getGoodsListInfo(this.form);
    },
    currentChange(value) {
      this.form.page = value;
      this.getGoodsListInfo(this.form);
    },
    async getGoodsListInfo(params) {
      const res = await this.$axios.get("/list/goodsList", { params });
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
.goods-list-wrapper {
  .query-box {
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
