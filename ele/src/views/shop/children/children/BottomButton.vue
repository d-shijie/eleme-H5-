<template>
  <div class="bottom-button">
    <alert>
      <div class="el-icon-error" slot="top"></div>
      <div class="mid" slot="mid">还差{{ text }}元起送</div>
    </alert>
    <bottom-bar></bottom-bar>
    <span class="logo">
      <i v-if="products">{{ length }}</i>
      <img
        @click="showCartBar"
        class="img"
        v-if="products"
        src="../../../../assets/images/cart/购物车-fill.png"
        alt=""
      />
      <img v-else src="../../../../assets/images/cart/购物车空.png" alt="" />
    </span>
    <span class="price">
      <div class="count">
        ￥ <span v-if="products">{{ price }}</span
        ><span v-else>0.00</span>
      </div>
      <div class="fee">配送费￥{{ $store.state.shop_delivery_fee }}</div>
    </span>
    <button ref="btn" @click="pay" class="delivery">去结算</button>
  </div>
</template>

<script>
import Alert from "../../../../components/alert/Alert.vue";
import BottomBar from "./BottomBar.vue";
export default {
  components: { Alert, BottomBar },
  data() {
    return {
      text: 0,
    };
  },
  created() {},
  mounted() {},
  activated() {},
  computed: {
    products() {
      let product = this.$store.state.cartItems.find(
        (item) => item.id === this.$route.params.id
      );
      return product;
    },
    length() {
      return this.products.foods.length;
    },
    price() {
      return this.$store.getters.price(this.$route.params.id);
    },
  },
  methods: {
    showCartBar() {
      this.$store.commit("setShowCartBar", true);
    },
    pay() {
      if (this.price >= this.$store.state.float_minimum_order_amount) {
        this.$router.push("/confirmOrder/" + this.$route.params.id);
      } else {
        this.text = this.$store.state.float_minimum_order_amount - this.price;
        this.$store.commit("changeShowAlert", true);
      }
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */

.bottom-button {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: fixed;
  height: 40px;
  z-index: 1000;
  background-color: rgb(83, 83, 83);
  bottom: 0;
  color: #fff;
  i {
    position: absolute;
    top: -10px;
    color: #fff;
    left: 40px;
    font-size: 10px;
    width: 15px;
    border-radius: 50%;
    height: 15px;
    text-align: center;
    line-height: 15px;
    background-color: rgb(138, 111, 255);
    z-index: 1000;
  }
  img {
    position: absolute;
    top: -10px;
    z-index: 100;
    padding: 5px;
    border-radius: 50%;
    border: 2px solid #eee;
    width: 30px;
    left: 10px;
    background-color: rgb(83, 83, 83);
  }
}
.price {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .count {
    font-size: 16px;
    font-weight: 600;
  }
}
.delivery {
  line-height: 30px;
  width: 70px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  background-color: rgb(170, 170, 170);
  padding: 5px 10px;
}
.paybgc {
  background-color: rgb(96, 255, 96);
}
.mid {
  color: #000;
}
.fee {
  font-size: 12px;
}
.img {
  background-color: rgb(116, 116, 255);
}
</style>