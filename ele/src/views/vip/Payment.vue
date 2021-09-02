<template>
  <div class="pay-ment">
    <nav-bar>
      <div @click="back" class="el-icon-arrow-left" slot="left"></div>
      <div class="center" slot="center">支付中心</div>
    </nav-bar>
    <div class="time">
      <div class="text">支付剩余时间</div>
      <div class="set-time"></div>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/navbar/NavBar.vue";
export default {
  data() {
    return {
      time: null,
    };
  },
  components: {
    NavBar,
  },
  created() {},
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.time {
  margin-top: 40px;
  background-color: #fff;
  padding: 40px;
  div {
    text-align: center;
  }
  .text {
    font-size: 14px;
    color: rgb(100, 100, 100);
  }
}
</style>