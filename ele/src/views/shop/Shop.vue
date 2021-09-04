<template>
  <div class="shop">
    <div class="info">
      <span @click="back" class="el-icon-arrow-left"></span>
      <div class="detail">
        <img :src="shopImgUrl + shopInfo.image_path" alt="" />
        <div class="desc">
          <div class="name">{{ shopInfo.name }}</div>
          <div class="fee">配送费:￥{{ shopInfo.float_delivery_fee }}</div>
          <div class="notice">{{ shopInfo.promotion_info }}</div>
        </div>
        <span class="el-icon-arrow-right"></span>
      </div>
    </div>
    <div class="bar">
      <div class="goods">
        <span @click="showGoods" :class="{ active: isActive }">商品</span>
      </div>
      <div class="comment">
        <span @click="showComments" :class="{ active: isActive === false }"
          >评价</span
        >
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getShopInfo } from "../../axios/getShop";
export default {
  data() {
    return {
      shopImgUrl: "//elm.cangdu.org/img/",
      shopInfo: {},
      isActive: true,
    };
  },
  created() {
    getShopInfo(this.$route.params.id)
      .then((res) => {
        this.shopInfo = res.data;
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
    showGoods() {
      this.isActive = true;
      this.$router.push("goods");
    },
    showComments() {
      this.isActive = false;
      this.$router.push("comments");
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.info {
  position: relative;
  width: 100%;
  padding: 10px 0;
  background: -webkit-linear-gradient(rgb(129, 129, 252), white);
  .el-icon-arrow-left {
    position: absolute;
    left: 5px;
    top: 5px;
    z-index: 10;
    font-size: 25px;
    color: #fff;
    font-weight: 600;
  }
  .detail {
    padding: 0 10px;
    display: flex;
    position: relative;
    align-items: center;
    .el-icon-arrow-right {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 5px;
      z-index: 10;
      color: #fff;
    }
    img {
      width: 70px;
      border-radius: 10px;
    }
    .desc {
      height: 60px;
      margin-left: 10px;
      display: flex;
      flex: 1;
      color: #fff;
      font-size: 12px;
      flex-direction: column;
      justify-content: space-around;
      div {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
.bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  .goods,
  .comment {
    padding: 10px;
    flex: 1;
    text-align: center;
    span {
      font-size: 13px;
      display: inline-block;
      padding: 7px 2px;
    }
  }
}
.active {
  border-bottom: 3px solid rgb(142, 150, 255);
  color: rgb(142, 150, 255);
}
</style>