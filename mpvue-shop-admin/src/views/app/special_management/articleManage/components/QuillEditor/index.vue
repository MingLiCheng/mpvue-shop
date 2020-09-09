<!--
 * @Description: 帮助文档所需的 富文本编辑器 集成自定义 Quill
 * @Author: mlcheng2
 * @Date: 2019-10-18 15:41:24
 -->

<template>
  <section class="quill-editor-wrap" v-loading="isLoading">
    <div id="toolbar">
      <span class="ql-formats">
        <select class="ql-font" style="width: 138px;">
          <option selected></option>
          <option value="SimSun">宋体</option>
          <option value="SimHei">黑体</option>
          <option value="Microsoft-YaHei">微软雅黑</option>
          <option value="KaiTi">楷体</option>
          <option value="FangSong">仿宋</option>
          <option value="Arial">Arial</option>
          <option value="Times-New-Roman">Times-New-Roman</option>
        </select>
        <select class="ql-size" style="width: 80px;">
          <option selected></option>
          <option value="10px">10px</option>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
          <option value="36px">36px</option>
        </select>
      </span>
      <span class="ql-formats">
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
        <button class="ql-strike"></button>
      </span>
      <span class="ql-formats">
        <select class="ql-color"></select>
        <select class="ql-background"></select>
      </span>
      <span class="ql-formats">
        <button class="ql-script" value="sub"></button>
        <button class="ql-script" value="super"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-header" value="1"></button>
        <button class="ql-header" value="2"></button>
        <button class="ql-blockquote"></button>
        <button class="ql-code-block"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button>
        <button class="ql-indent" value="-1"></button>
        <button class="ql-indent" value="+1"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-direction" value="rtl"></button>
        <select class="ql-align"></select>
      </span>
      <span class="ql-formats">
        <button class="ql-link" title="链接引入"></button>
        <button class="ql-image"></button>
        <button class="ql-clean"></button>
      </span>
    </div>

    <div id="editor" ref="editor">
      <!-- 富文本内容区 -->
    </div>
  </section>
</template>

<script>
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";


import "./font.css";

import Upload from "@/api/upload";


const Font = Quill.import("formats/font");
const FontSizeStyle = Quill.import("attributors/style/size");
FontSizeStyle.whitelist = [
  "10px",
  "12px",
  "14px",
  "16px",
  "20px",
  "24px",
  "36px",
  false
];
const fonts = [
  "SimSun",
  "SimHei",
  "Microsoft-YaHei",
  "KaiTi",
  "FangSong",
  "Arial",
  "Times-New-Roman",
  false
];
Font.whitelist = fonts; // 将字体加入到白名单
Quill.register(Font, true);
Quill.register(FontSizeStyle, true);
var quill = (window.quill = Quill);
export default {
  props: {
    content: {
      type: String,
      default: ""
    },
    // 监听文本编辑器变化事件
    change: {
      type: Function,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      _content: "",
      rangeIndex: null,
      quill: null,
      tempType: "",
      isLoading: false
    };
  },
  created() {},
  mounted() {
    this.init();
  },

  methods: {
    init() {
      this.quill = new Quill("#editor", {
        modules: {
          toolbar: {
            container: "#toolbar",
            handlers: {
              // image upload and insert quill
              image: value => {
                if (value) {
                  this.tempType = "image";
                  const inputEle = document.createElement("input");
                  inputEle.type = "file";
                  inputEle.click();
                  inputEle.onchange = e => this.onInputChange(e.path[0].files);
                }
              },
            }
          },
        },
        placeholder: "请输入文本内容...",
        theme: "snow"
      });

      if (this.content) {
        this.quill.pasteHTML(this.content);
      }

      this.quill.on("text-change", (delta, oldDelta, source) => {
        let html = this.$refs.editor.children[0].innerHTML;
        const quill = this.quill;
        const text = quill.getText();
        this._content = html;
        if (html === "<p><br></p>") {
          html = "";
        }
        this.rangeIndex = delta.ops[0].retain + 1;
        this.change({ html, text, quill });
      });

      // 监听鼠标选择事件
      this.quill.on("selection-change", (range, oldRange, source) => {
        // 保存用户鼠标所在的index
        if (source === "user") {
          this.rangeIndex = range ? range.index : oldRange.index;
        }
      });

      this.pasteImageFunc();
    },
    // 监听 quill 编辑器 事件
    pasteImageFunc: function() {
      const quill = this.quill;
      let _this = this;
      quill.root.addEventListener(
        "paste",
        function(e) {
          let index = quill.selection.savedRange.index;
          if (!(e.clipboardData && e.clipboardData.items)) {
            return;
          }
          let f = [];
          for (var i = 0, len = e.clipboardData.items.length; i < len; i++) {
            var item = e.clipboardData.items[i];

            if (item.kind === "string") {
              // item.getAsString(function (str) {
              //     console.log(str);
              // })
            } else if (item.kind === "file") {
              f[0] = item.getAsFile();
              _this.imageUpload(f);
            }
          }
        },
        false
      );

      quill.root.addEventListener(
        "drop",
        function(e) {
          let index = quill.selection.savedRange.index;
          if (!(e.dataTransfer && e.dataTransfer.items)) {
            return;
          }
          for (var i = 0, len = e.dataTransfer.items.length; i < len; i++) {
            var item = e.dataTransfer.items[i];

            if (item.kind === "string") {
              item.getAsString(function(str) {
                console.log(str);
              });
            } else if (item.kind === "file") {
              let f = [];
              f[0] = item.getAsFile();
              // vm.onInputChange(f, index)
              _this.imageUpload(f);
            }
          }
          e.preventDefault();
        },
        false
      );

      quill.root.addEventListener(
        "dropover",
        function(e) {
          e.preventDefault();
        },
        false
      );
    },
    onInputChange(files) {
      switch (this.tempType) {
        case "image":
          this.imageUpload(files);
          break;
      }
    },
    imageUpload(files) {
      let file = files[0];
      let rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
      if (!rFilter.test(file.type)) {
        this.$message.warning('请上传图片格式的文件')
        return;
      }
      this.isLoading = true;
      Upload.uploadFile(
        { file },
        res => {
          this.isLoading = false;
          if (res.ret_code === "200") {
            let range = this.quill.getSelection() || {
              index: 1
            };
            console.log('range',range);

            this.quill.insertEmbed(
              range.index,
              "image",
              res.img_path
            );
            this.quill.setSelection(range.index + 1);
          } else {
            this.$message.error('错误');
          }
        },
        err => {
          this.$message.error("服务器错误稍候刷新重试");
          console.log("err", err);
        }
      );
    },
  },
  watch: {
    content: {
      handler: function(newVal, oldVal) {
        if (this.quill) {
          if (newVal && newVal !== this._content) {
            this._content = newVal;
            this.quill.pasteHTML(newVal);
          } else if (!newVal) {
            this.quill.setText("");
          }
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="less">
  .quill-editor-wrap{
    .ql-formats{
      line-height: 24px;
    }
  }
</style>
