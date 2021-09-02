<template>
  <div class="reset-username">
    <nav-bar>
      <div @click="back" class="el-icon-arrow-left" slot="left"></div>
      <div class="center" slot="center">修改用户名</div>
    </nav-bar>
    <el-input size="mini" v-model="value" placeholder="输入用户名"></el-input>
    <el-button @click="reset" size="mini" type="primary">修改</el-button>
  </div>
</template>

<script>
import NavBar from "../../../components/navbar/NavBar.vue";
export default {
  components: { NavBar },
  data() {
    return {
      value: "",
    };
  },
  created() {},
  methods: {
    back() {
      this.$store.commit("changeShowInfoChildren", true);
      this.$router.back();
    },
    reset() {
      this.$store.commit("resetUsername", this.value);
      this.back();
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.el-input {
  margin-top: 50px;
}
.el-button {
  margin: 10px 0;
  width: 100%;
}
</style>