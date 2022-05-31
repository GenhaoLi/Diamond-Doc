<template>
  <div>
    <el-container>
      <el-header height="50px">
        <NavBar></NavBar>
      </el-header>
      <el-container class="under-header">
        <el-aside>
          <!--          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
          <!--            <el-radio-button :label="false">展开</el-radio-button>-->
          <!--            <el-radio-button :label="true">收起</el-radio-button>-->
          <!--          </el-radio-group>-->
          <div class="btn-wrapper">
              <el-button type="primary" plain
              @click="$router.push('/edit/new')">
                新建文档
              </el-button>
          </div>
          <el-menu :collapse="false" class="el-menu-vertical-demo" :router="true" default-active="files"
                   @close="null"
                   @open="null">
            <el-menu-item index="files"><i class="el-icon-folder"></i><span slot="title">我的文件</span>
            </el-menu-item>
            <el-menu-item index="teams"><i class="el-icon-box"></i><span slot="title">团队空间</span>
            </el-menu-item>
            <el-menu-item index="favorites"><i class="el-icon-star-off"></i><span slot="title">我的收藏</span>
            </el-menu-item>
            <el-menu-item index="trash"><i class="el-icon-delete"></i><span slot="title">回收站</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: 'WorkspaceView',
  components: { NavBar }
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
  /*left align*/
  text-align: left;
}

.btn-wrapper {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.btn-wrapper > .el-button {
  width: 100%;
}

</style>
