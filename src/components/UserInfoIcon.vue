<template>
  <div>
    <i class="el-icon-user clickable" @click="showUserInfo"></i>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  methods: {
    showUserInfo() {
      // TODO
      this.$message({
        message: '点击了用户信息',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>

</style>
