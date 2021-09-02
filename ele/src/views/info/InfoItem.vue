<template>
  <div @click="goto" class="info-item">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    goto() {
      this.$router.push(this.path);
      this.$store.commit("changeShowInfoChildren",false);
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.info-item {
  border-top: 1px solid #eee;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  background-color: rgb(119, 106, 240);
  .left,
  .right {
    color: #fff;
  }
  .left {
    font-size: 14px;
  }
  .center {
    flex: 1;
  }
}
</style>