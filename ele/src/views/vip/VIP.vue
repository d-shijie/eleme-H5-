<template>
  <div class="vip">
    <nav-bar>
      <div @click="back" class="el-icon-arrow-left" slot="left"></div>
      <div class="center" slot="center">会员中心</div>
    </nav-bar>
    <header>
      为账户<em> {{ $store.state.userInfo.username }} </em>购买会员
    </header>
    <div class="powers">
      <div class="title">会员特权</div>
      <div class="power">
        <img src="../../assets/images/other/sheng.jpeg" alt="" />
        <div class="desc">
          <div class="sub">减免配送费</div>
          <div class="detail">每月减免30单，每天可减3单</div>
        </div>
      </div>
      <div class="power">
        <img src="../../assets/images/other/jifen.jpeg" alt="" />
        <div class="desc">
          <div class="sub">减免配送费</div>
          <div class="detail">每月减免30单，每天可减3单</div>
        </div>
      </div>
    </div>
    <div class="buy-vip">
      <section>开通会员</section>
      <section class="buy">
        <div class="count">1个月 <i>￥20</i></div>
        <button @click="buy">购买</button>
      </section>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/navbar/NavBar.vue";
export default {
  data() {
    return {};
  },
  components: {
    NavBar,
  },
  created() {},
  methods: {
    back() {
      this.$router.back();
    },
    buy() {
      this.$router.push("/vip/payment");
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
header {
  margin-top: 40px;
  font-size: 14px;
  padding: 5px;
  color: rgb(150, 150, 150);
  em {
    color: #000;
  }
}
.powers {
  font-size: 14px;
  background-color: #fff;
  .title {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  .power {
    padding: 10px;
    display: flex;
    border-bottom: 1px solid #eee;
    img {
      width: 40px;
    }
    .desc {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .detail {
        font-size: 12px;
        color: #ccc;
      }
    }
  }
}
.buy-vip {
  background-color: #fff;
  margin-top: 15px;
  section {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  .buy {
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
      font-size: 12px;
      border-radius: 10px;
      border-color: rgb(223, 255, 149);
      color: rgb(212, 255, 112);
      background-color: #fff;
      padding: 5px 10px;
    }
  }
}
.count i {
  font-weight: 600;
  color: rgb(255, 80, 80);
}
</style>