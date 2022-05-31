<template>
  <span class="nav-bar">
    <span><a class="clickable" @click="$router.push('/')">金刚石文档</a></span>
    <span class="search-bar">
          <el-input v-model="searchInput" class="search-input" placeholder="搜索文件" size="small"
                    @change="searchFile"
                    @keyup.enter.native="searchFile">
            <i slot="suffix" class="el-input__icon el-icon-search clickable" @click="searchFile"></i>
          </el-input>
    </span>
    <span class="right-end">
        <span><i class="el-icon-bell clickable"
                 @click="showNotification"></i></span>
        <span><i class="el-icon-user clickable"
                 @click="showUserInfo"></i></span>
    </span>
  </span>
</template>

<script>
export default {
  name: 'NavBar',
  data: function () {
    return {
      searchInput: ''
    }
  },
  methods: {
    searchFile () {
      // TODO
    },
    showNotification () {
      // TODO
    },
    showUserInfo () {
      // TODO
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

.search-bar {
  display: flex;
  justify-content: space-between;
  width: 25%;
}

.clickable {
  cursor: pointer;
}

.right-end {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 4%;
}
</style>
