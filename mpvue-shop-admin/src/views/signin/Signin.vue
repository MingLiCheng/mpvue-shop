<template>
  <div class="signin-panel">
    <div class="loginContent">
      <h1 class="title">平台管理后台</h1>
      <ul class="login-list">
        <li class="account-input">
          <i class="el-icon-user"></i>
          <input
            type="text"
            placeholder="请输入用户名"
            @focus="blurEvent"
            v-model="account"
            @keyup.enter="enterLogin"
          />
        </li>
        <li class="password-input">
          <i class="el-icon-lock"></i>
          <input
            type="password"
            placeholder="请输入密码"
            @focus="blurEvent"
            v-model="password"
            @keyup.enter="enterLogin"
          />
        </li>
        <li>
          <el-checkbox :checked="isRemember" @change="remember"
            >记住账号</el-checkbox
          >
        </li>
        <li>
          <el-button type="primary" @click="login">登录</el-button>
        </li>
        <li>
          <span style="color: red">{{ loginError }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Utils from "@/assets/js/utils/utils";
export default {
  data() {
    return {
      account: "",
      password: "",
      loginError: "",
      isRemember: false,
    };
  },
  components: {},
  mounted() {
    // 获取cookie
    const cookie = Utils.getCookie("wxbookman");
    if (cookie) {
      const decryptObj = Utils.decryptStr(cookie, "secretcastle");
      this.account = decryptObj.account;
      this.password = decryptObj.password;
      this.isRemember = decryptObj.isRemember === "1" && true;
    }
  },
  methods: {
    blurEvent() {
      this.loginError = "";
    },
    enterLogin() {
      if (this.account !== "" && this.password !== "") {
        this.login();
      } else {
        this.loginError = "用户名或密码不能为空";
      }
    },
    remember(value) {
      const checked = value.target.checked;
      this.isRemember = checked;
      if (!checked) {
        console.log("删除cookie");
        Utils.delCookie("wxbookman");
      }
    },
    login: function() {
      // e.preventDefault();
      if (this.account === "") {
        this.loginError = "登录失败！请输入用户名！";
        return;
      }
      if (this.password === "") {
        this.loginError = "登录失败！请输入密码！";
        return;
      }
      const userInfo = {
        email: this.account,
        password: this.password,
      };
      this.$axios.post("/user/adminLogin", userInfo).then((res) => {
        if (res.data.code === 0) {
          this.loginError = "";
          if (this.isRemember) {
            const cryptoStr = Utils.CryptoStr(
              {
                account: this.account,
                password: this.password,
                isRemember: "1",
              },
              "secretcastle"
            );
            Utils.setCookie("wxbookman", cryptoStr);
          }
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem(
            "userInfo",
            JSON.stringify(res.data.data.userInfo)
          );
          this.$router.push("/");
        } else {
          this.loginError = res.data.data.msg;
          console.log(this.loginError);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.signin-panel {
  position: relative;
  height: 100%;
}
.loginContent {
  position: fixed;
  width: 480px;
  height: 380px;
  right: 50%;
  top: 50%;
  transform: translate3d(50%, -70%, 0);
  background-color: #fff;
  border-radius: 5px;
  box-shadow: "0, 0, 5px #eee";
  padding: 45px 58px 0 58px;
  border: 1px solid #aaa;
}
.title {
  text-align: center;
  font-size: 27px;
}
.login-list {
  list-style: none;
  border-top: 1px solid #aaa;
  margin-top: 22px;
  padding-top: 36px;
  padding: 0;
  padding-top: 5px;
}
.login-list li {
  margin-top: 20px;
  display: flex;
}
.login-list li:nth-child(3) {
  text-align: left;
}
.login-list li:last-child {
  padding: 0;
}
.login-list li input {
  border: 1px solid #aaa;
  width: 100%;
  height: 36px;
  padding-left: 36px;
  padding-right: 10px;
  border-radius: 5px;
  outline: none;
}
.login-list li .anticon {
}
.login-list li button {
  display: block;
  width: 100%;
  height: 35px;
}
  .account-input,
  .password-input {
    i {
      position: absolute;
      line-height: 36px;
      margin: 0 12px;
    }
  }
</style>
