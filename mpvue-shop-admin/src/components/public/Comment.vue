<template>
  <section class="comment-wrap">
    <div class="crad-header">
      <div class="user-image-box">
        <img :src="userinfo.avatarUrl" alt>
      </div>
      <div class="username-box">
        <span>{{ userinfo.nickName }}</span>
        <span v-if="isOneself" class="del" @click="delCommentById(commentInfo.id)">删除</span>
      </div>
    </div>
    <div class="crad-body">
      <span class="comment-info">{{ commentInfo.content }}</span>
    </div>
    <div v-for="(childItem, childIndex) in childComments" :key="childIndex" class="child-box">
      <div class="crad-header">
        <div class="user-image-box">
          <img :src="childItem.user_info.avatarUrl" alt>
        </div>
        <div class="username-box">
          <span>{{ childItem.user_info.nickName }}</span>
          <span>回复：{{ userinfo.nickName }}</span>
          <span
            v-if="childItem.openid == openid"
            class="del"
            @click="delCommentById(childItem.id)"
          >删除</span>
        </div>
      </div>
      <div class="crad-body">
        <span class="comment-info">{{ childItem.content }}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["commentInfo"],
  data () {
    return {
      visible: false,
      content: "",
      childComments: [],
      openid: '',
    };
  },
  computed: {
    userinfo () {
      this.getTheChildComments();
      return this.commentInfo.user_info || {};
    },
    isOneself () {
      return  true

    }
  },
  created () {
  },
  methods: {
    async getTheChildComments () {
      const res = await this.$axios.get('/api/comment/childlist', {
        params: {
          farther_id: this.commentInfo.id
        }

      })
      this.childComments = res.data.data.list
    },
    async delCommentById (id) {
      // const res = await this.$axios.get('/comment/delById',
      //   {
      //     params: {
      //       comment_id: id
      //     }

      //   })
      // if (res.data.message == 'SUCCESS') {
      //   this.$parent.getCommentByIssue()
      //   this.getTheChildComments()
      // }
    }
  }
};
</script>

<style lang="less" scoped>
.comment-wrap {
  width: 100%;
  border-left: none;
  border-right: none;
  margin: 5px auto;
  box-sizing: border-box;
  padding: 0px 5px;
  background: rgb(255, 255, 255);
  .crad-header {
    height: 25px;
    display: flex;
    display: flex;
    .user-image-box {
      height: 25px;
      width: 25px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .username-box {
      width: 80%;
      color: rgb(179, 170, 170);
      font-size: 15px;
      margin-left: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .reply {
        display: inline-block;
        font-size: 10px;
        border: 1px solid rgb(224, 222, 222);
        padding: 0 3px;
      }
      .del {
        display: inline-block;
        font-size: 10px;
        border: 1px solid rgb(224, 222, 222);
        padding: 0 3px;
      }
    }
  }
  .crad-body {
    border-top: 1px solid rgb(226, 223, 223);
    .comment-title {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 4px 0px;
    }
    .comment-info {
      font-size: 14px;
      color: rgb(110, 104, 104);
      border-radius: 4px;
      padding: 4px;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
  }
  .child-box {
    padding-left: 10px;
  }
  .crad-footer {
    height: 20px;
    display: flex;
    font-size: 15px;
    color: rgb(167, 163, 163);
    line-height: 25px;
    .up-box {
      height: 100%;
    }
    .comment-box {
      margin-left: 8px;
      height: 100%;
    }
  }
}
</style>
