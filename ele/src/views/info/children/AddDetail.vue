<template>
  <div class="add-detail">
    <nav-bar>
      <div @click="back" class="el-icon-arrow-left" slot="left"></div>
      <div class="center" slot="center">搜索地址</div>
    </nav-bar>
    <el-select v-model="value" placeholder="请选择">
      <el-option-group
        v-for="group in options"
        :key="group.label"
        :label="group.label"
      >
        <el-option
          @click.native="search(item.id)"
          v-for="item in group.hotCities"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-option-group>
    </el-select>
    <el-tag size="mini">选择您的城市</el-tag>
    <div
      @click="itemClick(item.name)"
      class="city"
      v-for="item in cities"
      :key="item.id"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
import NavBar from "../../../components/navbar/NavBar.vue";
import { getCityLocation, getCities } from "../../../axios/getCities";
export default {
  components: { NavBar },
  data() {
    return {
      value: "",// 下拉框input显示内容
      keyword: "",// 搜索关键字
      options: [
        {
          label: "热门城市",
          hotCities: [],
        },
      ],// 下拉框数据
      cities: [],
    };
  },
  created() {
    // 获取城市列表
    getCities("hot")
      .then((res) => {
        this.options[0].hotCities = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    back() {
      this.$router.back();
    },
    // 搜索到的地址
    search(id) {
      getCityLocation(id, this.value)
        .then((res) => {
          this.cities = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    itemClick(name) {
      this.$store.commit("setAddress", name);
      this.$router.back();
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.el-select {
  margin-top: 50px;
}
.el-button {
  margin-top: 15px;
  width: 100%;
}
.city {
  background-color: #fff;
  padding: 10px 5px;
  border-top: 1px solid #eee;
}
</style>