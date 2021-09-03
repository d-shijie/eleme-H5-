<template>
  <div class="category">
    <nav-bar>
      <div @click="back" class="el-icon-arrow-left" slot="left"></div>
      <div class="center" slot="center">{{ $store.state.categoryName }}</div>
    </nav-bar>
    <div class="banner">
      <div
        @click="showCascader"
        :class="{
          'el-icon-caret-top': showLeft,
          'el-icon-caret-bottom': showLeft === false,
        }"
      >
        {{ leftText }}
      </div>
      <div
        @click="showOrderWays"
        :class="{
          'el-icon-caret-top': showCenter,
          'el-icon-caret-bottom': showCenter === false,
        }"
      >
        排序
      </div>
      <div
        @click="showChoices"
        :class="{
          'el-icon-caret-top': showRight,
          'el-icon-caret-bottom': showRight === false,
        }"
      >
        筛选
      </div>
    </div>
    <div class="cascader" v-if="showLeft">
      <div class="first">
        <div
          @click="sub(item, index)"
          class="item"
          :class="{ active: currentIndex === index }"
          v-for="(item, index) in category"
          :key="item.id"
        >
          <span class="name"> {{ item.name }}</span>
          <span class="count">
            {{ item.count }}
          </span>
          <span class="el-icon-arrow-right"></span>
        </div>
      </div>
      <div class="second">
        <div
          @click="getShops(item)"
          class="item"
          v-for="item in subCategory"
          :key="item.id"
        >
          <span class="name">{{ item.name }}</span>
          <span class="count">{{ item.count }}</span>
        </div>
      </div>
    </div>
    <div class="order" v-if="showCenter">
      <div
        @click="getOrderShops(index)"
        class="item"
        v-for="(item, index) in orderWays"
        :key="index"
      >
        {{ item }}
      </div>
    </div>
    <div class="choices" v-if="showRight">
      <div class="delivery-ways">
        <header>配送方式</header>
        <span
          :class="{ bgc: deliveryCurrentIndex === index }"
          @click="delivery(item, index)"
          class="delivery-way"
          v-for="(item, index) in deliveryWays"
          :key="index"
        >
          {{ item.text }}
        </span>
      </div>
      <div class="activities">
        <header>商家属性</header>
        <span
          :data-bgc="false"
          ref="activity"
          :class="{ bgc: activityCurrentIndex === index }"
          @click="activity(item, index)"
          class="activity"
          v-for="(item, index) in activities"
          :key="index"
        >
          {{ item.name }}</span
        >
      </div>
      <div class="btns">
        <el-button size="mini" type="success" @click.native="clear"
          >清空</el-button
        >
        <el-button @click.native="getChoiseShops" size="mini" type="primary"
          >确定{{
            "(" + (delivery_mode.length + support_ids.length) + ")"
          }}</el-button
        >
      </div>
    </div>
    <shop-list :shops="shops"></shop-list>
  </div>
</template>

<script>
import NavBar from "../../components/navbar/NavBar.vue";
import ShopList from "../../components/shopList/ShopList.vue";
import {
  getCategory,
  getFoodShops,
  getDeliveryWay,
  getActivity,
} from "../../axios/getFoods";
import { getCityDetail } from "../../axios/getCities";

