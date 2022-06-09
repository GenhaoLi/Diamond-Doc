<template>
  <div>
    <!--    invitation dialog-->
    <el-dialog
      title="邀请协作"
      :visible.sync="inviteVisible"
      width="30%"
      append-to-body
    >
      <el-form>
        <el-form-item class="permission">
          <el-select v-model="permission" placeholder="请选择">
            <el-option label="编辑" value="edit"></el-option>
            <el-option label="只读" value="read"></el-option>
          </el-select>
          <el-button type="primary" @click="invite">生成邀请链接</el-button>
        </el-form-item>
        <el-form-item>
          <el-input v-model="inviteLink"></el-input>
          <el-button
            type="primary"
            @click="$router.push('/invited/' + inviteCode)"
            >前往邀请链接</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Invite",
  props: ["doc_id", "team_id"],
  data() {
    return {
      inviteVisible: false,
      permission: "edit",
      inviteLink: "",
      inviteCode: "",
    }
  },
  computed: {
    document_id: function () {
      return this.doc_id
    },
  },
  methods: {
    show() {
      this.inviteVisible = true
    },
    invite() {
      if (this.doc_id) {
        this.inviteToCollaboration()
      } else {
        this.inviteToTeam()
      }
    },
    inviteToTeam() {
      this.$http({
        method: "post",
        url: "/team/link",
        data: {
          team_id: this.team_id,
          user_id: this.$store.state.user.user_id,
          authority: this.permission === "edit" ? 1 : 0,
        },
      })
        .then((res) => {
          console.log(res)
          if (res.data.length < 10) {
            this.$message({
              message: res.data,
              type: "error",
            })
            return
          }
          this.inviteCode = res.data
          this.inviteLink = "http://49.233.54.160/invited/" + this.inviteCode
          this.$message({
            message: "生成邀请链接成功",
            type: "success",
          })
        })
        .catch((err) => {
          console.log(err)
          this.$message({
            message: "生成邀请链接失败",
            type: "error",
          })
        })
    },
    inviteToCollaboration() {
      this.$http
        .post("/doc/link", {
          document_id: this.document_id,
          user_id: this.$store.state.user.user_id,
          authority: this.permission === "edit" ? 1 : 0,
        })
        .then((res) => {
          console.log(res)
          if (res.data.length < 10) {
            this.$message({
              message: res.data,
              type: "error",
            })
            return
          }
          this.inviteCode = res.data
          this.inviteLink = "http://49.233.54.160/invited/" + this.inviteCode
          this.$message({
            message: "生成邀请链接成功",
            type: "success",
          })
        })
        .catch((err) => {
          console.log(err)
          this.$message({
            message: "生成邀请链接失败",
            type: "error",
          })
        })
    },
  },
}
</script>

<style scoped>
.permission .el-form-item__content {
  display: flex;
  justify-content: space-between;
}
</style>
