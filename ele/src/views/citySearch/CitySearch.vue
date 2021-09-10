<template>
  <div class="city-search">
    <nav-bar>
      <div @click="back" class="el-icon-arrow-left" slot="left"></div>
      <div class="center" slot="center">{{ cityInfo.name }}</div>
      <div @click="gotoCity" class="shift" slot="right">切换城市</div>
    </nav-bar>
    <div class="search-input">
      <el-input
        v-model="keyword"
        size="mini"
        clearable
        @clear="clear"
        placeholder="输入学校、地址、社区、公司"
      ></el-input>
      <el-button @click.native="search" type="primary" size="mini"
        >搜索</el-button
      >
    </div>
    <div class="cities">
      <div
        @click="gotoMain(item)"
        class="item"
        v-for="(item, index) in cities"
        :key="index"
      >
        <div class="city-name">{{ item.name }}</div>
        <div class="address">{{ item.address }}</div>
      </div>
    </div>
    <header>搜索历史</header>
    <div class="cities">
      <div
        @click="gotoMain(item)"
        class="item"
        v-for="(item, index) in placeHistory"
        :key="index"
      >
        <div class="city-name">{{ item.name }}</div>
        <div class="address">{{ item.address }}</div>
      </div>
      <div v-if="showHistory" @click="clearHistory" class="clear">
        清空搜索记录
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/navbar/NavBar.vue";
import { getCityInfo, getCityLocation } from "../../axios/getCities";
export default {
  data() {
    return {
      cityInfo: {},// 所选城市信息
      keyword: "",// 搜索关键字
      cities: [],// 搜索到的地址
    };
  },
  components: {
    NavBar,
  },
  computed: {
    showHistory() {
      return window.localStorage.getItem("placeHistory");
    },
    // 将localStorage存储的字符串解析为JSON格式
    placeHistory() {
      return JSON.parse(window.localStorage.getItem("placeHistory"));
    },
  },
  created() {
    // 获取地址信息
    getCityInfo(this.$route.params.id)
      .then((res) => {
        this.cityInfo = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    gotoCity() {
      this.$router.push("/city");
    },
    back() {
      this.$router.back();
    },
    // 添加搜索记录
    gotoMain(item) {
      let placeHistory = window.localStorage.getItem("placeHistory");
      if (!placeHistory) {
        window.localStorage.setItem("placeHistory", JSON.stringify([item]));
      } else {
        // 每搜索一个地址添加一个搜索记录 localStorage只能存储字符串
        let newPlaceHistory =
          placeHistory.substring(0, placeHistory.length - 1) +
          "," +
          JSON.stringify(item) +
          "]";
        window.localStorage.setItem("placeHistory", newPlaceHistory);
      }
      this.$store.commit("setGeoHash", item.geohash);
      this.$router.push("/main/" + item.geohash);
    },
    // 搜索地址
    search() {
      getCityLocation(this.$route.params.id, this.keyword)
        .then((res) => {
          this.cities = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 清除input
    clear() {
      window.location.reload();
    },
    // 清除搜索记录
    clearHistory() {
      window.localStorage.clear();
      window.location.reload();
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.shift {
  font-size: 12px;
  color: #fff;
  //   margin-right: 10px;
}
.search-input {
  padding: 10px 0;
  margin-top: 55px;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  .el-input {
    width: 70%;
  }
  .el-button {
    margin-left: 20px;
  }
}
header {
  margin: 5px 5px;
  font-size: 14px;
}
.cities {
  background-color: #fff;
  .item {
    padding: 10px;
    font-size: 12px;
    border-bottom: 1px solid #eee;
    .city-name {
      margin-bottom: 5px;
    }
    .address {
      color: rgb(133, 133, 133);
    }
  }

  .clear {
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
}
</style>