<template>
  <span class="nav-bar">
    <span>
      <el-button-group>
        <el-button
          class="clickable"
          @click="$router.push('/workspace')"
          icon="el-icon-s-home"
          size="small"
        >
        </el-button>
        <el-button
          icon="el-icon-time"
          size="small"
          @click="showRecentDocs"
        ></el-button>
        <el-button
          icon="el-icon-plus"
          size="small"
          @click="$router.push('/edit/new')"
        ></el-button>
      </el-button-group>
    </span>
    <span class="right-end">
      <span>
        <NotificationIcon></NotificationIcon>
      </span>
      <span>
        <UserInfoIcon></UserInfoIcon>
      </span>
    </span>
  </span>
</template>

<script>
import UserInfoIcon from "@/components/UserInfoIcon"
import NotificationIcon from "@/components/NotificationIcon"
export default {
  name: "NavBarForEdit",
  components: { UserInfoIcon, NotificationIcon },
  methods: {
    showRecentDocs () {
      // TODO: show recent docs
    }
  }
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
}

.right-end {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 5%;
}

/deep/.el-button i {
  font-size: 16px;
}
</style>
