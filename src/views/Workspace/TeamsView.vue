<template>
  <div>
    <el-container>
      <el-header height="50px">
        <div v-if="currentTeam === null">团队空间</div>
        <div v-else class="left-end">
          <div style="line-height: 100%">{{ currentTeam.name }}</div>
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            @click="checkTeamInfo"
            style="float: right; margin-right: 10px"
          >
            团队信息
          </el-button>
          <el-button
            type="text"
            @click="inviteMember(currentTeam.team_id)"
            style="float: right; margin-right: 10px"
          >
            邀请成员
          </el-button>
<!--          <el-button-->
<!--            type="text"-->
<!--            @click="leaveTeam"-->
<!--            style="float: right; margin-right: 10px"-->
<!--            v-if="currentTeam.creator_id === userInfo.user_id"-->
<!--          >-->
<!--            解散团队-->
<!--          </el-button>-->
          <el-button
            type="text"
            @click="leaveTeam"
            style="float: right; margin-right: 10px"
            v-else
          >
            退出团队
          </el-button>
        </div>
        <div class="right-end">
          <el-button
            type="primary"
            plain
            size="small"
            @click="showCreateTeamDialog = true"
            v-if="currentTeam === null"
          >
            创建团队
          </el-button>
          <el-button
            type="primary"
            plain
            size="small"
            @click="createDoc"
            v-else
          >
            新建文件
          </el-button>
        </div>
      </el-header>
      <el-main>
        <div v-if="currentTeam === null" class="team-icons">
          <el-card
            shadow="hover"
            :body-style="{ padding: '0px' }"
            v-for="team in teams"
            :key="team.team_id"
          >
            <div class="upper-right">
              <el-popover placement="right" width="100" trigger="click">
                <!--                <i class="el-icon-more clickable" slot="reference"></i>-->
                <div class="card-menu">
                  <el-button type="text" @click="inviteMember(team.team_id)">
                    邀请成员
                  </el-button>
                  <el-button type="text" @click="quitFromTeam(team.team_id)">
                    退出团队
                  </el-button>
                  <el-button type="text" @click="deleteTeam(team.team_id)">
                    删除团队
                  </el-button>
                </div>
              </el-popover>
            </div>
            <div
              class="center_wrapper clickable"
              @click="goToTeam(team.team_id)"
            >
              <div>
                <i class="el-icon-box"></i>
              </div>
              <div>
                <div class="team-name">{{ team.name }}</div>
              </div>
            </div>
          </el-card>
        </div>
        <div v-else class="file-icons">
          <el-card
            shadow="hover"
            :body-style="{ padding: '0px' }"
            v-for="folder in folders"
            :key="folder.folder_id"
          >
            <div class="upper-right">
              <el-popover placement="right" width="100" trigger="click">
                <i class="el-icon-more clickable" slot="reference"></i>
                <div class="card-menu">
                  <el-button
                    type="text"
                    @click="deleteFolder(folder.folder_id)"
                  >
                    删除
                  </el-button>
                  <!--                  <el-button-->
                  <!--                    type="text"-->
                  <!--                    @click="renameFolder(folder.folder_id)"-->
                  <!--                  >-->
                  <!--                    重命名-->
                  <!--                  </el-button>-->
                </div>
              </el-popover>
            </div>
            <div
              class="center_wrapper clickable"
              @click="goToFolder(folder.folder_id)"
            >
              <div>
                <i class="el-icon-document"></i>
              </div>
              <div>
                <div class="file-name">{{ folder.folder_name }}</div>
              </div>
            </div>
          </el-card>
          <el-card
            shadow="hover"
            :body-style="{ padding: '0px' }"
            v-for="file in docs"
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
                  <el-button type="text" @click="deleteFile(file.document_id)">
                    删除
                  </el-button>
                  <!--                  <el-button type="text" @click="renameFile(file.document_id)">-->
                  <!--                    重命名-->
                  <!--                  </el-button>-->
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
            </div>
          </el-card>
        </div>
      </el-main>
    </el-container>
    <!--    new team-->
    <el-dialog
      title="创建团队"
      :visible.sync="showCreateTeamDialog"
      width="30%"
      append-to-body
    >
      <el-form :model="newTeam">
        <el-form-item label="团队名称">
          <el-input
            v-model="newTeam.name"
            placeholder="请输入团队名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="团队描述">
          <el-input
            v-model="newTeam.introduction"
            placeholder="请输入团队描述"
          ></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button @click="showCreateTeamDialog = false">取 消</el-button>
        <el-button type="primary" @click="createTeam">确 定</el-button>
      </div>
    </el-dialog>
    <!--    team info-->
    <el-dialog
      title="团队信息"
      :visible.sync="showTeamInfoDialog"
      v-if="showTeamInfoDialog"
      width="50%"
      append-to-body
    >
      <el-form :model="currentTeam">
        <el-form-item label="团队名称">
          <el-input
            v-model="currentTeam.name"
            placeholder="请输入团队名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="团队描述">
          <el-input
            v-model="currentTeam.team_introduction"
            placeholder="请输入团队描述"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-table
        :data="currentTeam.members"
        style="width: 100%"
        stripe
        border
        height="200"
      >
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="角色">
          <template slot-scope="scope">
            {{
              scope.row.user_id === currentTeam.creator_id ? "管理员" : "成员"
            }}
          </template>
        </el-table-column>
        <el-table-column label="权限">
          <template slot-scope="scope">
            {{ scope.row.authority === 1 ? "编辑" : "只读" }}
          </template>
        </el-table-column>
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
              @click="changeAuthority(scope.row.user_id, 2)"
              style="margin-left: 10px"
              v-if="scope.user_id !== currentTeam.creator_id"
            >
              移出团队
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showTeamInfoDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateTeamInfo">确 定</el-button>
      </div>
    </el-dialog>
    <Invite :team_id="teamToBeInvitedTo" ref="invite"></Invite>
  </div>
