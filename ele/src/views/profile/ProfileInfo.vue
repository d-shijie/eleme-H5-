<template>
  <div class="profile-info">
    <div class="count">
      <i>{{ count }}</i> {{ unit }}
    </div>
    <div class="desc">{{ desc }}</div>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      defalut: 0,
    },
    unit: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      defalut: "",
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.profile-info {
  padding: 15px 20px;
  background-color: #fff;
  border-right: 1px solid #eee;
  .count {
    text-align: center;
    font-size: 14px;
    i {
      font-size: 18px;
      font-weight: 600;
      color: rgb(255, 83, 83);
    }
  }
  .desc {
    text-align: center;
    margin-top: 5px;
    font-size: 12px;
  }
}
</style>