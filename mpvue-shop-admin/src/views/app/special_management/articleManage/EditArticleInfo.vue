<!--
 * @Description:
 * @Author: mlcheng2
 * @Date: 2020-04-11 22:48:22
 -->
<template>
  <section class="edit-articleinfo-wrapper">
    <div class="page-header">
      <el-page-header @back="goBack" content="详情页面"> </el-page-header>
    </div>

    <div class="detail-wrapper">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="subtitle">
          <el-input v-model="form.subtitle"></el-input>
        </el-form-item>
        <el-form-item label="avatar">
          <div class="upload-logo">
            <el-upload
              class="logo-uploader"
              :show-file-list="false"
              action=""
              :before-upload="(file) => {imageUpload(file,'avatar'); return false}"
            >
              <img
                v-if="form.avatar"
                :src="form.avatar"
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
        <el-form-item label="scene_pic_url">
          <div class="upload-logo">
            <el-upload
              class="logo-uploader"
              :show-file-list="false"
              action=""
              :before-upload="(file) => {imageUpload(file,'scene_pic_url'); return false}"
            >
              <img
                v-if="form.scene_pic_url"
                :src="form.scene_pic_url"
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
        <el-form-item label="item_pic_url">
          <div class="upload-logo">
            <el-upload
              class="logo-uploader"
              :show-file-list="false"
              action=""
              :before-upload="(file) => {imageUpload(file,'item_pic_url'); return false}"
            >
              <img
                v-if="form.item_pic_url"
                :src="form.item_pic_url"
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
        <el-form-item label="文章内容" prop="content">
          <div class="editor-box">
            <QuillEditor
              :content.sync="form.content"
              :change="contentChange"
            ></QuillEditor>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <div class="submit-box">
      <el-button type="primary" @click="submit('useHelpDetailForm')"
        >提交</el-button
      >
    </div>
  </section>
</template>

<script>
import QuillEditor from "./components/QuillEditor/index";
import UploadFile from "@/api/upload";
export default {
  name: "EditArticleInfo",
  components: { QuillEditor },
  data() {
    return {
      form: {
        title: "",
        subtitle: "",
        avatar: "",
        scene_pic_url: "",
        item_pic_url: "",
        content: ""
      }
    };
  },
  created() {
    // console.log('this.$routes',this.$route);

    this.getDeatil({ id: this.$route.params.id });
  },
  methods: {
    submit(){
      let params = {...this.form}
      this.editArticleDetail(params)
    },
    imageUpload(file,type){
      let params = {
        file: file
      }
      let _this = this;
      UploadFile.uploadFile(
        params,
        res => {
          console.log("res", res);
          if (res.ret_code == "200") {
            _this.form[type] = res.img_path;
          }
          this.$message.success("上传成功");
        },
        error => {
          console.log("error", error);
        }
      );
      return false;
    },
    goBack() {
      this.$router.go(-1);
    },
    contentChange(value) {
      this.form.content = value.html;
    },
    async getDeatil(params) {
      const res = await this.$axios.get("/list/topicDetail", { params });
      console.log("res", res);

      if (res.code !== -1) {
        this.form = res.data.detail;
      } else {
        this.$message.error("修改成失败");
      }
    },
    async editArticleDetail(params){
      const res = await this.$axios.post('/list/editTopicDetail',params)
      console.log('res',res);
      if(res.data.code != -1 ){
        this.$message.success('修改成功')
        this.$router.go(-1)
      }else{
        this.$message.error('失败')
      }

    }
  }
};
</script>

<style lang="less">
.edit-articleinfo-wrapper {
  padding: 20px;
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
  .page-header {
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
  }
  .el-form-item {
    width: 500px;
  }
  .editor-box {
    position: relative;
    padding: 10px 0px;
    width: 800px;
    #editor {
      width: 800px;
      height: 540px;
      color: black;
      em {
        font-style: italic;
      }
    }
  }
}
</style>
