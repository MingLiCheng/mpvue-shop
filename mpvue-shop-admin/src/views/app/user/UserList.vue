<template>
  <section>
    <div class="table_container">
      <el-table
        :data="userList"
        max-height="600"
        border
        :default-sort="{prop: 'date', order: 'descending'}"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>

        <el-table-column prop="nickName" label="昵称" align="center" width="120">
          <template slot-scope="scope">
            <span style="color:#4db3ff">
              <a href="javascript:;" style="color: #4db3ff" @click="toUserInfo(scope.row.open_id)">{{ scope.row.nickName }}</a>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="avatarUrl" label="头像" align="center" width="120">
          <template slot-scope="scope">
            <img
              style="width: 60px; height: 60px; margin: 0 auto"
              :src="scope.row.avatarUrl"
              alt
              srcset
            >
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="last_visit_time" label="最后访问" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.last_visit_time | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="性别" align="center" width="60">
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.gender | genderFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="uuid" label="ID" align="center" width="320"></el-table-column>
        <el-table-column prop="open_id" label="openid" align="center">
          <template slot-scope="scope">
            <span>
              <a href="javascript:;" style="color: #4db3ff">{{ scope.row.open_id }}</a>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" align="center" label="操作" fixed="right" width="180">
          <template slot-scope="scope">
            <el-button type="warning" icon="edit" size="small" @click="$message.error('暂时不支持')">编辑</el-button>
            <el-button
              type="danger"
              icon="delete"
              size="small"
              @click="onDeleteUser(scope.row,scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              v-if="paginations.total > 0"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
              :current-page.sync="paginations.page_index"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      userList: [],
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
    this.getUserList()
  },
  methods: {
    toUserInfo(id){
      this.$router.push(`/user/userinfo/${id}`)
    },
    handleCurrentChange(page) {

    },
    handleSizeChange(page_size) {
      this.paginations.page_size = page_size;

    },
    getUserList() {
      this.$axios.get('/list/userList').then(res => {
        console.log('res',res);

        this.userList = res.data.list
      })
    },
    onDeleteUser(row,index){
      this.$message.error('暂不支持')
    }
  },

}
</script>

<style lang="less" scoped>
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>
