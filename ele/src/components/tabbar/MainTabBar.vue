<template>
  <div class="main-tab-bar">
    <tab-bar>
      <tab-bar-item :path="mainPath">
        <div slot="item-icon">
          <img src="../../assets/images/tabbar/home.png" alt="" />
        </div>
        <div slot="item-active">
          <img src="../../assets/images/tabbar/home_activiti.png" alt="" />
        </div>
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item :path="searchPath">
        <div slot="item-icon">
          <img src="../../assets/images/tabbar/category.png" alt="" />
        </div>
        <div slot="item-active">
          <img src="../../assets/images/tabbar/category_activity.png" alt="" />
        </div>
        <div slot="item-text">搜索</div>
      </tab-bar-item>
      <tab-bar-item path="/order">
        <div slot="item-icon">
          <img src="../../assets/images/tabbar/buy.png" alt="" />
        </div>
        <div slot="item-active">
          <img src="../../assets/images/tabbar/buy_activiti.png" alt="" />
        </div>
        <div slot="item-text">订单</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <div slot="item-icon">
          <img src="../../assets/images/tabbar/user.png" alt="" />
        </div>
        <div slot="item-active">
          <img src="../../assets/images/tabbar/user_activiti.png" alt="" />
        </div>
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "./TabBar.vue";
import TabBarItem from "./TabBarItem.vue";
export default {
  data() {
    return {
      geohash: this.$store.state.geohash,
    };
  },
  computed: {
    mainPath() {
      return "/main/" + this.geohash;
    },
    searchPath() {
      return "/search/" + this.geohash;
    },
  },
  created() {},
  components: {
    TabBar,
    TabBarItem,
  },
  methods: {},
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.tab-bar-item img {
  width: 22px;
  height: 22px;
  margin-top: 2px;
}
.tab-bar-item {
  font-size: 12px;
}
</style>