<template>
  <div>
    <i class="el-icon-user clickable" @click="showUserInfo"></i>
    <el-dialog
      title="提示"
      :visible.sync="userInfoVisible"
      width="30%"
      append-to-body
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userInfoVisible = false">取 消</el-button>
        <el-button type="primary" @click="userInfoVisible = false">
          确 定
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
    }
  },
  methods: {
    showUserInfo() {
      this.userInfoVisible = true
    },
  },
}
</script>

<style scoped></style>
