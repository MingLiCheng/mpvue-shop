<!-- @format -->

<!--
name : 图片上传组件
notes: 备注
-->
<template>
  <div class="image-upload-wrap">
    <a-upload-dragger :showUploadList="false" :beforeUpload="beforeUpload" name="imagefile">
      <img v-if="uploadStatus === 'finish'" :src="url" alt="avatar">
      <div v-if="uploadStatus === 'wait'" class="upload-message-box">
        <p class="ant-upload-drag-icon">
          <img src="@/assets/images/u237.png" alt srcset>
        </p>
        <p class="ant-upload-text">头像上传</p>
      </div>
      <div v-if="uploadStatus === 'loading'" class="upload-message-box">
        <a-spin size="large"></a-spin>
        <p>
          上传中。。。
          <span class="operation-span" @click="cancelUpload">取消上传</span>
        </p>
      </div>
      <div v-if="uploadStatus === 'fail'" class="upload-message-box">
        <img src="@/assets/images/u237.png" alt srcset>
        <p>
          图片上传失败
          <span class="operation-span" @click="toUpload">重新上传</span>
        </p>
      </div>
    </a-upload-dragger>
  </div>
</template>

<script>
export default {
  name: "ImageUpload",

  props: ["value"],

  data() {
    const value = this.value || {};
    return {
      userInfo:{},
      uploadStatus: value.uploadStatus || "finish", // 等待上传：wait, 上传中：loading, 上传完成：finish, 上传失败：fail,
      url: value.url || "http://47.112.22.111/images/1558598274213-logo.png"
    };
  },

  watch: {
    value(val = {}) {
      this.url = val.url || "";
      this.uploadStatus = val.uploadStatus || "wait";
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.url = this.userInfo.avatar
  },

  methods: {
    async beforeUpload(file, fileList) {
      console.log("fileList", fileList);
      const isJPG = file.type === "image/jpeg";
      if (file.type.indexOf("image/") == -1) {
        this.$message.error("请选择图片文件");
        return false;
      } else if (!(file.type === "image/jpeg" || file.type === "image/png")) {
        this.$message.error("请选择jpg/png格式的图片");
        return false;
      } else if (file.size > 5120 * 1024) {
        this.$message.error("所选文件需小于5m");
        return false;
      }
      this.uploadStatus = "loading";
      let fd = new FormData();
      fd.append("file", file); //传文件
      const res = await this.$axios.post(
        "http://47.112.22.111/images/upload",
        fd
      );
      if (res.data.ret_code == "200") {
        this.uploadStatus = "finish";
        console.log('res.image',  res.data.img_path)
        this.url = 'http://' + res.data.img_path
        const upRes = await this.$axios.post('/api/user/edit',{
          avatar: this.url,
          user_id: this.userInfo.user_id
        })
        console.log('Upres', upRes)
        return false
      } else {
        this.uploadStatus = "fail";
        return false
      }
      return false;
    },
    cancelUpload(e) {
      console.log("取消上传");
      this.uploadStatus = "wait";
      e.stopPropagation();
    },
    toUpload(e) {
      this.uploadStatus = "wait";
      this.url = "";
      console.log("重新上传");
      e.stopPropagation();
    },
  }
};
</script>

<style lang="less">
.image-upload-wrap {
  height: 200px;
  .ant-upload.ant-upload-drag .ant-upload {
    padding: 0px;
  }
  .ant-upload.ant-upload-drag .ant-upload-drag-container {
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    img {
      max-height: 198px;
      max-width: 100%;
      width: auto;
      height: auto;
    }
    .upload-message-box {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
  .operation-span {
    color: #1890ff;
  }
}
</style>
