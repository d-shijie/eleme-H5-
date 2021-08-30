<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
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
.nav-bar {
  display: flex;
  width: 100%;
  background-color: rgb(117, 117, 253);
  height: 40px;
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 100;

  .left,
  .right {
    text-align: center;
    font-size: 24px;
    line-height: 40px;
    width: 15%;
  }
  .center {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    text-align: center;
    line-height: 40px;
  }
}
</style>