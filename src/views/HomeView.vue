<template>
  <div class="home">
    <div class="big">
      <div>
        <i class="el-icon-document"></i>
      </div>
      <div class="brand">
        金刚石文档
      </div>
    </div>
    <div class="start">
        <div class="clickable" @click="$router.push('/workspace')">
          开始使用
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue"

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
}
</script>

<style scoped>
.big {
  display: flex;
  align-items: center;
  justify-content: center;
}

.start {
  font-size: xx-large;
  margin-top: 20px;
  color: cadetblue;
}


i {
  font-size: 200px;
  color: #8c8c8c;
}

.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.brand {
  font-size: xxx-large;
  color: #8c8c8c;
}
</style>
