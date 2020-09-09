<!--
 * @Description:
 * @Author: mlcheng2
 * @Date: 2020-04-13 23:08:56
 -->
<template>
  <section class="edit-goodsimages-wrap" v-loading="loading">
    <div class="dialog-body">
      <div v-if="tableData.length <= 0">
        <el-upload
          ref="imgUploadRef"
          action=""
          :multiline="true"
          :http-request="elUploadHttpRequest"
          list-type="picture-card"
          :file-list="imgUrlList"
          :on-remove="handleImageRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>

      <ul class="image-list" v-else>
        <li v-for="item in tableData" :key="item.id">
          <div class="upload-logo">
            <el-upload
              class="logo-uploader"
              :show-file-list="false"
              action=""
              :before-upload="
                file => {
                  beforeImageUpload(file, item);
                  return false
                }
              "
            >
              <img v-if="item.img_url" :src="item.img_url" class="logo-image" />
              <div v-else class="uploader-default">
                <i class="el-icon-upload"></i>
                <span>上传图片</span>
              </div>
            </el-upload>
          </div>
        </li>
      </ul>
    </div>
    <div class="dialog-footer">
      <el-button type="primary" @click="cancel">确 定</el-button>
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
      tableData: [],
      isImageLoading: false,
      imgUrlList: [],
      form:{},
      loading: false
    };
  },
  created() {
    this.form = this.baseInfo;
    console.log("this.form", this.form);
    this.getGoodsSwiperImages({ goodsId: this.baseInfo.id });
  },
  methods: {
    elUploadHttpRequest(file) {
      console.log("file", file);
      this.handleImageUpload(file.file);
    },
    handleImageRemove(file, fileList) {
      console.log("handleImageRemove", "file", file, "fileList", fileList);
      this.imgUrlList = fileList;
    },
    handleImageUpload(file) {
      console.log("files", file);
      let _this = this;
      _this.isImageLoading = true;
      UploadFile.uploadFile(
        {
          file: file
        },
        async res => {
          _this.isImageLoading = false;
          console.log("上传完成", res, res.img_path);
          const cRes = await _this.$axios.post('/goods/addGoodsSwiperImages',{goodsId:_this.baseInfo.id,img_url:res.img_path})
          if(cRes){
            _this.$message.success('添加成功')
            _this.$refs["imgUploadRef"].uploadFiles[
            _this.$refs["imgUploadRef"].uploadFiles.length - 1
          ].url = res.img_path;
          _this.$refs["imgUploadRef"].uploadFiles[
            _this.$refs["imgUploadRef"].uploadFiles.length - 1
          ].status = "success";
          _this.imgUrlList = _this.$refs["imgUploadRef"].uploadFiles;
          }

        },
        err => {
          console.log("上传出错", err);
          _this.isImageLoading = false;
        }
      );

      return false;
    },
    submitForm() {
      let params = { id: this.baseInfo.id, ...this.form };
      this.editGoodsType(params);
    },
    beforeImageUpload(file, info) {
      let params = { file };
      let _this = this;
      UploadFile.uploadFile(
        params,
        async res => {
          console.log("res", res);
          if (res.ret_code == "200") {
            const editRes = await _this.$axios.post("/goods/editGoodsSwiperImages", {
              id: info.id,
              img_url: res.img_path
            });
            console.log('editRes',editRes);

            if (editRes.data.message === "SUCCESS") {
              _this.$set(info, "img_url", res.img_path);
              this.$message.success("修改成功");
              return false;
            } else {
              this.$message.success("修改失败");
            }

            return false;
          } else {
            this.$message.success("上传失败");
            return false;
          }
        },
        error => {
          console.log("error", error);
          return false;
        }
      );
      return false;
    },
    cancel() {
      this.$emit("update:visible", false);
    },
    async editGoodsSwiperImages(params) {
      const res = await this.$axios.post(
        "/goods/editGoodsSwiperImages",
        params
      );
      if (res.code !== -1) {
        this.$message.success("修改成功");
        this.$emit("refreshList");
        this.cancel();
      } else {
        this.$message.error("修改成失败");
      }
    },
    async getGoodsSwiperImages(params) {
      this.loading = true
      const res = await this.$axios.get("/goods/getGoodsSwiperImages", {
        params
      });
      console.log("res", res);
      this.tableData = res.data.list;
      this.loading = false
    }
  }
};
</script>

<style lang="less">
.edit-goodsimages-wrap {
  .dialog-body {
    display: flex;
    justify-content: center;
    .image-list {
      display: flex;
      justify-content: space-evenly;
      padding: 20px 0px;
      width: 100%;
      height: 100%;
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
