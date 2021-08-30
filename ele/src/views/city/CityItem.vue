<template>
  <div class="city-item">
    <div class="cities">
      <div class="first">{{ first }}</div>
      <ul>
        <li @click="goto(item.id)" v-for="item in cities" :key="item.id">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cities: {
      type: Array,
      default() {
        return [];
      },
    },
    first: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    goto(id) {
      this.$router.push("/citysearch/" + id);
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.city-item {
  background-color: #fff;
  margin-top: 15px;
  padding: 10px 0;
  .first {
    margin-left: 5px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 5px;
    li {
      width: 78px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size: 12px;
      border: 1px solid #eee;
    }
  }
}
</style>