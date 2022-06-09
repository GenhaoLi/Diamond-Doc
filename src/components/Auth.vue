<template>
  <div>
    <el-dialog
      width="25%"
      :visible.sync="showAuth"
      :show-close="false"
      :center="true"
    >
      <el-tabs v-model="activeAuthTab">
        <el-tab-pane label="登录" name="login">
          <el-form :model="form" label-width="70px">
            <el-form-item label="用户名">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                v-model="form.password"
                type="password"
                show-password
              ></el-input>
            </el-form-item>
            <div class="auth-footer">
              <el-button type="primary" @click="login">登录</el-button>
            </div>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="注册" name="reg">
          <el-form :model="form" label-width="70px">
            <el-form-item label="用户名">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                v-model="form.password"
                type="password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input
                v-model="form.confirmPassword"
                type="password"
                show-password
              ></el-input>
            </el-form-item>
            <el-alert
              type="error"
              v-if="showPasswordsDontMatch"
              :show-icon="true"
              description="两次输入的密码不一致"
            ></el-alert>
            <div class="auth-footer">
              <el-button type="primary" @click="register">注册</el-button>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div></div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Auth.vue",
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      showAuth: true,
      showPasswordsDontMatch: false,
      activeAuthTab: "login",
    }
  },
  methods: {
    login() {
      let loginForm = {
        username: this.form.username,
        password: this.form.password,
      }
      this.$http({
        url: "/user/login",
        method: "POST",
        data: loginForm,
      })
        .then((response) => {
          console.log(response)
          if (response.data.code !== 200) {
            this.$message({
              message: response.data.message,
              type: "error",
            })
            return
          }
          this.$store.commit("setUser", response.data.data)
          sessionStorage.setItem("uid", response.data.data.user_id)
          this.$message({
            message: "登录成功",
            type: "success",
          })
          this.showAuth = false
          console.log(this.$store.state.user)
        })
        .catch((error) => {
          console.log(error)
          this.$message({
            message: "登录失败",
            type: "error",
          })
        })
    },
    register() {
      if (!this.checkPassword) {
        this.showPasswordsDontMatch = true
        return
      }
      let regForm = {
        username: this.form.username,
        password: this.form.password,
        email: this.form.email,
      }
      this.$http({
        url: "/user/register",
        method: "POST",
        data: regForm,
      })
        .then((response) => {
          console.log(response)
          if (response.data.code !== 200) {
            this.$message({
              message: response.data.message,
              type: "error",
            })
            return
          }
          this.$message({
            message: "注册成功，请登录",
            type: "success",
          })
          this.activeAuthTab = "login"
        })
        .catch((error) => {
          console.log(error)
          this.$message({
            message: "注册失败",
            type: "error",
          })
        })
    },
  },
  created: function () {
    const that = this
    let uid = sessionStorage.getItem("uid")
    that.showAuth = !uid
    if (uid) {
      that.$store.commit("setUser", {
        user_id: uid,
      })
    }
  },
  computed: {
    checkPassword() {
      let match = this.form.password === this.form.confirmPassword
      if (match) {
        this.showPasswordsDontMatch = false
      }
      return match
    },
    userInfo() {
      return this.$store.state.user
    },
  },
  watch: {
    // userInfo: function (val) {
    //   if (!val.id) {
    //     this.showAuth = true
    //   }
    // },
  },
}
</script>

<style scoped>
.auth-footer {
  margin: 10px auto;
  text-align: center;
}

/deep/ .el-dialog__header {
  padding: 0;
}
</style>