</template>

<script>
import Invite from "@/components/Invite"
export default {
  name: "TeamsView",
  components: { Invite },
  data() {
    return {
      teams: [],
      currentTeam: null,
      currentFolder: null,
      showCreateTeamDialog: false,
      showTeamInfoDialog: false,
      newTeam: {
        name: "",
        introduction: "",
        type: false,
        document_id: "",
        user_id: this.$store.state.user.user_id,
      },
      docs: [],
      folders: [],
      isAllSelected: false,
      teamToBeInvitedTo: "",
    }
  },
  mounted() {
    this.getTeams()
  },
  computed: {
    userInfo() {
      return this.$store.state.user
    },
  },
  watch: {
    currentTeam(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getDocsAndFolders()
      }
    },
  },
  methods: {
    changeAuthority(user_id, authority) {
      this.$http
        .post("/team/changeAuthority", {
          modifier_id: this.$store.state.user.user_id,
          user_id: user_id,
          team_id: this.currentTeam.team_id,
          authority: authority,
        })
        .then(() => {
          this.checkTeamInfo()
        })
        .catch((err) => {
          console.log(err)
          this.$message.error("更改权限失败")
        })
    },
    leaveTeam() {
      this.$http
        .post("/team/leaveTeam", {
          team_id: this.currentTeam.team_id,
          user_id: this.userInfo.user_id,
        })
        .then((res) => {
          if (res.data.code !== 200) {
            this.$message.error(res.data.message)
            return
          }
          this.$message.success("退出团队成功")
          this.getTeams()
        })
        .catch((err) => {
          console.log(err)
          this.$message.error("退出团队失败")
        })
    },
    checkTeamInfo() {
      this.$http
        .post("/team/view", {
          team_id: this.currentTeam.team_id,
        })
        .then(
          (res) => {
            if (!res.data.success) {
              this.$message.error(res.data.message)
            }
            this.currentTeam = Object.assign(
              {},
              res.data.team,
              this.currentTeam,
            )
            this.currentTeam.members = res.data.teammateList
            this.showTeamInfoDialog = true
          },
          (err) => {
            console.log(err)
            this.$message.error("获取团队信息失败")
          },
        )
    },
    inviteMember(team_id) {
      this.teamToBeInvitedTo = team_id
      this.$refs.invite.show()
    },
    createDoc() {
      this.$http
        .post("/team/addTeamDocument", {
          team_id: this.currentTeam.team_id,
          user_id: this.$store.state.user.user_id,
          folder_id: this.currentFolder.folder_id,
          title: "新建文档" + (Math.random()*10).toFixed(0),
        })
        .then((res) => {
          if (res.data.code !== 200) {
            this.$message.error(res.data.message)
            return
          }
          this.$message.success("文档创建成功")
          this.getDocsAndFolders()
        })
    },
    goToEdit(document_id) {
      this.$router.push("/edit/" + document_id)
    },
    getDocsAndFolders() {
      this.$http
        .get("/folder/get", {
          params: {
            folder_id: this.currentTeam.folder_id,
          },
        })
        .then((res) => {
          if (!res.data.success) {
            this.$message.error(res.data.message)
            return
          }
          this.docs = res.data.documentList
          this.folders = res.data.folderList
          // this.$message.success("成功获取文件和文件夹")
        })
        .catch((err) => {
          console.log(err)
          this.$message.error("获取文件和文件夹失败")
        })
    },
    deleteFile(document_id) {
      this.$http
        .post("/team/deleteTeamDocument", {
          team_id: this.currentTeam.team_id,
          user_id: this.userInfo.user_id,
          document_id: document_id,
        })
        .then((response) => {
          console.log(response)
          if (response.data.code !== 200) {
            this.$message.error(response.data.message)
            return
          }
          this.$message.success("删除文档成功")
          this.getDocsAndFolders()
        })
        .catch((error) => {
          console.log(error)
          this.$message.error("删除文档失败")
        })
    },
    goToTeam(team_id) {
      for (let team of this.teams) {
        if (team.team_id === team_id) {
          this.currentTeam = team
          this.currentFolder = {
            folder_id: team.folder_id,
          }
          break
        }
      }
    },
    goToFolder(folder_id) {
      for (let folder of this.folders) {
        if (folder.folder_id === folder_id) {
          this.currentFolder = folder
          break
        }
      }
    },
    createTeam() {
      this.$http({
        url: "/team/new",
        method: "POST",
        data: this.newTeam,
      })
        .then((res) => {
          if (!res.data.success) {
            this.$message.error(res.data.message)
            return
          }
          this.$message.success("创建团队成功")
          this.getTeams()
          this.showCreateTeamDialog = false
        })
        .catch((err) => {
          console.log(err)
          this.$message.error("创建团队失败")
        })
    },
    getTeams() {
      this.$http
        .post("/team/main", {
          user_id: this.userInfo.user_id,
        })
        .then((res) => {
          this.teams = res.data.data
        })
        .catch((err) => {
          console.log(err)
          this.$message.error("获取团队列表失败")
        })
    },
  },
}
</script>

<style scoped>
.left-end {
  display: flex;
  justify-content: center;
  align-items: center;
}

.left-end .el-button {
  font-size: medium;
}

.el-icon-folder {
  font-size: 60px;
}

.file-name {
  text-align: center;
}

.file-icons {
  display: flex;
  flex-wrap: wrap;
}

/deep/ .el-icon-document {
  font-size: 60px;
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

.right-end {
  display: flex;
  justify-content: flex-end;
}

/deep/ .el-button + .el-button {
  margin-left: 0;
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

.team-name {
  text-align: center;
}

.team-icons {
  display: flex;
  flex-wrap: wrap;
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

/deep/ .el-icon-box {
  font-size: 60px;
}

.dialog-footer .el-button {
  margin-left: 10px;
}
</style>
