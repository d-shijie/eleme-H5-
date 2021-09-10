<template>
  <div v-if="$store.state.showDialog" class="dialog">
    <span @click="close" class="close">x</span>
    <div class="name">{{ $store.state.goodName }}</div>
    <div class="atrs">
      <div class="title">规格</div>
      <div class="btns">
        <span
          :class="{ active: currentIndex === index }"
          @click="itemClick(item, index)"
          v-for="(item, index) in $store.state.atrs"
          :key="index"
        >
          {{ item.specs_name }}
        </span>
      </div>
    </div>
    <div class="bottom">
      <span class="price">
        ￥<i>{{ $store.state.goodPrice }}</i>
      </span>
      <span class="add" @click="add"> 加入购物车 </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    atrs: {
      type: Array,
      default() {
        return [];
      },//商品规格
    },
  },
  data() {
    return {
      currentIndex: 0,
      food: {},
      goods: [],
    };
  },
  activated() {},
  created() {},
  methods: {
    itemClick(item, index) {
      this.food = item;
      this.currentIndex = index;
    },
    // 关闭弹出框
    close() {
      this.$store.commit("setShowDialog", false);
    },
    //添加商品
    add() {
      let payload = {};
      this.goods.push(this.food);
      payload.id = this.$route.params.id;
      payload.foods = this.goods;
      this.$store.commit("setCartItem", payload);
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.dialog {
  width: 70%;
  //   height: 150px;
  position: fixed;
  top: 50%;
  border-radius: 10px;
  overflow: hidden;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  z-index: 1000;
  .bottom {
    height: 40px;
    margin-top: 10px;
    background-color: #f2f2f2;
    line-height: 40px;
    .price {
      margin-left: 10px;
      font-size: 14px;
      i {
        font-size: 16px;
        font-weight: 600;
        color: rgb(255, 91, 91);
      }
    }
    .add {
      color: #fff;
      font-size: 12px;
      padding: 3px 6px;
      margin-left: 100px;
      border-radius: 10px;
      height: 20px;
      background-color: rgb(125, 125, 255);
    }
  }
  .close {
    position: absolute;
    right: 5px;
    font-size: 18px !important;
    top: 5px;
  }
  .name {
    padding: 10px 0;
    text-align: center;
  }
  .title {
    margin-left: 10px;
    font-size: 14px;
  }
  .btns {
    margin-left: 10px;
    span {
      margin: 10px 5px 0 0;
      border-radius: 5px;
      display: inline-block;
      padding: 5px;
      font-size: 12px;
      color: rgb(124, 124, 124);
      border: 1px solid rgb(124, 124, 124);
    }
  }
}
.active {
  color: rgb(132, 132, 255) !important;
  border: 1px solid rgb(132, 132, 255) !important;
}
</style>