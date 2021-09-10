<template>
  <div class="confirm-order">
    <nav-bar>
      <div @click="back" class="el-icon-arrow-left" slot="left"></div>
      <div class="center" slot="center">确认订单</div>
      <div @click="gotoProfile" class="el-icon-user-solid" slot="right"></div>
    </nav-bar>
    <alert>
      <div class="el-icon-warning-outline" slot="top"></div>
      <div class="text" slot="mid">请选择地址</div>
    </alert>
    <div v-if="showLogin === false" class="goto-login">
      请 <i @click="gotoProfile">登录</i>
    </div>
    <div v-else class="address">
      <div class="item">
        <span class="el-icon-location-outline"></span>
        <span class="info">
          <div class="name">
            {{ address.name }}{{ address.sex | sex }} {{ address.phone }}
          </div>
          <div class="location">{{ address.address }}</div>
        </span>
        <span class="el-icon-arrow-right"></span>
      </div>
    </div>
    <div class="arrive-time">
      <div class="left">送达时间</div>
      <div class="right">
        <div class="time">尽快送达 | 预计{{ Time }}</div>
        <div class="brand">蜂鸟专送</div>
      </div>
    </div>
    <div class="pay-way">
      <div class="way">支付方式</div>
      <div class="red-bag">红包(暂不支持)</div>
    </div>
    <div class="goods">
      <div class="shop">
        <img :src="imgBaseUrl + shopImg" alt="" />
        <div class="name">{{ shopName }}</div>
      </div>
      <div class="good" v-for="item in goods.foods" :key="item.food_id">
        <span class="food-name">{{ item.name }}{{ item.specs_name }}</span>
        <span class="price">￥{{ item.price }}</span>
      </div>
      <div class="good">
        <span class="food-name">餐盒</span>
        <span class="price">￥1</span>
      </div>
      <div class="good">
        <span class="food-name">配送费</span>
        <span class="price">￥{{ $store.state.shop_delivery_fee }}</span>
      </div>
      <div class="good">
        <span class="food-name">待支付</span>
        <span class="price">￥{{ TotalMoney }}</span>
      </div>
    </div>
    <div class="other">
      <span class="other-name">备注信息</span>
      <span class="el-icon-arrow-right"></span>
    </div>
    <div class="other">
      <span class="other-name">发票抬头</span>
      <span class="el-icon-arrow-right"></span>
    </div>
    <div class="bottom">
      <span class="money">待支付￥{{ TotalMoney }}</span>
      <span @click="pay" class="goto-pay">确定下单</span>
    </div>
  </div>
</template>

