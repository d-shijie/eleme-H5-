<template>
  <div class="order">
    <nav-bar>
      <div @click="back" class="el-icon-arrow-left" slot="left"></div>
      <div class="center" slot="center">订单</div>
    </nav-bar>
    <div
      class="box"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    ></div>
  </div>
</template>

<script>
import NavBar from "../../components/navbar/NavBar.vue";
export default {
  components: { NavBar },
  data() {
    return {
      loading: true,
    };
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },

  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.box {
  width: 100%;
  height: 100vh;
  background-color: #fff;
}
</style>