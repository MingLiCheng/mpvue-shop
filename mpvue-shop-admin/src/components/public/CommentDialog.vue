<template>
  <div class="comment-dialog-wrap">
    <el-dialog :title="dialog.title" :visible.sync="dialog.show" width="40%" center:true>
      <div class="form">
        <el-form
          ref="form"
          :model="form"
          :rules="form_rules"
          label-width="120px"
          style="margin:10px auto;width:420px;"
          label-position="left"
        >
          <el-form-item label="标题：">
            <el-input type="text" v-model="form.title"></el-input>
          </el-form-item>

          <el-form-item label="发起人：">
            <el-input type="text" v-model="form.nickName" disabled></el-input>
          </el-form-item>

          <el-form-item label="简介:">
            <el-input  type="textarea" v-model="form.summary"></el-input>
          </el-form-item>

          <el-form-item label="赞:">
            <el-input-number v-model="form.upnumber" @change="handleChange" :min="0" :max="999" label="描述文字"></el-input-number>
          </el-form-item>

          <el-form-item label="踩:">
            <el-input-number v-model="form.downnumber" @change="handleChange" :min="0" :max="999" label="描述文字"></el-input-number>
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
  },
  data() {
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
        describe: [
          { required: true, message: "收支描述不能为空！", trigger: "blur" }
        ],
        income: [
          { required: true, message: "收入不能为空！", trigger: "blur" }
        ],
        expend: [
          { required: true, message: "支出不能为空！", trigger: "blur" }
        ],
        cash: [{ required: true, message: "账户不能为空！", trigger: "blur" }]
      }
    }
  },
  methods: {
    onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                let params = {
                    commentid: this.form.id,
                    title: this.form.title,
                    summary: this.form.summary,
                    upnumber: this.form.upnumber,
                    downnumber: this.form.downnumber
                }
                this.$axios.post('/api/comment/edit', params).then(res => {
                    if(res.data.data.data){
                        this.$message.success('修改成功')
                        this.dialog.show = false
                        this.$parent.getCommentList()
                    }
                })
            } else {
                console.log('error submit!!');
                return false;
            }
            });
    },
     handleChange(value) {
        console.log(value);
      }
  }
}
</script>

<style lang="scss" scoped>
</style>