export default {
  components: { NavBar, ShopList },
  data() {
    return {
      latitude: "",
      longitude: "",
      shops: [],
      showLeft: false,
      showCenter: false,
      showRight: false,
      leftText: "分类",
      category: [],
      subCategory: [],
      currentIndex: "",
      restaurant_category_id: "",
      restaurant_category_ids: [],
      orderWays: [
        "起送价",
        "配送速度",
        "评分",
        "智能排序",
        "距离最近",
        "销量最高",
      ],
      order_by: 4,
      deliveryWays: [],
      activities: [],
      delivery_mode: [],
      support_ids: [],
      deliveryCurrentIndex: "",
      activityCurrentIndex: "",
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
        this.category = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    this.getActivity();
    this.getDeliveryWay();
  },
  methods: {
    getActivity() {
      getActivity()
        .then((res) => {
          this.activities = res.data;

          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDeliveryWay() {
      getDeliveryWay()
        .then((res) => {
          this.deliveryWays = res.data;

          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    back() {
      this.$router.back();
    },
    getFoodShops(latitude, longitude, id) {
      getFoodShops(latitude, longitude, id)
        .then((res) => {
          this.shops = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sub(item, index) {
      this.restaurant_category_id = item.id;
      this.subCategory = item.sub_categories;
      this.currentIndex = index;
    },
    showCascader() {
      this.showLeft = !this.showLeft;
      this.showCenter = false;
      this.showRight = false;
    },
    getShops(item) {
      this.leftText = item.name;
      this.$store.commit("setCategoryName", item.name);
      this.restaurant_category_ids = [];
      this.restaurant_category_ids.push(item.id);
      this.showLeft = false;
      getFoodShops(
        this.latitude,
        this.longitude,
        this.restaurant_category_id,
        this.restaurant_category_ids
      )
        .then((res) => {
          this.shops = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showOrderWays() {
      this.showCenter = !this.showCenter;
      this.showLeft = false;
      this.showRight = false;
    },
    getOrderShops(index) {
      this.order_by = index + 1;
      getFoodShops(
        this.latitude,
        this.longitude,
        this.restaurant_category_id,
        this.restaurant_category_ids,
        this.order_by
      )
        .then((res) => {
          this.shops = res.data;
          this.showCenter = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showChoices() {
      this.showRight = !this.showRight;
      this.showCenter = false;
      this.showLeft = false;
    },
    delivery(item, index) {
      if (this.deliveryCurrentIndex === index) {
        this.delivery_mode = [];
        this.deliveryCurrentIndex = "";
      } else {
        this.delivery_mode.push(item.id);
        this.deliveryCurrentIndex = index;
      }
    },
    activity(item, index) {
      if (this.activityCurrentIndex === index) {
        this.support_ids.pop();
        this.activityCurrentIndex = "";
      } else {
        this.support_ids.push(item.id);
        this.activityCurrentIndex = index;
      }
    },
    clear() {
      this.delivery_mode = [];
      this.support_ids = [];
      this.deliveryCurrentIndex = "";
      this.activityCurrentIndex = "";
    },
    getChoiseShops() {
      getFoodShops(
        this.latitude,
        this.longitude,
        this.restaurant_category_id,
        this.restaurant_category_ids,
        this.order_by,
        this.delivery_mode,
        this.support_ids
      )
        .then((res) => {
          this.shops = res.data;
          this.showRight = false;
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
.cascader {
  width: 100%;
  display: flex;
  position: fixed;
  top: 73px;
  background-color: #fff;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  div {
    flex: 1;
  }

  .first {
    border-right: 1px solid #eee;
    .item {
      font-size: 12px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .name {
        flex: 1;
      }
      .count {
        display: inline-block;
        background-color: rgb(223, 223, 223);
        padding: 2px;
        color: #fff;
        border-radius: 10px;
      }
    }
  }
  .second {
    .item {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      font-size: 12px;
      border-bottom: 1px solid #eee;
    }
  }
}
.banner {
  top: 40px;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  background-color: #fff;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  div {
    border-left: 1px solid #eee;
    flex: 1;
    padding: 10px 0;
    font-size: 12px;
    text-align: center;
  }
}
.shops {
  background-color: #fff;
  padding: 10px 0;
  margin-top: 70px;
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
.order {
  width: 100%;
  position: fixed;
  top: 73px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  .item {
    padding: 10px;
    font-size: 14px;
    border-top: 1px solid #eee;
  }
}
.choices {
  width: 100%;
  position: fixed;
  top: 73px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  div {
    font-size: 13px;
    color: rgb(151, 151, 151);
  }
  header {
    padding: 10px;
    font-size: 14px;
    color: #000;
  }
  .delivery-ways {
    .delivery-way {
      display: inline-block;
      width: 70px;
      margin-left: 10px;
      text-align: center;
      border-radius: 10px;
      line-height: 20px;
      border: 1px solid rgb(109, 109, 109);
      height: 20px;
    }
  }
  .activities {
    border-bottom: 1px solid #eee;
    .activity {
      display: inline-block;
      width: 70px;
      margin: 5px 24px 10px 10px;
      text-align: center;
      border-radius: 10px;
      line-height: 20px;
      border: 1px solid rgb(109, 109, 109);
      height: 20px;
    }
  }
}
.btns {
  display: flex;
  margin: 10px 0;
  justify-content: space-around;
  .el-button {
    width: 30%;
  }
}
.active {
  background-color: #f2f2f2;
}
.bgc {
  color: #fff;
  background-color: rgb(121, 121, 255) !important;
}
</style>