<template>
  <div @click="itemClick" class="tab-bar-item">
    <div v-if="isActive" class="item-active">
      <slot name="item-active"></slot>
    </div>
    <div v-else class="item-icon">
      <slot name="item-icon"></slot>
    </div>
    <div class="item-text">
      <slot name="item-text"> </slot>
    </div>
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
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) != -1;
    },
  },
  methods: {
    itemClick() {
      this.$router.push(this.path);
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.tab-bar-item {
  text-align: center;
}
.active {
  color: red;
}
.item-text {
  margin-top: 5px;
}
</style>