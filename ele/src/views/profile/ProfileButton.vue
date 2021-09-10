<template>
  <div @click="goto" class="profile-btn" :class="{ border: showBorder }">
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
    },//跳转路径
    showBorder: {
      type: Boolean,
      default: true,
    },//是否显示边框
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    goto() {
      this.$router.push(this.path);
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.profile-btn {
  display: flex;
  padding: 10px 10px;
  background-color: #fff;
  justify-content: space-between;
  .center {
    flex: 1;
    margin-left: 10px;
  }
}
.border {
  border-bottom: 1px solid #eee;
}
</style>