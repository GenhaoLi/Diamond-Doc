<template>
  <div>
    <!--    notification el-popover-->
    <el-popover
      placement="bottom"
      title="消息通知"
      :popover-append-to-body="true"
      width="300"
      trigger="click"
    >
      <i
        class="el-icon-bell clickable"
        slot="reference"
        @click="checkNotification"
      ></i>
      <div>
        <el-card v-for="(notification, index) in notifications" :key="index">
          <div>
            {{ notification.message_content }}
          </div>
        </el-card>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "NotificationIcon",
  data() {
    return {
      notifications: [],
    }
  },
  methods: {
    checkNotification() {
      this.$http
        .get("/message/selectByReceiver", {
          params: {
            user_id: this.$store.state.user.user_id,
          },
        })
        .then((res) => {
          console.log(res)
          if (res.data.code !== 200) {
            this.$message.error(res.data.msg);
            return
          }
          this.notifications = res.data.data
        })
        .catch((err) => {
          console.log(err)
          this.$message.error("获取通知失败")
        })
    },
  },
}
</script>

<style scoped></style>
