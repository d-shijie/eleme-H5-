<template>
  <div class="alert" v-if="$store.state.showAlert">
    <div class="top"><slot name="top"></slot></div>
    <div class="mid"><slot name="mid"></slot></div>
    <div @click="show" class="bottom">确定</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    show() {
      this.$store.commit("changeShowAlert", false);
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.alert {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 1000;
  transform: translate(-50%, -50%);
  width: 150px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
  .top {
    width: 100%;
    text-align: center;
    font-size: 25px;
    background-color: red;
  }
  .top,
  .mid,
  .bottom {
    padding: 5px 0;
  }
  .mid {
    padding: 10px 0;
    text-align: center;
    font-size: 14px;
  }
  .bottom {
    background-color: rgb(133, 133, 255);
    text-align: center;
  }
}
</style>