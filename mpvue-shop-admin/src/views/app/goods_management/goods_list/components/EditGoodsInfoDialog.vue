<!--
 * @Description:
 * @Author: mlcheng2
 * @Date: 2020-04-13 23:08:56
 -->
<template>
  <section class="edit-goodsinfo-wrap">
    <div class="dialog-body">
      <el-form ref="form" :model="form" label-width="120px">
        <div class="left">
          <el-form-item label="name：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="goods_brief：">
            <el-input v-model="form.goods_brief"></el-input>
          </el-form-item>
          <el-form-item label="goods_number：">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="retail_price：">
            <el-input v-model="form.retail_price"></el-input>
          </el-form-item>
        </div>
        <div class="right">
          <el-form-item label="list_pic_url">
            <div class="upload-logo">
              <el-upload
                class="logo-uploader"
                :show-file-list="false"
                action=""
                :before-upload="beforeBannerUrlUpload"
              >
                <img
                  v-if="form.list_pic_url"
                  :src="form.list_pic_url"
                  class="logo-image"
                />
                <div v-else class="uploader-default">
                  <i class="el-icon-upload"></i>
                  <span>上传图片</span>
                </div>
                <!-- <el-progress v-else :width="178" type="circle" :percentage="25"></el-progress> -->
              </el-upload>
            </div>
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
    baseInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        name:'',
        goods_brief:'',
        goods_number:'',
        retail_price:'',
        list_pic_url:''
      }
    };
  },
  created() {
    this.form = this.baseInfo;
    console.log("this.form", this.form);
  },
  methods: {
    submitForm() {
      let params = { id: this.baseInfo.id, ...this.form };
      this.editGoodsType(params);
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
            _this.form.list_pic_url = res.img_path;
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
      const res = await this.$axios.post("/goods/editGoodsInfoById", params);
      if (res.code !== -1) {
        this.$message.success("修改成功");
        this.$emit("refreshList");
        this.cancel();
      } else {
        this.$message.error("修改成失败");
      }
    }
  }
};
</script>

<style lang="less">
.edit-goodsinfo-wrap {
  .dialog-body {
    display: flex;
    justify-content: center;
    .el-form {
      display: flex;
      justify-content: space-evenly;
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
