<template>
  <div class="search">
    <nav-bar>
      <div @click="back" class="el-icon-arrow-left" slot="left"></div>
      <div class="center" slot="center">搜索</div>
    </nav-bar>
    <div class="search-input">
      <el-input
        v-model="keyword"
        size="mini"
        clearable
        @clear="clear"
        placeholder="输入餐厅、食品"
      ></el-input>
      <el-button @click.native="search" type="primary" size="mini"
        >搜索</el-button
      >
    </div>
    <shop-list :shops="shops"></shop-list>

    <div v-if="show" class="search-history">
      <header>搜索历史</header>
      <div
        @click="itemClick(item)"
        class="item"
        v-for="(item, index) in searchHistory"
        :key="index"
      >
        {{ item }}
      </div>
      <div @click="clearHistory" class="clear">清空</div>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/navbar/NavBar.vue";
import { getSearchShops } from "../../axios/getFoods";
import ShopList from "../../components/shopList/ShopList.vue";
export default {
  components: { NavBar, ShopList },
  data() {
    return {
      keyword: "",//搜索关键字
      shops: [],//搜索到的店铺
      shopImgUrl: "//elm.cangdu.org/img/",
    };
  },
  computed: {
    // 搜索历史
    searchHistory() {
      return JSON.parse(window.localStorage.getItem("searchHistory"));
    },
    show() {
      return window.localStorage.getItem("searchHistory");
    },
  },
  created() {},
  methods: {
    back() {
      this.$router.back();
    },
    // 搜索商铺 将搜索记录存入localStorage
    search() {
      getSearchShops(this.$route.params.geohash, this.keyword)
        .then((res) => {
          this.shops = res.data;
          if (!window.localStorage.getItem("searchHistory")) {
            window.localStorage.setItem(
              "searchHistory",
              JSON.stringify([this.keyword])
            );
          } else {
            let arr = JSON.parse(window.localStorage.getItem("searchHistory"));
            let newArr = arr.push(this.keyword);
            newArr = arr;
            for (var i = 0; i < newArr.length; i++) {
              if (newArr[i] !== this.keyword) {
                window.localStorage.setItem(
                  "searchHistory",
                  JSON.stringify(newArr)
                );
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 点击搜索历史 item直接为关键字
    itemClick(item) {
      this.search(this.$route.params.geohash, item);
    },
    clear() {
      window.location.reload();
    },
    clearHistory() {
      window.localStorage.clear();
      window.location.reload();
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
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
.cities {
  background-color: #fff;
  .item {
    padding: 10px;
    font-size: 12px;
    display: flex;
    border-bottom: 1px solid #eee;
    img {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }
    span {
      margin-left: 10px;
      display: flex;
      font-size: 10px;
      flex-direction: column;
      justify-content: space-around;
    }
  }
}
.search-history {
  background-color: #fff;
  padding: 10px 0;
  header {
    font-size: 14px;
    padding: 5px 0 5px 5px;
  }
  .item {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding: 10px 0 10px 5px;
  }
  .clear {
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
}
</style>