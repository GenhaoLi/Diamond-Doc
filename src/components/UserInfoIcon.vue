<template>
  <div>
    <i class="el-icon-user clickable" @click="showUserInfo"></i>
    <el-dialog
      title="个人信息"
      :visible.sync="userInfoVisible"
      width="30%"
      append-to-body
    >
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userInfo.password" type="password" show-password></el-input>
        </el-form-item>
<!--        TODO 修改密码时，两遍密码并检查-->
        <el-form-item label="邮箱">
          <el-input v-model="userInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input v-model="newIntro"></el-input>
        </el-form-item>
<!--        TODO 其他信息-->
<!--        TODO 上传、修改头像-->
      </el-form>
      <div></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="logout">退出登录</el-button>
        <el-button type="primary" @click="updateInfo">
          修改信息
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UserInfoIcon",
  data: function () {
    return {
      userInfoVisible: false,
      newIntro: "",
    }
  },
  methods: {
    showUserInfo() {
      this.userInfoVisible = true
    },
    updateInfo() {
      // TODO 按照接口的参数来
      let newInfo = JSON.parse(JSON.stringify(this.userInfo))
      newInfo.user_info = this.newIntro
      this.$http.post("/user/updateInfo", {
        user_info: newInfo.user_info,
        sex:0,
        birthday:null
      }).then(res => {
        console.log(res)
        if (res.data.code !== 200) {
          this.$message({
            message: res.data.message,
            type: "error"
          })
          return
        }

        this.$store.commit("setUser", newInfo)
        this.$message({
          message: "修改成功",
          type: "success"
        })
        this.userInfoVisible = false
      }).catch(err => {
        console.log(err)
        this.$message({
          message: "修改失败",
          type: "error"
        })
      })
    },
    logout() {
      this.$http({
        url: "/user/logout",
        method: "POST",
      }).then((res) => {
        console.log(res)
        this.$store.commit("setUser", null)
        sessionStorage.removeItem("uid")
        this.$message({
          message: "退出登录成功",
          type: "success",
        })
        this.$router.push("/")
      }).catch((err) => {
        console.log(err)
        this.$message({
          message: "退出登录失败",
          type: "error",
        })
      })
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.user
    },
  },
}
</script>

<style scoped></style>
