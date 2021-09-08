<template>
  <div class="add-cart">
    <span
      @click="add"
      v-if="foods.length === 1"
      class="el-icon-circle-plus-outline"
    ></span>
    <span @click="showDialog" v-else class="add">选规格</span>
  </div>
</template>

<script>
export default {
  props: {
    price: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: "",
    },
    foods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      food: {},
      goods: [],
    };
  },
  created() {},
  methods: {
    add() {
      this.food = this.foods[0];
      let payload = {};
      // let product = this.goods.find(
      //   (item) => item.food_id === this.food.food_id
      // );
      // if (product) {
      //   this.food.count += 1;
      // } else {
      //   this.food.count = 1;

      // }
      this.goods.push(this.food);
      payload.id = this.$route.params.id;
      payload.foods = this.goods;
      this.$store.commit("setCartItem", payload);
    },
    showDialog() {
      this.$store.commit("setGoodName", this.name);
      this.$store.commit("setGoodAtrs", this.foods);
      this.$store.commit("setShowDialog", true);
      this.$store.commit("setGoodPrice", this.price);
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */

.el-icon-circle-plus-outline {
  color: #fff;
  background-color: rgb(123, 123, 255);
  border-radius: 50%;
}
.add {
  display: inline-block;
  padding: 3px;
  text-align: center;
  background-color: rgb(123, 123, 255);
  color: #fff;
  border-radius: 5px;
  font-size: 10px;
  border: 1px solid rgb(179, 179, 179);
}
</style>