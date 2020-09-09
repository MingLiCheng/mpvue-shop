<template>
  <section class="goods-type-wrapper">
    <!-- <h1>商品类型</h1> -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="id">
        <template slot-scope="scope">
          <p>
            <el-link type="primary" @click="openChilderDialog(scope.row.id)">{{
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
      <el-table-column label="front_desc">
        <template slot-scope="scope">
          <p>{{ scope.row.front_desc }}</p>
        </template>
      </el-table-column>
      <el-table-column label="icon_url">
        <template slot-scope="scope">
          <p class="banner-image-box">
            <img :src="scope.row.icon_url" alt="" srcset="" />
          </p>
        </template>
      </el-table-column>
      <el-table-column label="banner_url">
        <template slot-scope="scope">
          <p class="banner-image-box">
            <img :src="scope.row.banner_url" alt="" srcset="" />
          </p>
        </template>
      </el-table-column>

      <!-- <el-table-column label="img_url">
        <template slot-scope="scope">
          <p class="banner-image-box">
            <img :src="scope.row.img_url" alt="" srcset="" />
          </p>
        </template>
      </el-table-column> -->
      <el-table-column label="wap_banner_url">
        <template slot-scope="scope">
          <p class="banner-image-box">
            <img :src="scope.row.wap_banner_url" alt="" srcset="" />
          </p>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
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

    <el-dialog title="子类型" :visible.sync="dialogTableVisible">
      <div style="width: 100%;max-height: 500px;overflow-y:auto;">
        <el-table :data="childrenTable" border style="width: 100%">
          <el-table-column label="id">
            <template slot-scope="scope">
              <p>
                {{ scope.row.id }}
              </p>
            </template>
          </el-table-column>
          <el-table-column label="name">
            <template slot-scope="scope">
              <p>{{ scope.row.name }}</p>
            </template>
          </el-table-column>
          <el-table-column label="front_desc">
            <template slot-scope="scope">
              <p>{{ scope.row.front_desc }}</p>
            </template>
          </el-table-column>
          <el-table-column label="banner_url">
            <template slot-scope="scope">
              <p class="banner-image-box">
                <img :src="scope.row.banner_url" alt="" srcset="" />
              </p>
            </template>
          </el-table-column>

          <el-table-column label="wap_banner_url">
            <template slot-scope="scope">
              <p class="banner-image-box">
                <img :src="scope.row.wap_banner_url" alt="" srcset="" />
              </p>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div style="display: flex; justify-content: flex-end;">
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="childrenTableTotal"
        >
        </el-pagination>
      </div>
    </el-dialog>

    <el-dialog title="详情" v-if="editDialogTableVisible" :visible.sync="editDialogTableVisible">
        <editGoodsType v-if="editDialogTableVisible" :visible.sync="editDialogTableVisible" :baseInfo="selectInfo" @refreshList="refreshList"></editGoodsType>
    </el-dialog>

  </section>
</template>

<script>
import editGoodsType from './editGoodsType'

export default {
    components:{editGoodsType},
  data() {
    return {
      tableData: [],
      total: 0,
      childrenTable: [],
      childrenTableTotal: 0,
      form: {
        page: 1,
        size: 10
      },
      childrenForm: {
        page: 1,
        size: 10,
        id: ""
      },
      selectInfo:{},
      dialogTableVisible: false,
      editDialogTableVisible: false
    };
  },
  created() {
    this.getGoodsListInfo(this.form);
  },
  methods: {
    async handleDelete(index,info){
      let params = {
        id: info.id
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
this.delGoodsTypeInfo(params)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

    },
    async delGoodsTypeInfo(params){
        const res = await this.$axios.post('/goodsType/delGoodsTypeInfo',params)
        if(res.data.code != -1){
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.refreshList()
        }else{
this.$message({
            type: 'error',
            message: '删除失败!'
          });
        }
    },
    refreshList(){
      this.getGoodsListInfo(this.form);
    },
      handleEdit(index,info){
          this.selectInfo = info
          this.editDialogTableVisible = true
      },

    async openChilderDialog(id) {
      // 请求
      this.childrenForm.id = id;
      await this.geyGoodsTypeChildren(this.childrenForm);
      this.dialogTableVisible = true;
    },
    sizeChange(value) {
      this.form.size = value;
      this.getGoodsListInfo(this.form);
    },
    currentChange(value) {
      this.form.page = value;
      this.getGoodsListInfo(this.form);
    },
    async geyGoodsTypeChildren(params) {
      const res = await this.$axios.get("/list/geyGoodsTypeChildren", {
        params
      });
      console.log("res", res);
      if (res.data.list) {
        this.childrenTable = res.data.list;
        this.childrenTableTotal = res.data.total;
      } else {
        this.childrenTable = [];
        this.childrenTableTotal = 0;
      }
    },
    async getGoodsListInfo(params) {
      const res = await this.$axios.get("/list/goodsTypeList", { params });
      console.log("res", res);
      if (res.data.list) {
        this.tableData = res.data.list;
        this.total = res.data.total;
      } else {
        this.tableData = [];
        this.total = 0;
      }
    },
    async editGoodsTypeInfo(params) {
        const res = await this.$axios.post("/list/editGoodsTypeInfo", {
            params
        });
        console.log("res", res);
    }
  }
};
</script>

<style lang="less">
.goods-type-wrapper {
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
