<template>
  <div class="order">
    <div v-if="$store.state.showOrder" class="order-view">
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
      >
        <ul class="cart-list">
          <li
            @click="gotoDetail(item)"
            v-for="(item, index) in $store.state.cartList"
            :key="index"
          >
            <div class="shop-info">
              <span class="img"><img :src="item.shopImg" alt="" /></span>
              <span class="info">
                <div class="shop-name">{{ item.shopName }}</div>
                <div class="order-time">{{ item.nowTime }}</div>
              </span>
              <span class="surplus-time">{{
                item.surplusTime | surplusTime
              }}</span>
            </div>
            <div class="foods">
              <span class="food">{{ item.foods[0].name }}</span>
              <span class="money">￥{{ item.totalMoney }}</span>
            </div>
            <div class="bottom">
              <el-button
                type="primary"
                size="mini"
                @click="payOnce($event, item)"
                >再来一单</el-button
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
    <router-view :info="item" class="view"></router-view>
  </div>
</template>

<script>
import NavBar from "../../components/navbar/NavBar.vue";
export default {
  components: { NavBar },
  data() {
    return {
      loading: true,// 页面加载
      item: {},//订单项
    };
  },
  destroyed() {
    //显示订单页
    this.$store.commit("setShowOrder", true);
  },
  created() {
    // 页面加载时间
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  filters: {
    // 剩余支付时间
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

  methods: {
    back() {
      this.$router.back();
    },
    // 点击再来一单触发冒泡跳转错误页面 阻止冒泡
    payOnce(e, item) {
      e.stopPropagation();
      this.$router.push("/shop/" + item.id);
    },
    gotoDetail(item) {
      this.item = item;
      this.$store.commit("setShowOrder", false);
      this.$router.push("/order/orderDetail");
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.box {
  position: relative;
  width: 100%;
  height: 100vh;
  .view {
    .hello {
      width: 100%;
      height: 200px;
      background-color: red;
      margin-top: 40px;
    }
  }
  .cart-list {
    margin-top: 40px;
    li {
      padding: 10px 0 30px 0;
      margin-bottom: 10px;
      background-color: #fff;
      .shop-info {
        padding: 10px 10px;
        display: flex;
        border-bottom: 1px solid #eee;
        .img {
          img {
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }
        }
        .surplus-time {
          font-size: 13px;
        }
        .info {
          flex: 1;
          margin-left: 10px;
          .shop-name {
            font-size: 14px;
          }
          .order-time {
            color: rgb(112, 112, 112);
            margin-top: 5px;
            font-size: 12px;
          }
        }
      }
      .foods {
        display: flex;
        margin-left: 40px;
        padding: 10px;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        .food {
          font-size: 12px;
          color: rgb(117, 117, 117);
        }
        .money {
          font-size: 12px;
          color: rgb(255, 102, 102);
          font-weight: 600;
        }
      }
      .bottom {
        padding: 10px;
        .el-button {
          float: right;
        }
      }
    }
  }
}
</style>