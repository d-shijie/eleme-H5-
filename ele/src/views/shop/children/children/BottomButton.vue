<template>
  <div class="bottom-button">
    <span>
      <img src="../../../../assets/images/cart/购物车空.png" alt="" />
      <img src="../../../../assets/images/cart/购物车-fill.png" alt="" />
    </span>
    <span class="price">
      <div class="count">￥0.00</div>
      <div class="fee">配送费￥{{ $store.state.shop_delivery_fee }}</div>
    </span>
    <span class="delivery"
      >还差{{ $store.state.float_minimum_order_amount }}起送</span
    >
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
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
  z-index: 100;
  background-color: rgb(83, 83, 83);
  bottom: 0;
  color: #fff;
  img {
    position: absolute;
    top: -10px;
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
  font-size: 14px;
  background-color: rgb(170, 170, 170);
  padding: 5px 10px;
}
.fee {
  font-size: 12px;
}
</style>