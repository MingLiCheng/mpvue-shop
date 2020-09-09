<template>
  <div class="logFund">
    <el-dialog :title="dialog.title" :visible.sync="dialog.show" width="40%" center:true>
      <div class="form">
        <el-form
          ref="form"
          :model="form"
          :rules="form_rules"
          label-width="120px"
          style="margin:10px auto;width:420px;"
        >
          <el-form-item label="用户名:" prop="username">
            <el-input type="text" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="邮箱:" prop="email">
            <el-input type="text" v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input type="text" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="联系方式:" prop="tel">
            <el-input type="text" v-model="form.tel"></el-input>
          </el-form-item>

          <el-form-item class="text_right">
            <el-button @click="dialog.show = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit('form')">提 交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dialogsection",
  props: {
    dialog: Object,
    form: Object,
    getAdminList: Function
  },
  data () {
    return {
      format_type_list: [
        "提现",
        "提现手续费",
        "充值",
        "优惠券",
        "充值礼券",
        "转账"
      ],
      form_rules: {
        username: [
          { required: true, message: "用户名不能为空！", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空！", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空！", trigger: "blur" }
        ],
        tel: [{ required: true, message: "联系方式不能为空！", trigger: "blur" }]
      }
    }
  },
  methods: {
    onSubmit (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (this.dialog.option === "add") {
            let params = {
              username: this.form.username,
              email: this.form.email,
              password: this.form.password,
              tel: this.form.tel
            };
            console.log("添加管理员params", params);
            this.$axios.post("/api/admin/adduser", params).then(res => {
              if (res.data.data.message === "SUCCESS") {
                this.$message.success("成功");
                this.dialog.show = false;
                this.$parent.getAdminList();
              } else {
                this.$message.error("失败");
                this.$parent.getAdminList();
              }
            });
          } else {
            let params = {
              user_id: this.form.user_id,
              username: this.form.username,
              email: this.form.email,
              password: this.form.password,
              tel: this.form.tel
            };
            console.log("更新params", params);
            this.$axios.post("/api/admin/editById", params).then(res => {
              if (res.data.data.message === "SUCCESS") {
                this.$message.success("成功");
                this.dialog.show = false;
                this.$parent.getAdminList();
              } else {
                this.$message.error("失败");
                this.$parent.getAdminList();
              }
            })
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
