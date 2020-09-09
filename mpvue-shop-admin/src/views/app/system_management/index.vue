<!--
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-04-07 23:32:02
 -->
<template>
  <div class="system-management-wrap">
    <el-container>
      <el-aside style="width:129px;">
        <el-menu :default-active="activeIndex" mode="vertical">
          <el-menu-item index="search_history_list">
            <router-link to="/goods_management/search_history_list">搜索信息管理</router-link>
          </el-menu-item>
          <el-menu-item index="goods_list">
            <router-link to="/goods_management/goods_list">地址信息管理</router-link>
          </el-menu-item>
          <el-menu-item index="goods_type">
            <router-link to="/goods_management/goods_type">快递信息管理</router-link>
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
.system-management-wrap {
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

