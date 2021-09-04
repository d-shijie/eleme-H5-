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
          data-bool="false"
          ref="activity"
          :class="{ bgc: item.bool }"
          @click="activity(item)"
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
      latitude: "",//位置信息
      longitude: "",//位置信息
      shops: [],//获得店铺数量
      showLeft: false,//是否显示分类筛选
      showCenter: false,//是否显示排序筛选
      showRight: false,//是否显示其他筛选
      leftText: "分类",//分类筛选标题信息
      category: [],//一类分类数目
      subCategory: [],// 二类分类数目
      currentIndex: "",//控制一类分类的样式
      restaurant_category_id: "",//餐馆分类id
      restaurant_category_ids: [],// 餐馆分类id
      orderWays: [
        "起送价",
        "配送速度",
        "评分",
        "智能排序",
        "距离最近",
        "销量最高",
      ],// 排序标题
      order_by: 4,//默认排序id
      deliveryWays: [],//派送方式
      activities: [],// 商家活动
      delivery_mode: [],//派送方式id
      support_ids: [],//商家活动id
      deliveryCurrentIndex: "",//控制派送样式
    };
  },
  created() {
    // 获取位置信息和餐馆
    getCityDetail(this.$store.state.geohash)
      .then((res) => {
        this.latitude = res.data.latitude;
        this.longitude = res.data.longitude;
        this.getFoodShops(this.latitude, this.longitude);
      })
      .catch((err) => {
        console.log(err);
      });
      //获取分类
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
    // 获取商家活动
    getActivity() {
      getActivity()
        .then((res) => {
          for (var i = 0; i < res.data.length - 1; i++) {
            res.data[i].bool = false;
          }
          this.activities = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取派送方式
    getDeliveryWay() {
      getDeliveryWay()
        .then((res) => {
          this.deliveryWays = res.data;
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
    // 点击分类改变样式 得到餐馆一级id 获取二级分类
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
    // 只按照分类条件获得餐馆
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
    // 按派送方式获取餐馆 因为派送id可选1，2，3，4，5 分别排序好渲染遍历下标值
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
    // 点击派送方式将id加入delivery_mode
    delivery(item, index) {
      if (this.deliveryCurrentIndex === index) {
        this.delivery_mode = [];
        this.deliveryCurrentIndex = "";
      } else {
        this.delivery_mode.push(item.id);
        this.deliveryCurrentIndex = index;
      }
    },
    // 将活动id加入support_ids
    activity(item) {
      if (item.bool === false) {
        this.support_ids.push(item.id);
        item.bool = true;
      } else {
        let index = this.support_ids.findIndex((value) => {
          return value === item.id;
        });
        this.support_ids.splice(index, 1);
        item.bool = false;
      }
    },
    clear() {
      this.delivery_mode = [];
      this.support_ids = [];
      this.deliveryCurrentIndex = "";
      for (let i in this.activities) {
        this.activities[i].bool = false;
      }
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