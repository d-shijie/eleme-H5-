<template>
  <div id="app">
    <router-view></router-view>
    <main-tab-bar v-if="show"></main-tab-bar>
  </div>
</template>
<script>
import MainTabBar from "./components/tabbar/MainTabBar.vue";
export default {
  components: { MainTabBar },
  computed: {
    show() {
      return (
        this.$route.path.indexOf("/main") != -1 ||
        this.$route.path.indexOf("/search") != -1 ||
        this.$route.path.indexOf("/order") != -1 ||
        this.$route.path.indexOf("/profile") != -1
      );
    },
  },
};
</script>
<style lang="less">
@import url("./assets/css/normalize.css");
#app {
  
}
body {
  background-color: #f2f2f2;
}
</style>
