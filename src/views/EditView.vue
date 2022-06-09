<template>
  <el-container>
    <el-header height="50px">
      <NavBarForEdit :title="doc.title"></NavBarForEdit>
    </el-header>
    <el-main>
      <div class="editor-wrapper">
        <editor
          api-key="33j1w9swchkuvtp0qm7e29q9dnjrx5onehxjfyrnfbo9vmkp"
          :init="{
            plugins: 'lists link image table code help word count',
          }"
          v-model="doc.document_content"
          initial-value="<p>Hello World!</p>"
        ></editor>
      </div>
      <div class="submit-button">
        <el-button type="primary" @click="saveFile" plain>保存</el-button>
      </div>
      <div class="comments">
        <el-card
          class="comment"
          v-for="comment in comments"
          :key="comment.comment_id"
        >
          <div class="comment-header" slot="header">
            <div class="comment-author">
              <!--              <img :src="comment.author.avatar" alt="">-->
              <span>{{ comment.username }}</span>
            </div>
            <div class="comment-time">{{ comment.create_time }}</div>
          </div>
          <div class="comment-content">
            <div class="comment-content-text">
              {{ comment.comment_content }}
            </div>
          </div>
        </el-card>
      </div>
      <div class="make-comment">
        <div class="comment-input">
          <el-input
            type="textarea"
            :rows="3"
            v-model="commentContent"
            placeholder="请输入评论内容"
            clearable
          ></el-input>
        </div>
      </div>
      <div class="submit-button">
        <el-button type="primary" @click="makeComment" plain>评论</el-button>
      </div>
    </el-main>
    <Auth></Auth>
  </el-container>
</template>

<script>
import UserInfoIcon from "@/components/UserInfoIcon"
import NotificationIcon from "@/components/NotificationIcon"
import NavBarForEdit from "@/components/NavBarForEdit"
import Editor from "@tinymce/tinymce-vue"
import Auth from "@/components/Auth"
export default {
  name: "EditView.vue",
  components: {
    Auth,
    NavBarForEdit,
    NotificationIcon,
    UserInfoIcon,
    editor: Editor,
  },
  data() {
    return {
      doc: {
        document_id: "default",
        title: "",
        document_content: "default",
        user_id: "default",
        create_time: "TimeStamp",
        last_modify_time: "TimeStamp",
        is_deleted: false,
        delete_time: "TimeStamp",
      },
      comments: [],
      commentContent: "",
    }
  },
  methods: {
    getFile() {
      this.$http
        .post("/doc/view", {
          user_id: this.userInfo.user_id,
          document_id: this.$route.params.fileId,
        })
        .then((response) => {
          console.log(response)
          if (!response.data.success) {
            this.$message.error("获取文件失败")
            return
          }
          this.doc = response.data.document
          if (!this.doc.document_content) {
            this.doc.document_content = "<p>Hello World!</p>"
          }
          this.$store.commit("setDocument", this.doc)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getComments() {
      this.$http
        .post("/comment/document", {
          document_id: this.$route.params.fileId,
        })
        .then((response) => {
          console.log(response)
          if (!response.data.success) {
            this.$message.error("获取评论失败")
            return
          }
          this.comments = response.data.comments
        })
        .catch((error) => {
          console.log(error)
          this.$message.error("获取评论失败")
        })
    },
    saveFile() {
      console.log(this.document_content)
      this.$http
        .post("/doc/edit", {
          user_id: this.userInfo.user_id,
          document_id: this.doc.document_id,
          document_content: this.doc.document_content,
          title: this.doc.title,
        })
        .then((response) => {
          console.log(response)
          if (!response.data.success) {
            this.$message.error(response.data.message)
            return
          }
          this.$message.success("保存文件成功")
        })
        .catch((error) => {
          console.log(error)
        })
    },
    makeComment() {
      this.$http
        .post("/comment/new", {
          user_id: this.userInfo.user_id,
          document_id: this.$route.params.fileId,
          comment_content: this.commentContent,
        })
        .then((response) => {
          console.log(response)
          if (!response.data.success) {
            this.$message.error(response.data.message)
            return
          }
          this.getComments()
          this.commentContent = ""
        })
        .catch((error) => {
          console.log(error)
          this.$message.error("评论失败")
        })
    },
  },
  mounted() {
    this.getFile()
    this.getComments()
  },
  computed: {
    userInfo() {
      return this.$store.state.user
    },
  },
}
</script>

<style scoped>
.submit-button {
  margin-top: 20px;
  width: 60%;
  display: flex;
  justify-content: right;
}

.comments {
  margin-top: 20px;
  width: 60%;
}

.make-comment {
  margin-top: 20px;
  width: 60%;
}

/deep/ .el-card {
  margin-bottom: 20px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-header {
  z-index: 100;
  display: flex;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.06) 0 1px 1px, rgba(0, 0, 0, 0.1) 0 2px 4px;
}

.editor-wrapper {
  width: 60%;
}

.el-main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/deep/ .tox-tinymce {
}
</style>
