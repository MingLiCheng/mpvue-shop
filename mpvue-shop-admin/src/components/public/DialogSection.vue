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
          <el-form-item label="id:">
            <el-input type="text" v-model="form.id" disabled></el-input>
          </el-form-item>

          <el-form-item label="书名:">
            <el-input type="text" v-model="form.title"></el-input>
          </el-form-item>

          <!-- <el-form-item label="图片:">
            <el-input type="text" v-model="form.image"></el-input>
          </el-form-item> -->

          <el-form-item label="作者:">
            <el-input type="text" v-model="form.author"></el-input>
          </el-form-item>

          <el-form-item label="价格:">
            <el-input type="text" v-model="form.price"></el-input>
          </el-form-item>

          <el-form-item label="编码:">
            <el-input type="text" v-model="form.isbn"></el-input>
          </el-form-item>

          <el-form-item label="出版社:">
            <el-input type="text" v-model="form.publisher"></el-input>
          </el-form-item>

          <el-form-item label="页数:">
            <el-input type="text" v-model="form.pages"></el-input>
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
    getProfiles: Function
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
    onSubmit(form) {
       this.$message.info('暂不支持')
       this.dialog.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

