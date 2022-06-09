<template>
  <div>
    <el-container>
      <el-header height="50px">
        <div>回收站</div>
        <div class="right-end">
          <div class="header-buttons" v-if="selectedFiles.length !== 0">
            <el-button
              type="danger"
              size="small"
              plain
              @click="wipeOutSelectedFiles"
            >彻底删除</el-button
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
          v-for="file in deletedFiles"
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
                <el-button type="text" @click="recoverFile(file.document_id)">
                  恢复
                </el-button>
                <el-button type="text" @click="wipeOutFile(file.document_id)">
                  彻底删除
                </el-button>
              </div>
            </el-popover>
          </div>
          <div class="center_wrapper">
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
  </div>
</template>

<script>
export default {
  name: "TrashView",
  components: {},
  data() {
    return {
      deletedFiles: [],
      isAllSelected: false,
    }
  },
  computed: {
    selectedFiles() {
      return this.deletedFiles.filter((file) => file.is_checked)
    },
  },
  methods: {
    handleSelectAll() {
      this.deletedFiles.forEach((file) => {
        this.$set(file, "is_checked", this.isAllSelected)
      })
    },
    addFileAttributes(files) {
      for (const file of files) {
        this.$set(file, "is_checked", false)
      }
      return files
    },
    getDeletedFiles() {
      this.$http
        .post("/doc/trashcan?user_id=" + this.$store.state.user.user_id)
        .then((response) => {
          console.log(response)
          if (!response.data.success) {
            this.$message.error("获取回收站文档列表失败")
            return
          }
          this.deletedFiles = response.data.list
          this.deletedFiles = this.addFileAttributes(this.deletedFiles)
        })
        .catch((error) => {
          console.log(error)
          this.$message.error("获取回收站文档列表失败")
        })
    },
    recoverFile(document_id) {
      this.$http
        .post("/doc/recover", {
          document_id: document_id,
        })
        .then((response) => {
          console.log(response)
          if (!response.data.success) {
            this.$message.error("恢复文档失败")
            return
          }
          this.$message.success("恢复文档成功")
          this.getDeletedFiles()
        })
        .catch((error) => {
          console.log(error)
          this.$message.error("恢复文档失败")
        })
    },
    wipeOutFile(document_id) {
      this.$http
        .post("/doc/delete", {
          document_id: document_id,
        })
        .then((response) => {
          console.log(response)
          if (!response.data.success) {
            this.$message.error("彻底删除文档失败")
            return
          }
          this.$message.success("彻底删除文档成功")
          this.getDeletedFiles()
        })
        .catch((error) => {
          console.log(error)
          this.$message.error("彻底删除文档失败")
        })
    },
    wipeOutSelectedFiles() {
      const document_ids = this.selectedFiles.map((file) => file.document_id)
      for (const document_id of document_ids) {
        this.wipeOutFile(document_id)
      }
    },
  },
  mounted() {
    this.getDeletedFiles()
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
