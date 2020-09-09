<!--
 * @Description:
 * @Author: mlcheng2
 * @Date: 2020-04-11 22:59:19
 -->
<template>
  <div>
    <keep-alive :include="['ArticleList']">
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
}
</script>

<style lang="less">

</style>