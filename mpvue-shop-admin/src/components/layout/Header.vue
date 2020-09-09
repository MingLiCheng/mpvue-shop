<!-- @format -->
<!--
name : 底部
notes: ……
-->
<template>
  <div class="header">
    <el-header>
      <el-row>
        <div class="logo-box" @click="goToHome">
          <h1>美洁生鲜</h1>
        </div>
        <div class="el-menu-box">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-nav"
            mode="horizontal"
            background-color="#2588f0"
            text-color="#fff"
          >
            <el-menu-item v-for="(item,index) in headerModuleList" :key="index" :index="item.name">
              <router-link :to="item.path">{{ item.title }}</router-link>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="userInfo-box">
            <span class="avatar">
              <!-- <img src="../../assets/images/avatar.png" alt /> -->
            </span>
            <span class="userName">
              <el-dropdown @command="handleCommand" trigger="click">
                <span class="el-dropdown-link">
                  <p><span class="textoneline">{{'admin'}}<i class="el-icon-arrow-down el-icon--right"></i></span></p>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
        </div>
      </el-row>
    </el-header>
  </div>
</template>

<script>
// import Api from '@/api'
// import { mapGetters } from "vuex";
const headerAdminModuleList = [
  {
    title: '首页',
    path: '/welcome',
    name: 'welcome'
  },
  {
    title: '专题管理',
    path: '/special_management/pt_manage',
    name: 'special_management'
  },
  {
    title: '商品管理',
    path: '/goods_management/banner_list',
    name: 'goods_management'
  },
  {
    title: '订单管理',
    path: '/order_management/order_list',
    name: 'order_management'
  },
  {
    title: '用户管理',
    path: '/user_management/user_list',
    name: 'user_management'
  },
  // {
  //   title: '系统管理',
  //   path: '/system_management',
  //   name: 'system_management'
  // }
]
export default {
  name: 'HeaderBox',
  props: {},
  data () {
    return {
      headerModuleList: headerAdminModuleList,
      logoutUrl:'',
      title:'远程文件管理',
      snNo:'',
      terminalPostion:'',
    }
  },
  created() {
  },
  computed: {
    activeIndex () {
      return `${this.$route.matched[1].name}`
    }
  },
  methods: {
    goToHome () {
      this.$router.push('/')
    },
    handleCommand (command) {
      switch (command) {
        case 'logout':
          this.$confirm('确定退出吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.logout()
            this.$message({
              type: 'success',
              message: '退出成功!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
          break

        default:
          break
      }
    },
    async logout(){
      localStorage.clear()
      sessionStorage.clear()
       this.$router.push('/signin')
    },
  },
}
</script>

<style lang='less'>
.header {
  width: 100%;
  padding: 0;
  position: fixed;
  z-index: 1999;
  overflow-x: auto;
  overflow-y: hidden;
  font-size: 16px;
  p{
      margin: 0px;
  }
  .el-header {
    height: 60%;
    top: 0;
    left: 0;
    width: 100%;
    min-width: 1200px;
    background: #2588f0;
    .el-row {
      height: 100%;
      display: flex;
      justify-content: space-between;
      .logo-box {
        cursor: pointer;
        width: 220px;
        display: flex;
        align-items: center;
        img {
          width: auto;
          height: auto;
          max-width: 100%;
        }
        h1{
            color: #fff;
            margin-bottom: 0px;
        }
      }
      .el-menu-box {
        flex: 1;
        display: flex;
        justify-content: flex-start;
        .el-menu-nav {
          width: 66%;
          min-width: 620px;
          max-width: 848px;
          .el-menu-item {
            text-align: center;
            box-sizing: border-box;
            width: 14.22%;
            padding: 0;
            border-bottom: none;
            // font-size: 16px;
            a {
              display: inline-block;
              width: 100%;
              height: 100%;
            }
            &.is-active {
              border: none;
              position: relative;
              color: #fff;
              &:after {
                position: absolute;
                content: "";
                display: block;
                height: 2px;
                width: 30%;
                background-color: #fff;
                bottom: 10%;
                left: 50%;
                transform: translateX(-50%);
              }
            }
          }
        }
        .remote-terminal-info{
                .ap-info {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: space-around;
        align-items: center;

        h1 {
          margin: 0px;
          padding: 0px;
          height: 26px;
          font-size: 20px;
          font-family: MicrosoftYaHei-Bold;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
        }
        p {
          padding: 0px;
          margin: 0px;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          margin-left: 12px;
          color: rgba(255, 255, 255, 1);
          span {
            display: inline-block;
          }
        }
      }
        }
      }
      .el-menu.el-menu--horizontal{
        border-bottom: none;
      }
      .userInfo-box {
        width: 140px;
        display: flex;
        align-items: center;
          .avatar {
            width: 60px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 32px;
              height: 32px;
              border-radius: 50%;
              cursor: pointer;
            }
          }
          .userName{
            height: 40px;
            margin-left: 15px;
            display: flex;
            align-items: center;
            cursor: pointer;
            .el-dropdown-link{
              color: #fff;
              p{
                display: flex;
                align-items: center;
                span{
                  width: 70px;
                }
              }
            }
          }
      }
    }
  }
}
</style>
