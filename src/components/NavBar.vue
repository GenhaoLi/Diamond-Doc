<template>
  <span class="nav-bar">
    <span><a class="clickable" @click="$router.push('/')">金刚石文档</a></span>
    <span class="search-bar">
      <el-input
        v-model="searchInput"
        class="search-input"
        placeholder="搜索文件"
        size="small"
        @change="searchFile"
        @keyup.enter.native="searchFile"
      >
        <i
          slot="suffix"
          class="el-input__icon el-icon-search clickable"
          @click="searchFile"
        ></i>
      </el-input>
    </span>
    <span class="right-end">
      <span
        >
        <NotificationIcon></NotificationIcon>
      </span>
      <span>
        <UserInfoIcon></UserInfoIcon>
      </span>
    </span>
  </span>
</template>

<script>
import UserInfoIcon from '@/components/UserInfoIcon'
import NotificationIcon from '@/components/NotificationIcon'
export default {
  name: "NavBar",
  components: { NotificationIcon, UserInfoIcon },
  data: function () {
    return {
      searchInput: "",
    }
  },
  methods: {
    searchFile() {
      // TODO
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

.search-bar {
  display: flex;
  justify-content: space-between;
  width: 25%;
}

.right-end {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 5%;
}
</style>
