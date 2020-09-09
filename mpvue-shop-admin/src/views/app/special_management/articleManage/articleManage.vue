<!--
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-04-11 22:33:39
 -->

<template>
  <section class="article-manage-wrapper">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="id">
        <template slot-scope="scope">
          <p>{{ scope.row.id }}</p>
        </template>
      </el-table-column>
      <el-table-column label="title">
        <template slot-scope="scope">
          <p>{{ scope.row.title }}</p>
        </template>
      </el-table-column>
      <el-table-column label="subtitle">
        <template slot-scope="scope">
          <p>{{ scope.row.subtitle }}</p>
        </template>
      </el-table-column>

      <el-table-column label="avatar">
        <template slot-scope="scope">
          <p class="banner-image-box">
            <img :src="scope.row.avatar" alt="" srcset="" />
          </p>
        </template>
      </el-table-column>
      <el-table-column label="scene_pic_url">
        <template slot-scope="scope">
          <p class="banner-image-box">
            <img :src="scope.row.scene_pic_url" alt="" srcset="" />
          </p>
        </template>
      </el-table-column>
      <el-table-column label="item_pic_url">
        <template slot-scope="scope">
          <p class="banner-image-box">
            <img :src="scope.row.item_pic_url" alt="" srcset="" />
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
  </section>
</template>

<script>
export default {
  name: "ArticleList",
  data() {
    return {
      tableData: [],
      total: 0,
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
    async handleDelete(index, info) {
      let params = {
        id: info.id,
      };
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$axios.post(
            "/specialManagement/delTopicDetail",
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
    refreshList(){
        this.getGoodsListInfo(this.form);
    },
    handleEdit(index, info) {
      this.$router.push(
        `/special_management/article_manage/article_detail/${info.id}`
      );
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
      const res = await this.$axios.get("/list/topicList", { params });
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
.article-manage-wrapper {
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
