<template>
  <div class="nav-bar">
    <div class="left-end">
      <el-button-group>
        <el-button
          @click="$router.push('/workspace')"
          icon="el-icon-s-home"
          size="small"
        >
        </el-button>
<!--        <el-button-->
<!--          icon="el-icon-time"-->
<!--          size="small"-->
<!--          @click="showRecentDocs"-->
<!--        ></el-button>-->
<!--        <el-button-->
<!--          icon="el-icon-plus"-->
<!--          size="small"-->
<!--          @click="$router.push('/edit/new')"-->
<!--        ></el-button>-->
      </el-button-group>
    </div>
    <div class="middle-span">
      <span class="title">{{ title }}</span>
    </div>
    <div class="right-end">
      <span>
        <NotificationIcon></NotificationIcon>
      </span>
      <span>
        <UserInfoIcon></UserInfoIcon>
      </span>
    </div>
  </div>
</template>

<script>
import UserInfoIcon from "@/components/UserInfoIcon"
import NotificationIcon from "@/components/NotificationIcon"
export default {
  name: "NavBarForEdit",
  components: { UserInfoIcon, NotificationIcon },
  props: ["title"],
  methods: {
    showRecentDocs() {
      // TODO: show recent docs
      this.$message.success("显示最近文档")
    },
  },
  computed: {
    currentDoc: function () {
      return this.$store.state.currentDoc
    },
  },
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

.left-end {
  float: left;
  flex: 4;
}

.title {
  font-size: 20px;
  margin: auto;
}

.middle-span {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 4;
  width: 400px;
  margin: auto;
  height: 100%;
}

.right-end {
  flex: 4;
  display: flex;
  align-items: center;
  justify-content: right;
  width: 50px;
}

.right-end span {
  margin-left: 15px;
}

/deep/.el-button i {
  font-size: 16px;
}
</style>
