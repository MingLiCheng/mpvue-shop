<template>
  <section class="edit-groupbuy-wrap">
    <div class="dialog-body">
      <el-form ref="form" :model="form" label-width="120px">
        <div class="left">
          <el-form-item label="商品名称：">
            <el-select v-model="form.goods_id" filterable placeholder="请选择" :disabled="dialogObj.type === 'edit'">
              <el-option
                v-for="item in goodsList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="砍价名称：">
            <el-input v-model="form.reducebuy_name"></el-input>
          </el-form-item>
        </div>

        <div class="right">
          <el-form-item label="优惠价格：">
            <el-input v-model="form.reduce_price" :disabled="dialogObj.type === 'edit'"></el-input>
          </el-form-item>
          <el-form-item label="结束时间：">
            <el-date-picker
              v-model="form.end_time"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </section>
</template>

<script>
import UploadFile from "@/api/upload";
export default {
  name: "EditGoodsType",
  props: {
    dialogObj: {
      type: Object,
      default: () => {
        return { type: "add" };
      }
    },
    baseInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        goods_id: "",
        reducebuy_name: "",
        reduce_price:"",
        end_time:''
      },
      goodsList: []
    };
  },
  created() {
    this.form = this.baseInfo;
    console.log("this.form", this.form);
    this.getGoodsList();
  },
  methods: {
    submitForm() {
      let params = { ...this.form };
      if (this.dialogObj.type === "edit") {
        params = {
          id: this.baseInfo.id,
          reducebuy_name: this.form.reducebuy_name,
          end_time: this.form.end_time,
        }
        this.updateGroupBuyInfo(params)
      } else {
        this.initiateGroupBuy(params)
      }



      console.log("params", params);
    },
    beforeBannerUrlUpload(file) {
      console.log("file", file);
      let params = { file };
      let _this = this;
      UploadFile.uploadFile(
        params,
        res => {
          console.log("res", res);
          if (res.ret_code == "200") {
            _this.form.banner_url = res.img_path;
          }
          this.$message.success("上传成功");
        },
        error => {
          console.log("error", error);
        }
      );
      return false;
    },
    beforeWapBannerUrlUpload(file) {
      console.log("file", file);
      let params = { file };
      let _this = this;
      UploadFile.uploadFile(
        params,
        res => {
          console.log("res", res);
          if (res.ret_code == "200") {
            _this.form.wap_banner_url = res.img_path;
          }
          this.$message.success("上传成功");
        },
        error => {
          console.log("error", error);
        }
      );
      return false;
    },
    cancel() {
      this.$emit("update:visible", false);
    },
    async editGoodsType(params) {
      const res = await this.$axios.post("/list/editGoodsTypeInfo", params);
      if (res.code !== -1) {
        this.$message.success("修改成功");
        this.$emit("refreshList");
        this.cancel();
      } else {
        this.$message.error("修改成失败");
      }
    },
    async getGoodsList(params) {
      const res = await this.$axios.get("/groupBuy/goodsListMap", params);
      if (res.data.code !== -1) {
        console.log("res", res);
        this.goodsList = res.data.list;
      } else {
      }
    },
    async initiateGroupBuy(params) {
      if(!params.end_time || !params.goods_id){
        this.$message.warning('结束时间和商品是必选项')
        return false
      }
      const res = await this.$axios.post("/reduceBuy/initiateReduceBuy", params);
      if (res.data.code !== -1) {
        this.$message.success('创建成功')
        this.$emit('refreshList')
        this.cancel()
      } else {
      }
    },
    async updateGroupBuyInfo(params) {
      if(!params.end_time || !params.goods_id){
        this.$message.warning('结束时间和商品是必选项')
        return false
      }
      const res = await this.$axios.post("/reduceBuy/updateReduceBuy", params);
      if (res.data.code !== -1) {
        this.$message.success('修改成功')
        this.$emit('refreshList')
        this.cancel()
      } else {
      }
    }
  }
};
</script>

<style lang="less">
.edit-groupbuy-wrap {
  .dialog-body {
    display: flex;
    justify-content: center;
    .el-form {
      display: flex;
      justify-content: space-evenly;
      .left{
        flex: 1;
      }
      .right{
        flex: 1;
      }
    }
    .upload-logo {
      .logo-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 166px;
        height: 166px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px;
      }
      .logo-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .logo-image {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
      .uploader-default {
        height: 166px;
        width: 166px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .dialog-footer {
    // height: 60px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 40px;
  }
}
</style>
