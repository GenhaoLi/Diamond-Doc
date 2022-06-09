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
            <el-popover placement="bottom" trigger="click" append-to-body>
              <el-button type="primary" plain slot="reference">
                新建文档
              </el-button>
              <div class="new-doc-name">
                <el-input
                  v-model="newDocTitle"
                  placeholder="文档名称"
                  style="margin: 0 10px 10px 0; width: 140px"
                ></el-input>
                <div>
                  <el-button @click="createDoc" type="primary"> 新建</el-button>
                </div>
              </div>
              <div>
                <el-select :value="template_id" placeholder="请选择模板">
                  <el-option value="" label="不使用模板"></el-option>
                  <el-option
                    v-for="template in templates"
                    :key="template.template_id"
                    :label="template.template_name"
                    :value="template.template_id"
                  ></el-option>
                </el-select>
              </div>
            </el-popover>
          </div>
          <el-menu
            :collapse="false"
            class="el-menu-vertical-demo"
            :router="true"
            default-active="recent"
            @close=""
            @open=""
          >
            <el-menu-item index="recent"
              ><i class="el-icon-time"></i>最近文件
            </el-menu-item>
            <el-menu-item index="files"
              ><i class="el-icon-folder"></i><span slot="title">我的文件</span>
            </el-menu-item>
            <el-menu-item index="collaborative_files"
              ><i class="el-icon-suitcase"></i><span slot="title">协作文档</span>
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
      template_id: "",
      templates: [],
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
  mounted() {
    this.getTemplates()
  },
  methods: {
    getTemplates() {
      this.$http
        .get("/template/all")
        .then((res) => {
          if (!res.data.success) {
            this.$message.error(res.data.message)
            return
          }
          this.templates = res.data.documentList
        })
        .catch((err) => {
          console.log(err)
          this.$message.error("获取模板失败")
        })
    },
    createDoc() {
      if (this.template_id !== "") {
        this.createDocWithTemplate()
        return
      }
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
    createDocWithTemplate() {
      this.$http({
        method: "post",
        url: "/doc/new/template",
        data: {
          title: this.newDocTitle,
          user_id: this.userInfo.user_id,
          template_id: this.template_id,
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
.new-doc-name {
  display: flex;
  justify-content: space-between;
}

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
