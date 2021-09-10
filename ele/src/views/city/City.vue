<template>
  <div class="city">
    <nav-bar>
      <div @click="refresh" class="el-icon-platform-eleme" slot="left"></div>
      <div class="center" slot="center">城市</div>
      <div @click="gotoProfile" class="el-icon-user" slot="right"></div>
    </nav-bar>
    <div class="hot-cities">
      <div class="title">热门城市</div>
      <ul>
        <li
          @click="goto(item.id)"
          v-for="(item, index) in hotCities"
          :key="index"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <alert>
      <div class="el-icon-warning-outline" slot="top"></div>
      <div class="mid" slot="mid">未登录</div>
    </alert>
    <city-item first="A" :cities="allCities.A"></city-item>
    <city-item first="B" :cities="allCities.B"></city-item>
    <city-item first="C" :cities="allCities.C"></city-item>
    <city-item first="D" :cities="allCities.D"></city-item>
    <city-item first="E" :cities="allCities.E"></city-item>
    <city-item first="F" :cities="allCities.F"></city-item>
    <city-item first="G" :cities="allCities.G"></city-item>
    <city-item first="H" :cities="allCities.H"></city-item>
    <city-item first="I" :cities="allCities.I"></city-item>
    <city-item first="J" :cities="allCities.J"></city-item>
    <city-item first="K" :cities="allCities.K"></city-item>
    <city-item first="L" :cities="allCities.L"></city-item>
    <city-item first="M" :cities="allCities.M"></city-item>
    <city-item first="N" :cities="allCities.N"></city-item>
    <city-item first="P" :cities="allCities.P"></city-item>
    <city-item first="Q" :cities="allCities.Q"></city-item>
    <city-item first="R" :cities="allCities.R"></city-item>
    <city-item first="S" :cities="allCities.S"></city-item>
    <city-item first="T" :cities="allCities.T"></city-item>
    <city-item first="W" :cities="allCities.W"></city-item>
    <city-item first="X" :cities="allCities.X"></city-item>
    <city-item first="Y" :cities="allCities.Y"></city-item>
    <city-item first="Z" :cities="allCities.Z"></city-item>
  </div>
</template>

<script>
import NavBar from "../../components/navbar/NavBar.vue";
import CityItem from "./CityItem.vue";
import { getCities } from "../../axios/getCities";
import Alert from "../../components/alert/Alert.vue";
export default {
  data() {
    return {
      hotCities: [], //热门城市
      allCities: [], //所有城市w
    };
  },
  components: {
    NavBar,
    CityItem,
    Alert, //弹出框
  },
  created() {
    // 获取热门城市列表
    getCities("hot")
      .then((res) => {
        this.hotCities = res.data;
      })
      .catch((err) => {
        console.log(err);
      });

    //获取所有城市列表 结果返回对象
    getCities("group")
      .then((res) => {
        this.allCities = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    refresh() {
      window.location.reload();
    },
    // 根据是否登录进行跳转
    gotoProfile() {
      if (window.localStorage.getItem("user_id")) {
        this.$router.push("/profile");
      } else {
        this.$store.commit("changeShowAlert", true);
      }
    },
    goto(id) {
      this.$router.push("/citysearch/" + id);
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.hot-cities {
  background-color: #fff;
  margin-top: 40px;
  .title {
    font-size: 14px;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  ul {
    padding-bottom: 10px;
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    li {
      border: 1px solid #eee;
      width: 70px;
      text-align: center;
      color: rgb(137, 137, 255);
      height: 30px;
      font-size: 12px;
      margin: 5px 0;
      line-height: 30px;
    }
  }
}
</style>