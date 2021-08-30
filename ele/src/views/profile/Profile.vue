<template>
  <div class="profile">
    <nav-bar>
      <div @click="back" class="el-icon-arrow-left" slot="left"></div>
      <div class="center" slot="center">我的</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "../../components/navbar/NavBar.vue";
export default {
  components: { NavBar },
  data() {
    return {};
  },
  created() {},
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
</style>