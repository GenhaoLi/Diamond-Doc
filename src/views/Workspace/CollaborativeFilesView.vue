<template>
  <div>
    <el-container>
      <el-header height="50px">
        <div>协作文档</div>
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
              <i
                class="el-icon-more clickable"
                slot="reference"
                @click="setCurrentDoc(file)"
              ></i>
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
                <el-button type="text" @click="showTeamInfoDialog = true">
                  协作信息
                </el-button>
                <!--                <el-button type="text" @click="renameFile(file.document_id)">-->
                <!--                  重命名-->
                <!--                </el-button>-->
                <!--                <el-button type="text" @click="deleteFile(file.document_id)">-->
                <!--                  删除-->
                <!--                </el-button>-->
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
            </div>
            <div>
              <el-tag size="mini">可编辑</el-tag>
            </div>
            <div>
              <div class="file-info">创建者：{{ file.username }}</div>
            </div>
          </div>
        </el-card>
      </el-main>
    </el-container>
    <el-dialog
      title="协作信息"
      :visible.sync="showTeamInfoDialog"
      v-if="showTeamInfoDialog"
      width="50%"
      append-to-body
    >
      <el-table
        :data="[{ user_id: '123', username: 'lgh', authority: 1 }]"
        style="width: 100%"
        stripe
        border
        height="200"
      >
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="角色"> 创建者</el-table-column>
        <el-table-column label="权限"> 编辑 </el-table-column>
        <el-table-column label="操作" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="
                changeAuthority(scope.row.user_id, 1 - scope.row.authority)
              "
            >
              {{ scope.row.authority === 1 ? "取消编辑权限" : "设置编辑权限" }}
            </el-button>
            <el-button
              type="text"
              @click="deleteMember(scope.row.user_id)"
              style="margin-left: 10px"
            >
              移出团队
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <Invite :doc_id="toBeShared" ref="invite"></Invite>
  </div>
</template>

<script>
import Invite from "@/components/Invite"
export default {
  name: "CollaborativeFilesView",
  components: {
    Invite,
  },
  data() {
    return {
      files: [],
      isAllSelected: false,
      toBeShared: null,
      showTeamInfoDialog: false,
      currentDoc: {
        members: [
          {
            user_id: "123",
            username: "lgh",
            authority: 1,
          },
        ],
      },
    }
  },
  computed: {
    selectedFiles() {
      return this.files.filter((file) => file.is_checked)
    },
    userInfo() {
      return this.$store.state.user
    },
  },
  mounted() {
    this.getFiles()
  },
  methods: {
    setCurrentDoc(file) {
      this.currentDoc = file
    },
    getFiles() {
      this.$http
        .get("/doc/getCollaborativeDocument", {
          params: {
            user_id: this.userInfo.user_id,
          },
        })
        .then((res) => {
          if (!res.data.success) {
            this.$message.error(res.data.message)
            return
          }
          this.files = res.data.collaborativeDocumentList
        })
        .catch((err) => {
          console.log(err)
          this.$message.error("获取文档失败")
        })
    },
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
        })
        .catch((error) => {
          console.log(error)
          this.$message.error("收藏文档失败")
        })
    },
    goToEdit(doc_id) {
      this.$router.push("/edit/" + doc_id)
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
    addFileAttributes(files) {
      for (const file of files) {
        this.$set(file, "is_checked", false)
      }
      return files
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
      const file_ids = this.selectedFiles.map((file) => file.document_id)
      for (const file_id of file_ids) {
        this.deleteFile(file_id)
      }
    },
  },
}
</script>

<style scoped>
.file-info {
  font-size: 12px;
  color: #8c8c8c;
}

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
