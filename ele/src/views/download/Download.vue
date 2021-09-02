<template>
  <div class="download">
    <nav-bar>
      <div @click="back" class="el-icon-arrow-left" slot="left"></div>
      <div class="center" slot="center">下载</div>
    </nav-bar>
    <div class="el-icon-platform-eleme"></div>
    <el-button @click.native="alert" type="success" size="mideum"
      >下载</el-button
    >
    <alert>
      <div class="el-icon-info" slot="top"></div>
      <div class="text" slot="mid">前往APP STORE下载</div>
    </alert>
  </div>
</template>

<script>
import Alert from "../../components/alert/Alert.vue";
import NavBar from "../../components/navbar/NavBar.vue";
export default {
  data() {
    return {};
  },
  components: {
    NavBar,
    Alert,
  },
  created() {},
  methods: {
    back() {
      this.$router.back();
    },
    alert() {
      this.$store.commit("changeShowAlert", true);
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.download {
  position: relative;
}
.el-icon-platform-eleme {
  font-size: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: 200px;
  transform: translate(-50%, -50%);
  //   background-color: #fff;
}
.el-button {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: 350px;
  transform: translate(-50%, -50%);
}
</style>