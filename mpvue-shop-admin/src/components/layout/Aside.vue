<template>
  <section class="aside-wrap">
      <el-menu
        default-active="1-1"
        class="el-menu-vertical-demo"
        background-color="#222d32"
        text-color="#fff"
        active-text-color="#3c8dbc"
      >
        <router-link to="/">
          <el-menu-item class="homeicon-box" index="0">
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <template v-for="item in asidenavs">
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <span slot="title">{{item.name}}</span>
            </template>
            <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
              <el-menu-item :index="citem.path">
                <span slot="title">{{citem.name}}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
  </section>
</template>

<script>
export default {
  data() {
    return {
      asidenavs: [
        {
          icon: "profile",
          name: "商品信息管理",
          path: "goods_management",
          children: [
            { path: "/goods_management/banner_list", name: "导航管理" },
            { path: "/goods_management/goods_type", name: "商品分类" },
            { path: "/goods_management/goods_type", name: "商品分类" },
            ]
        },
        {
          icon: "profile",
          name: "专题信息管理",
          path: "ad_management",
          children: [
            { path: "/ad_management/banner_list", name: "导航列表" },
            ]
        },
        {
          icon: "team",
          name: "分类信息管理",
          path: "type_management",
          children: [
            { path: "/type_management/order_list", name: "订单列表" },
            ]
        },
        {
          icon: "team",
          name: "订单信息管理",
          path: "order_management",
          children: [
            { path: "/order_management/order_list", name: "订单列表" },
            ]
        },
        {
          icon: "crown",
          name: "用户信息管理",
          path: "user_management",
          children: [
            { path: "/user_management/user_list", name: "用户列表" },
          ]
        },
      ]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="less" scoped>
.aside-wrap {
  height: 100%;
  width: 100%;
  background-color: #222d32 !important;
  .homeicon-box {
    background-color: #fff;
    line-height: 56px;
  }
  .el-menu-vertical-demo {
    border: 0px;
    overflow: hidden;
  }
  .el-menu {
    height: 100%;
    overflow: hidden;
    .el-menu-item{
      text-align: center;
    }
  }
}
</style>