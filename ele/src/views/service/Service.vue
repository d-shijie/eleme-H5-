<template>
  <div class="service">
    <nav-bar>
      <div @click="back" class="el-icon-arrow-left" slot="left"></div>
      <div class="center" slot="center">服务中心</div>
    </nav-bar>
    <div class="top">
      <a
        href="https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=1&rsv_idx=1&tn=48021271_11_hao_pg&wd=%E9%A5%BF%E4%BA%86%E4%B9%88%E5%AE%A2%E6%9C%8D%E5%8F%B7%E7%A0%81&fenlei=256&oq=%25E9%25A5%25BF%25E4%25BA%2586%25E4%25B9%2588%25E5%25AE%25A2%25E6%259C%258D&rsv_pq=8ae3a8fe000449a1&rsv_t=c726ime8aQh%2BmzKZXp3mp4002WUH8Y3gFwZrxxwmCLolZMmyuPN1QzUhCh1jPSd9q6BBsue4opli&rqlang=cn&rsv_dl=ts_6&rsv_enter=1&rsv_btype=t&rsv_sug3=12&rsv_sug1=3&rsv_sug7=100&rsv_sug2=1&prefixsug=%25E9%25A5%25BF%25E4%25BA%2586%25E4%25B9%2588%25E5%25AE%25A2%25E6%259C%258D&rsp=6&rsv_sug4=4461&rsv_sug=1"
        class="robot"
      >
        <span class="el-icon-headset"></span>
        <span>机器服务</span>
      </a>
      <a href="tel:13658229170" class="human">
        <span class="el-icon-service"></span>
        <span>人工服务 </span>
      </a>
    </div>
    <div class="header">热门问题</div>
    <div class="issue">
      <div class="text">问题1</div>
      <div class="el-icon-arrow-right"></div>
    </div>
    <div class="issue">
      <div class="text">问题2</div>
      <div class="el-icon-arrow-right"></div>
    </div>
    <div class="issue">
      <div class="text">问题3</div>
      <div class="el-icon-arrow-right"></div>
    </div>
    <div class="issue">
      <div class="text">问题4</div>
      <div class="el-icon-arrow-right"></div>
    </div>
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
.top {
  margin-top: 40px;
  display: flex;
  background-color: #fff;
  .robot,
  .human {
    height: 80px;
    line-height: 80px;
    text-align: center;
    border-left: 1px solid #eee;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
.header {
  padding: 5px;
}
.issue {
  background-color: #fff;
  padding: 10px 5px;
  display: flex;
  border-bottom: 1px solid #eee;
  justify-content: space-between;
}
a {
  text-decoration: none;
}
</style>