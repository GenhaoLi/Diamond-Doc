<template>
  <div>
    <el-container>
      <el-header height="50px">
        <NavBar></NavBar>
      </el-header>
      <el-container class="under-header">
        <el-aside width="250px">
          <!--          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
          <!--            <el-radio-button :label="false">展开</el-radio-button>-->
          <!--            <el-radio-button :label="true">收起</el-radio-button>-->
          <!--          </el-radio-group>-->
          <div class="btn-wrapper">
            <el-popover placement="bottom" trigger="hover">
              <el-button type="primary" plain slot="reference">
                新建文档
              </el-button>
              <el-input
                v-model="newDocTitle"
                placeholder="文档名称"
                style="margin-bottom: 10px;"
              ></el-input>
              <el-button @click="createDoc">
                新建
              </el-button>
            </el-popover>
          </div>
          <el-menu
            :collapse="false"
            class="el-menu-vertical-demo"
            :router="true"
            default-active="files"
            @close=""
            @open=""
          >
            <el-menu-item index="recent"
              ><i class="el-icon-time"></i>最近文件
            </el-menu-item>
            <el-menu-item index="files"
              ><i class="el-icon-folder"></i><span slot="title">我的文件</span>
            </el-menu-item>
            <el-menu-item index="teams"
              ><i class="el-icon-box"></i><span slot="title">团队空间</span>
            </el-menu-item>
            <el-menu-item index="favorites"
              ><i class="el-icon-star-off"></i
              ><span slot="title">我的收藏</span>
            </el-menu-item>
            <el-menu-item index="trash"
              ><i class="el-icon-delete"></i><span slot="title">回收站</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view v-if="showSubView"></router-view>
        </el-main>
      </el-container>
    </el-container>
    <Auth></Auth>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar"
import Auth from "@/components/Auth"

export default {
  name: "WorkspaceView",
  components: { Auth, NavBar },
  data() {
    return {
      newDocTitle: "",
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user
    },
    showSubView() {
      return (
        this.$store.state.user.user_id !== undefined &&
        this.$store.state.user.user_id !== null
      )
    },
  },
  watch: {},
  methods: {
    createDoc() {
      this.$http({
        method: "post",
        url: "/doc/new",
        data: {
          title: this.newDocTitle,
          user_id: this.userInfo.user_id,
        },
      })
        .then((response) => {
          console.log(response)
          if (!response.data.success) {
            this.$message.error(response.data.message)
            return
          }
          let newDoc = response.data.document
          this.$router.push("/edit/" + newDoc.document_id)
        })
        .catch((error) => {
          console.log(error)
          this.$message.error("新建文档失败")
        })
    },
  },
}
</script>

<!--suppress CssUnusedSymbol -->
<style scoped>
.el-header {
  z-index: 100;
  display: flex;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.06) 0 1px 1px, rgba(0, 0, 0, 0.1) 0 2px 4px;
}

.under-header {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 50px);
}

.el-aside {
  display: flex;
  flex-direction: column;
  border-right: solid 1px #e6e6e6;
}

.el-menu {
  border: none;
}

.el-menu-item {
  text-align: left;
}

.btn-wrapper {
  display: flex;
  justify-content: center;
  padding: 20px;
}
</style>
