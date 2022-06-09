<template>
  <div class="main">
    <div v-if="invitationInfo.type === 0" class="invited">
      <i class="el-icon-document inv-icon"></i>
      <div style="font-size: 30px">{{invitationInfo.title}}</div>
      <div>文档创建者：{{invitationInfo.creator}}</div>
      <div>{{invitationInfo.inviter}}邀请你加入文档协作</div>
      <el-button type="primary" @click="accept">加入并查看文档</el-button>
    </div>
    <div v-else class="invited">
      <i class="el-icon-box inv-icon"></i>
      <div style="font-size: 30px">{{invitationInfo.team}}</div>
      <div>团队创建者：{{invitationInfo.leader}}</div>
      <div>{{invitationInfo.inviter}}邀请你加入文档协作</div>
      <el-button type="primary" @click="accept">加入并查看团队</el-button>
    </div>
    <Auth></Auth>
  </div>
</template>

<script>
import Auth from "@/components/Auth.vue"
export default {
  name: "InvitedView",
  components: { Auth },
  data() {
    return {
      invitationInfo: {},
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user
    },
  },
  mounted() {
    this.getInvitationInfo()
  },
  methods: {
    getInvitationInfo() {
      this.$http
        .post("/showlink?link=" + this.$route.params.code)
        .then((res) => {
          if (!res.data.success) {
            this.$message.error(res.data.message)
            return
          }
          this.invitationInfo = res.data
        })
        .catch((err) => {
          console.log(err)
          this.$message.error("获取邀请信息失败")
        })
    },
    accept() {
      this.$http
        .post("/linked", {
          link: this.$route.params.code,
          user_id: this.userInfo.user_id,
        })
        .then((res) => {
          console.log(res)
          if (!res.data.success) {
            this.$message({
              message: res.data.message,
              type: "error",
            })
            if (res.data.message === "你已经加入该团队") {
              this.$router.push("/edit/" + this.invitationInfo.document_id)
            }
            return
          }
          this.$message({
            message: "加入成功",
            type: "success",
          })
          this.$router.push("/edit/" + this.invitationInfo.document_id)
        })
        .catch((err) => {
          console.log(err)
          this.$message({
            message: "加入失败",
            type: "error",
          })
        })
    },
  },
}
</script>

<style scoped>
.inv-icon {
  font-size: 80px;
}

.invited {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 40%;
  margin: auto;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
