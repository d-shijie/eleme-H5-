<template>
  <div class="main">
    <nav-bar>
      <div
        @click="goto('/search/' + $route.params.geohash)"
        class="el-icon-search"
        slot="left"
      ></div>
      <div @click="goto('/city')" class="center" slot="center">
        {{ cityInfo.name }}
      </div>
      <div @click="goto('/profile')" class="el-icon-user" slot="right"></div>
    </nav-bar>
    <div class="category">
      <div class="box">
        <div
          @click="gotoCategory(item)"
          class="item"
          v-for="item in foodCategory"
          :key="item.id"
        >
          <img :src="cateImgUrl + item.image_url" alt="" />
          <div class="text">{{ item.title }}</div>
        </div>
      </div>
    </div>
    <div class="points">
      <span @click="shift" :class="{ active: currentIndex === 0 }"></span>
      <span @click="shift" :class="{ active: currentIndex === 1 }"></span>
    </div>
    <header class="el-icon-location-information">附近商家</header>
    <shop-list :shops="shops"></shop-list>
  </div>
</template>

<script>
import NavBar from "../../components/navbar/NavBar.vue";
import { getCityDetail } from "../../axios/getCities";
import { getFoodCategory, getFoodShops } from "../../axios/getFoods";
import ShopList from "../../components/shopList/ShopList.vue";
export default {
  components: { NavBar, ShopList },
  data() {
    return {
      cityInfo: {},
      foodCategory: [],
      shops: [],
      cateImgUrl: "https://fuss10.elemecdn.com/",
      currentIndex: 0,
    };
  },
  computed: {
    pointCount() {
      return this.foodCategory.length / 8;
    },
  },
  created() {
    getCityDetail(this.$route.params.geohash)
      .then((res) => {
        this.cityInfo = res.data;
        getFoodShops(res.data.latitude, res.data.longitude)
          .then((res) => {
            this.shops = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    getFoodCategory()
      .then((res) => {
        this.foodCategory = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    goto(path) {
      this.$router.push(path);
    },
    shift() {
      let box = document.querySelector(".box");
      switch (this.currentIndex) {
        case 0:
          box.style.left = "-100%";
          this.currentIndex = 1;
          break;
        case 1:
          box.style.left = 0;
          this.currentIndex = 0;
          break;
      }
    },
    gotoCategory(item) {
      this.$store.commit("setCategoryName", item.title);

      this.$router.push("/category/" + item.id);
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.category {
  // background-color: #fff;
  overflow: hidden;
  background-color: #fff;
  .box {
    position: relative;
    width: 200%;
    display: flex;
    margin-top: 40px;
    padding: 10px 0 20px 0;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .item {
      margin: 10px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 80px;
      img {
        width: 35px;
      }
      .text {
        margin-top: 5px;
        font-size: 14px;
        text-align: center;
      }
    }
  }
}
.points {
  width: 100%;
  position: relative;
  top: -20px;
  background-color: #fff;
  text-align: center;
  span {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 0 5px;
    border-radius: 50%;
    background-color: #ccc;
  }
}
.shops {
  background-color: #fff;
  padding: 10px 0;
  header {
    font-size: 14px;
    padding-left: 10px;
  }
  ul {
    margin-top: 10px;
    li {
      padding: 0 5px;
      margin: 10px 0;
      display: flex;
      align-items: center;
      img {
        width: 70px;
        border-radius: 10px;
        height: 70px;
      }
      .desc {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 12px;
        justify-content: space-around;
        margin: 0 10px;
        .name {
          font-size: 14px;
          font-weight: 600;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 100px;
          white-space: nowrap;
        }
        .rate {
          margin: 10px 0;
        }
      }
      .other {
        width: 100px;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        font-size: 12px;
        .tags span {
          display: inline-block;
          padding: 2px;
          border-radius: 5px;
          border: 1px solid #eee;
        }
        .brand {
          margin: 10px 0;
          span {
            display: inline-block;
            padding: 2px;
            border-radius: 3px;
            border: 1px solid rgb(146, 146, 252);
          }
        }
        .time {
          font-size: 10px;
          color: rgb(116, 116, 116);
        }
      }
    }
  }
}
.active {
  background-color: rgb(113, 113, 255) !important;
}
header {
  padding: 0 0 10px 10px;
}
</style>