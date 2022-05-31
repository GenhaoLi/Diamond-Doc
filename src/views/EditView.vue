<template>
  <el-container>
    <el-header height="50px">
      <NavBarForEdit></NavBarForEdit>
    </el-header>
    <el-main>
      <div>文件id：{{ $route.params.fileId }}</div>
    </el-main>
  </el-container>
</template>

<script>
import UserInfoIcon from "@/components/UserInfoIcon"
import NotificationIcon from "@/components/NotificationIcon"
import NavBarForEdit from "@/components/NavBarForEdit"
export default {
  name: "EditView.vue",
  components: { NavBarForEdit, NotificationIcon, UserInfoIcon },
}
</script>

<style scoped>
.el-header {
  z-index: 100;
  display: flex;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.06) 0 1px 1px, rgba(0, 0, 0, 0.1) 0 2px 4px;
}
</style>
