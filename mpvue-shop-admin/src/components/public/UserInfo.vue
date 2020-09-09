<template>
  <section class="userinfo-wrap">
    <div class="avatar-box">
      <img :src="userInfo.avatar" alt>
    </div>
    <div class="username-box">
      <span>{{userInfo.username}}</span>
    </div>
    <div class="drop-menu">
      <ul>
        <li @click="$router.push('/me')">我的</li>
        <li @click="logOut">退出</li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      userInfo:{}
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
  },
  computed: {
     
  },
  methods: {
    logOut(){
      this.$parent.quite()
    },
  },
}
</script>

<style lang="less" scoped>
.userinfo-wrap {
  height: 40px;
  // width: 100px;
  padding: 0 10px;
  // background: #fff;
  display: flex;
  position: relative;
  .avatar-box {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: rgb(255, 255, 255);
    img {
      width: 100%;
      border-radius: 50%;
      transition: transform 0.8s ease-out;
    }
  }
  .avatar-box img:hover {
    transform: rotateZ(360deg);
  }
  .username-box {
    padding: 0 20px;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    color: #ffffff;
  }
  .drop-menu {
    position: absolute;
    width: 128px;
    top: 40px;
    left: 10px;
    display: none;
    z-index: 2;
    border-radius: 5px;
    overflow: hidden;
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      li {
        width: 100%;
        height: 40px;
        background-color: #fff;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
      }
      li:hover {
        background-color: #ccc;
      }
    }
  }
}
.userinfo-wrap:hover .drop-menu {
  display: block;
}
</style>
