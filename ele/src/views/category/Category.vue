<template>
  <div class="category">
    <nav-bar>
      <div @click="back" class="el-icon-arrow-left" slot="left"></div>
      <div class="center" slot="center">{{ $store.state.categoryName }}</div>
    </nav-bar>
    <div class="shops">
      <header class="el-icon-map-location">附近商家</header>
      <ul>
        <li v-for="item in shops" :key="item.id">
          <img :src="shopImgUrl + item.image_path" alt="" />
          <span class="desc">
            <div class="name">{{ item.name }}</div>
            <div class="rate">
              评分:{{ item.rating }}/月售:{{ item.recent_order_num }}
            </div>
            <div class="payment">
              ￥{{ item.float_minimum_order_amount }}起送/配送费￥{{
                item.float_delivery_fee
              }}
            </div>
          </span>
          <span class="other">
            <div class="tags">
              <span>保</span>
              <span>准</span>
              <span>票</span>
            </div>
            <div class="brand">
              <span>蜂鸟专送</span>
              <span>准时达</span>
            </div>
            <div class="time">
              {{ item.distance }}/{{ item.order_lead_time }}
            </div>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/navbar/NavBar.vue";
import { getCategory, getFoodShops } from "../../axios/getFoods";
import { getCityDetail } from "../../axios/getCities";
export default {
  components: { NavBar },
  data() {
    return {
      latitude: "",
      longitude: "",
      shops: [],
      cateImgUrl: "https://fuss10.elemecdn.com/",
      shopImgUrl: "//elm.cangdu.org/img/",
    };
  },
  created() {
    getCityDetail(this.$store.state.geohash)
      .then((res) => {
        this.latitude = res.data.latitude;
        this.longitude = res.data.longitude;
        this.getFoodShops(this.latitude, this.longitude);
      })
      .catch((err) => {
        console.log(err);
      });
    getCategory()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    back() {
      this.$router.back();
    },
    getFoodShops(latitude, longitude, id) {
      getFoodShops(latitude, longitude, id)
        .then((res) => {
          this.shops = res.data;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
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
</style>