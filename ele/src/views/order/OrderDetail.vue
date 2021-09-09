<template>
  <div class="">
    <nav-bar>
      <div @click="back" class="el-icon-arrow-left" slot="left"></div>
      <div class="center" slot="center">订单详情</div>
    </nav-bar>
    <div class="top">
      <img :src="info.shopImg" alt="" />
      <div class="time">{{ info.surplusTime | surplusTime }}</div>
      <div class="once">
        <el-button @click="payOnce" type="primary" size="mini"
          >再来一单</el-button
        >
      </div>
    </div>
    <div class="mid">
      <div class="shop-info">
        <span class="shop-img"><img :src="info.shopImg" alt="" /></span>
        <span class="shop-name">{{ info.shopName }}</span>
        <span class="el-icon-arrow-right"></span>
      </div>
      <div class="foods">
        <div class="food" v-for="item in info.foods" :key="item.food_id">
          <span class="food-name">{{ item.name }}</span>
          <span class="price">￥{{ item.price }}</span>
        </div>
      </div>
      <div class="fee">
        <span class="dilivery-fee"
          >配送费 ￥{{ $store.state.shop_delivery_fee }}</span
        >
        <span class="other-fee">餐盒费 ￥1</span>
      </div>
      <div class="money">
        <span>实付￥{{ info.totalMoney }}</span>
      </div>
    </div>
    <div class="bottom">
      <header>配送信息</header>
      <div class="arrive-time">送达时间: {{ info.arriveTime }}</div>
      <div class="name">联系人:{{ info.address.name }}</div>
      <div class="phone">联系电话: {{ info.address.phone }}</div>
      <div class="address">送货地址: {{ info.address.address }}</div>
      <div class="way">蜂鸟专送</div>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/navbar/NavBar.vue";
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: { NavBar },
  data() {
    return {};
  },
  filters: {
    surplusTime(value) {
      if (value === 0) {
        return "支付超时";
      } else {
        let date = new Date(value);
        let m = (date.getMinutes() + "").padStart(2, 0);
        let s = (date.getSeconds() + "").padStart(2, 0);
        return m + ":" + s;
      }
    },
  },
  created() {},
  methods: {
    back() {
      this.$store.commit("setShowOrder", true);
      this.$router.back();
    },
    payOnce() {
      this.$router.push("/shop/" + this.info.id);
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.bottom {
  margin-bottom: 50px;
  background-color: #fff;
  margin-top: 10px;
  header {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  div {
    font-size: 13px;
    color: rgb(124, 124, 124);
    padding: 10px;
  }
}
.mid {
  margin-top: 10px;
  background-color: #fff;
  div {
    border-bottom: 1px solid #eee;
  }
  .shop-info {
    display: flex;
    padding: 10px;
    align-items: center;
    justify-content: space-between;
    .shop-name {
      flex: 1;
      margin-left: 10px;
      font-weight: 600;
    }
    .shop-img {
      img {
        width: 30px;
        height: 30px;
      }
    }
  }
  .foods {
    .food {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      .food-name {
        font-size: 13px;
      }
      .price {
        font-size: 13px;
        color: rgb(255, 129, 129);
      }
    }
  }
  .fee {
    padding: 10px;
    span {
      font-size: 13px;
      color: rgb(126, 126, 126);
      margin-right: 10px;
    }
  }
  .money {
    padding: 10px;
    text-align: right;
    span {
      color: red;
    }
  }
}
.top {
  margin-top: 40px;
  background-color: #fff;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    margin: 10px 0;
  }
  .time {
    font-size: 24px;
    font-weight: 600;
  }
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
}
</style>