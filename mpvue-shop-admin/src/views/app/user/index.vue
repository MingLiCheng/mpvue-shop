<template>
  <div class="user-management-wrap">
    <el-container>
      <el-aside style="width:129px;">
        <el-menu :default-active="activeIndex" mode="vertical">
          <el-menu-item index="user_list">
            <router-link to="/user_management/user_list">用户列表</router-link>
          </el-menu-item>
          <el-menu-item index="admin_list">
            <router-link to="/user_management/admin_list">管理员列表</router-link>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    activeIndex() {
      return `${this.$route.matched[2].name}`;
    },
  },
};
</script>

<style lang="less">
.user-management-wrap {
  margin: 10px 15px 15px 15px;
  background-color: #ffffff;
  border: 1px solid #e1e1e1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  height: calc(100vh - 110px);

  .el-container {
    .el-aside {
      .el-menu {
        border-right: none;
        .el-menu-item {
          padding: 0px !important;
          a {
            display: block;
            height: 100%;
            width: 100%;
          }
        }
      }
    }
    .el-main {
      border-left: 1px solid #e6e6e6;
      height: calc(100vh - 110px);
    }
  }
}
</style>