<script>
import { getAddress } from "../../axios/getLogin";
import { getShopInfo } from "../../axios/getShop";
import Alert from "../../components/alert/Alert.vue";
import NavBar from "../../components/navbar/NavBar.vue";
export default {
  components: { NavBar, Alert },
  data() {
    return {
      address: {}, //用户第一个地址
      deliveryTime: 20, //配送时间 接口处未找到 写死
      imgBaseUrl: "//elm.cangdu.org/img/", // 商家logo基本地址
      shopImg: "", // 商家地址
      shopName: "", // 商家名称
    };
  },
  computed: {
    showLogin() {
      if (window.localStorage.getItem("user_id")) {
        return true;
      } else {
        return false;
      }
    },
    // 当前时间的20分钟后
    Time() {
      let time = new Date().getTime();
      let willTime = parseInt(time) + 20 * 1000 * 60;
      let date = new Date(willTime);
      let h = date.getHours();
      let m = date.getMinutes();
      return h + ":" + m;
    },
    // 与当前商铺id相同的订单
    goods() {
      let product = this.$store.state.cartItems.find(
        (item) => item.id === this.$route.params.id
      );
      return product;
    },
    nowTime() {
      let time = new Date();
      let y = time.getFullYear();
      let M = time.getMonth() + 1;
      let d = time.getDate();
      let h = time.getHours();
      let m = time.getMinutes();
      return y + "-" + M + "-" + d + " " + h + ":" + m;
    },
    // 当前列表中所有食品的价格+餐盒费写死+配送费
    TotalMoney() {
      let money = this.goods.foods.reduce((pre, item) => {
        return pre + item.price;
      }, 0);
      return money + 1 + this.$store.state.shop_delivery_fee;
    },
  },
  filters: {
    sex(value) {
      if (value === 1) {
        return "先生";
      } else {
        return "女士";
      }
    },
  },
  created() {
    this.getAddress();
    // 获取商家信息
    getShopInfo(this.$route.params.id)
      .then((res) => {
        this.shopName = res.data.name;
        this.shopImg = res.data.image_path;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    back() {
      this.$router.back();
    },
    gotoProfile() {
      this.$router.push("/profile");
    },
    // 获取用户地址
    getAddress() {
      getAddress(window.localStorage.getItem("user_id"))
        .then((res) => {
          this.address = res.data[0];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 将订单传入购物车列表
    pay() {
      if (this.showLogin === true) {
        let payload = {};
        payload.id = this.$route.params.id;
        payload.foods = this.goods.foods;
        payload.shopImg = this.imgBaseUrl + this.shopImg;
        payload.shopName = this.shopName;
        payload.address = this.address;
        payload.arriveTime = this.Time;
        payload.totalMoney = this.TotalMoney;
        payload.nowTime = this.nowTime;
        payload.surplusTime = 15 * 60 * 1000;
        // 异步操作 定时器记录过期时间
        this.$store.dispatch("addCartList", payload);
        this.$router.push(
          "/confirmOrder/" + this.$route.params.id + "/payment"
        );
      } else {
        this.$store.commit("changeShowAlert", true);
      }
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.bottom {
  display: flex;
  color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: space-between;
  .money {
    display: inline-block;
    flex: 75%;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.9);
  }
  .goto-pay {
    padding: 10px;
    display: inline-block;
    flex: 25%;
    background-color: rgb(6, 197, 6);
  }
}
.other {
  margin-top: 10px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  .other-name {
    font-size: 14px;
  }
}
.goods {
  margin-top: 10px;
  background-color: #fff;
  .good {
    display: flex;
    padding: 10px;
    font-size: 12px;
    justify-content: space-between;
    .food-name {
      color: rgb(80, 80, 80);
    }
    .price {
      color: chocolate;
    }
  }
  .shop {
    display: flex;
    padding: 10px;
    align-items: center;
    border-bottom: 1px solid #eee;
    img {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }
    .name {
      margin-left: 10px;
    }
  }
}
.pay-way {
  width: 100%;
  margin-top: 15px;
  background-color: #fff;
  .way {
    padding: 10px;
    font-size: 14px;
    border-bottom: 1px solid #eee;
  }
  .red-bag {
    padding: 10px;
    color: rgb(107, 107, 107);
    font-size: 12px;
  }
}
.confirm-order {
  width: 100%;
  overflow: hidden;
}
.goto-login {
  margin-top: 40px;
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 14px;
  background-color: #fff;
  i {
    color: rgb(109, 109, 255);
  }
}
.address {
  margin-top: 40px;
  .item {
    padding: 10px;
    display: flex;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    align-items: center;
    .el-icon-location-outline,
    .el-icon-arrow-right {
      width: 20px;
    }
    .info {
      flex: 1;
      .name {
        font-size: 14px;
      }
      .location {
        font-size: 12px;
        margin-top: 5px;
        color: rgb(94, 94, 94);
      }
    }
  }
}
.arrive-time {
  width: 100%;
  margin-top: 15px;
  display: flex;
  padding-left: -3px;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-left: 3px solid rgb(122, 122, 255);
  .right,
  .left {
    flex: 1;
  }
  .left {
    padding-left: 10px;
    font-size: 16px;
    font-weight: 600;
  }
  .right {
    .time {
      margin-top: 10px;
      font-size: 14px;
      color: rgb(100, 100, 255);
    }
    .brand {
      padding: 5px;
      display: inline-block;
      font-size: 12px;
      color: #fff;
      margin: 10px 0;
      border-radius: 10px;
      background-color: rgb(116, 116, 253);
    }
  }
}
</style>