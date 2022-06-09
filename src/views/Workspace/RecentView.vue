<template>
  <div class="recent">
    <el-container>
      <el-header height="50px">
        <div>最近文件</div>
      </el-header>
      <el-main class="file-icons">
        <el-card
          shadow="hover"
          :body-style="{ padding: '0px' }"
          v-for="file in files"
          :key="file.document_id"
        >
          <div class="upper-right">
            <el-popover placement="right" width="100" trigger="click">
              <i class="el-icon-more clickable" slot="reference"></i>
              <div class="card-menu">
                <el-button type="text" @click="goToEdit(file.document_id)">
                  编辑
                </el-button>
                <el-button type="text" @click="deleteFile(file.document_id)">
                  删除
                </el-button>
                <el-button type="text" @click="shareFile(file.document_id)">
                  协作
                </el-button>
                <el-button type="text" @click="renameFile(file.document_id)">
                  重命名
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
  name: "RecentView",
  components: { Invite },
  data() {
    return {
      files: [],
      toBeShared: "",
    }
  },
  methods: {
    goToEdit(document_id) {
      this.$router.push("/edit/" + document_id)
    },
    getRecentFiles() {
      this.$http
        .post("/doc/recent?user_id=" + this.$store.state.user.user_id)
        .then((response) => {
          console.log(response)
          if (!response.data.success) {
            this.$message.error("获取最近文档列表失败")
            return
          }
          this.files = response.data.list
          this.$message.success("成功获取最近文档列表")
        })
        .catch((error) => {
          console.log(error)
          this.$message.error("获取最近文档列表失败")
        })
    },
  },
  mounted() {
    this.getRecentFiles()
  },
}
</script>

<style scoped>
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
  width: 200px;
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
