<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    if (!localStorage.getItem("token")) {
      localStorage.clear();
      this.$router.replace("/signin");
    }
  },
  watch: {
    $route(to, from) {
      if (!localStorage.getItem("token")) {
        localStorage.clear();
        this.$router.replace("/signin");
      }
    },
  },
};
</script>

<style lang="less">
html {
  height: 100%;
  body {
    height: 100%;
    #app {
      font-family: "Avenir", Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #2c3e50;
      height: 100%;
    }
    #nav {
      padding: 30px;
      a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
          color: #42b983;
        }
      }
    }
  }
}
</style>
