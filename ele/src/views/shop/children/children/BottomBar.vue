<template>
  <div v-if="$store.state.showCartBar" class="bottom-bar">
    <div class="title">
      <span>购物车</span>
      <span @click="clear" class="el-icon-delete">清空</span>
    </div>
    <div class="goods">
      <div class="good" v-for="item in goods.foods" :key="item.food_id">
        <span class="name"> {{ item.name + item.specs_name }}</span>
        <span class="price">￥{{ item.price }}</span>
        <span @click="sub(item.food_id)" class="el-icon-remove-outline"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    goods() {
      return this.$store.state.cartItems.find(
        (item) => item.id === this.$route.params.id
      );
    },
  },
  created() {},
  methods: {
    clear() {
      this.$store.commit("clearCart", this.$route.params.id);
      this.$store.commit("setShowCartBar", false);
    },
    sub(id) {
      this.$store.commit("subCart", { id: this.$route.params.id, food_id: id });
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.bottom-bar {
  width: 100%;
  position: fixed;
  background-color: #fff;
  bottom: 40px;
  z-index: 10;
  .title {
    color: rgb(92, 92, 92);
    padding: 10px;
    background-color: #f2f2f2;
    font-size: 12px;
    justify-content: space-between;
    display: flex;
  }
  .goods {
    .good {
      color: #000;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      .name {
        font-size: 14px;
        font-weight: 600;
      }
      .price {
        font-size: 12px;
        font-weight: 600;
        color: rgb(255, 126, 126);
      }
    }
  }
}
</style>