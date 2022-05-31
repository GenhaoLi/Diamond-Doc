<template>
  <div>
    <i class="el-icon-bell clickable" @click="showNotification"></i>
  </div>
</template>

<script>
export default {
  name: "NotificationIcon",
  methods: {
    showNotification() {
      this.$message({
        message: '这是一条通知',
        type: 'success'
      })
    },
  },
}
</script>

<style scoped></style>
