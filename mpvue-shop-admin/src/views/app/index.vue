<template>
  <el-container class="home-container">
    <el-header height="60px">
      <myHeader></myHeader>
    </el-header>
    <el-container class="content-container">
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Header from '@/components/layout/Header'
  import Aside from '@/components/layout/Aside'
  export default {
    data() {
      return {

      }
    },
    components: {
      'myHeader': Header,
      'myAside': Aside
    }
  }
</script>

<style lang="less" scoped>
  .home-container {
    height: 100%;

    .el-header {
      padding: 0px;
    }
    .content-container{

    }
  }
</style>