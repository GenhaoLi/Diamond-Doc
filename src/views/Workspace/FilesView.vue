<template>
  <div class="files">
    <!--    <img src="https://49.233.54.160:8081/image/1.png" alt="avatar" />-->
    <el-container>
      <el-header height="50px">
        <div>我的文件</div>
        <div class="right-end">
          <div class="header-buttons" v-if="selectedFiles.length !== 0">
            <el-button
              type="danger"
              size="small"
              plain
              @click="deleteSelectedFiles"
              >删除</el-button
            >
            <el-divider direction="vertical"></el-divider>
          </div>
          <!--          select all-->
          <el-checkbox v-model="isAllSelected" @change="handleSelectAll">
            全选
          </el-checkbox>
        </div>
      </el-header>
      <el-main class="file-icons">
        <el-card
          shadow="hover"
          :body-style="{ padding: '0px' }"
          v-for="file in files"
          :key="file.document_id"
        >
          <div class="upper-left">
            <el-checkbox
              :key="file.document_id + file.is_checked"
              :checked="file.is_checked"
              v-model="file.is_checked"
            ></el-checkbox>
          </div>
          <div class="upper-right">
            <el-popover placement="right" width="100" trigger="click">
              <i class="el-icon-more clickable" slot="reference"></i>
              <div class="card-menu">
                <el-button type="text" @click="goToEdit(file.document_id)">
                  编辑
                </el-button>
                <el-button type="text" @click="favFile(file.document_id)">
                  收藏
                </el-button>
                <el-button type="text" @click="shareFile(file.document_id)">
                  邀请协作
                </el-button>
                <el-button type="text" @click="renameFile(file.document_id)">
                  重命名
                </el-button>
                <el-button type="text" @click="deleteFile(file.document_id)">
                  删除
                </el-button>
              </div>
            </el-popover>
          </div>
          <div
            class="center_wrapper clickable"
            @click="goToEdit(file.document_id)"
          >
            <div>
              <i class="el-icon-document"></i>
            </div>
            <div>
              <div class="file-name">{{ file.title }}</div>
              <!--          TODO: when title too long -->
            </div>
          </div>
        </el-card>
      </el-main>
    </el-container>
    <Invite :doc_id="toBeShared" ref="invite"></Invite>
  </div>
</template>

<script>
import Invite from "@/components/Invite"

export default {
  name: "FilesView",
  components: { Invite },
  data() {
    return {
      files: [],
      isAllSelected: false,
      toBeShared: "",
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user
    },
    selectedFiles() {
      return this.files.filter((file) => file.is_checked)
    },
  },
  methods: {
    favFile(doc_id) {
      this.$http
        .post("/collection/new", {
          user_id: this.userInfo.user_id,
          document_id: doc_id,
        })
        .then((response) => {
          console.log(response)
          if (!response.data.success) {
            this.$message.error("收藏文档失败")
            return
          }
          this.$message.success("收藏文档成功")
        }).catch((error) => {
          console.log(error)
          this.$message.error("收藏文档失败")
        })
    },
    shareFile(document_id) {
      this.toBeShared = document_id
      this.$refs.invite.show()
    },
    handleSelectAll() {
      this.files.forEach((file) => {
        this.$set(file, "is_checked", this.isAllSelected)
      })
    },
    goToEdit(document_id) {
      this.$router.push("/edit/" + document_id)
    },
    addFileAttributes(files) {
      for (const file of files) {
        this.$set(file, "is_checked", false)
      }
      return files
    },
    getFiles() {
      this.$http
        .post("/doc/user/all?user_id=" + this.$store.state.user.user_id)
        .then((response) => {
          console.log(response)
          if (!response.data.success) {
            this.$message.error("获取文档列表失败")
            return
          }
          this.files = response.data.list
          this.files = this.addFileAttributes(this.files)
        })
        .catch((error) => {
          console.log(error)
          this.$message.error("获取文档列表失败")
        })
    },
    deleteFile(document_id) {
      this.$http
        .post("/doc/remove", {
          document_id: document_id,
        })
        .then((response) => {
          console.log(response)
          if (!response.data.success) {
            this.$message.error(response.data.message)
            return
          }
          this.$message.success("删除文档成功")
          this.getFiles()
        })
        .catch((error) => {
          console.log(error)
          this.$message.error("删除文档失败")
        })
    },
    deleteSelectedFiles() {
      let document_ids = this.selectedFiles.map((file) => file.document_id)
      for (const document_id of document_ids) {
        this.deleteFile(document_id)
      }
    },
  },
  mounted() {
    this.getFiles()
  },
}
</script>

<style scoped>
.right-end {
  display: flex;
  justify-content: flex-end;
}

.right-end .el-checkbox {
  margin: auto;
}

/deep/ .el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.06) 0 1px 1px, rgba(0, 0, 0, 0.1) 0 2px 4px;
}

.card-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.file-name {
  text-align: center;
}

.file-icons {
  display: flex;
  flex-wrap: wrap;
}

.upper-left {
  position: absolute;
  top: 5px;
  left: 5px;
}

.upper-right {
  position: absolute;
  right: 5px;
  top: 5px;
}

/deep/ .el-card {
  width: 150px;
  height: 150px;
  margin: 10px;
}

.center_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

/deep/ .el-card__body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: relative;
}

/deep/ .el-icon-document {
  font-size: 60px;
}

/deep/ .el-button + .el-button {
  margin-left: 0;
}
</style>
