<template>
  <div class="goods">
    <add-cart-dialog></add-cart-dialog>
    <viewer v-if="$store.state.showViewer" button class="viewer">
      <span @click="close" class="close">X</span>
      <img :src="imgUrl" />
    </viewer>
    <div class="good-left">
      <scroll class="content">
        <ul>
          <li
            @click="itemClick(index)"
            :class="{ active: currentIndex === index }"
            v-for="(item, index) in titles"
            :key="index"
          >
            {{ item.name }}
          </li>
        </ul>
      </scroll>
    </div>
    <div class="good-right">
      <scroll class="content">
        <goods-detail
          @getImgUrl="getImgUrl"
          @getTop="getTop"
          ref="goods"
          v-for="item in titles"
          :foods="item.foods"
          :title="item.name"
          :key="item.id"
        ></goods-detail>
      </scroll>
    </div>
    <bottom-button></bottom-button>
  </div>
</template>

<script>
import { getFoodList } from "../../../axios/getFoods";
import BottomButton from "./children/BottomButton.vue";
import GoodsDetail from "./children/GoodsDetail.vue";
import Scroll from "../../../components/scroll/Scroll.vue";
import AddCartDialog from "../../../components/addCart/AddCartDialog.vue";
export default {
  components: { GoodsDetail, BottomButton, Scroll, AddCartDialog },
  data() {
    return {
      titles: [],
      currentIndex: 0,
      tops: [],
      imgUrl: "",
    };
  },
  created() {
    this.getFoodList();
  },
  methods: {
    close() {
      this.imgUrl = "";
      this.$store.commit("setShowViewer", false);
    },
    getImgUrl(url) {
      this.imgUrl = url;
    },
    getTop(top) {
      this.tops.push(top);
    },
    getFoodList() {
      getFoodList(this.$route.params.id)
        .then((res) => {
          this.titles = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    itemClick(index) {
      this.currentIndex = index;
      let good = document.querySelector(".good-right");
      good.style.top = -this.tops[index] + "px";
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.goods {
  display: flex;
  height: 100%;
  width: 100vw;
  overflow: hidden;
  .good-left {
    width: 90px;
    height: 70vh;
    background-color: rgb(236, 236, 236);
    ul {
      li {
        font-size: 13px;
        padding: 12px 15px;
        text-align: center;
        overflow: hidden;
        color: rgb(90, 90, 90);
        border-bottom: 1px solid #ccc;
      }
    }
  }
  .good-right {
    height: 70vh;
    flex: 1;
    position: relative;
    background-color: #fff;
  }
}
.active {
  border-left: 2px solid rgb(126, 126, 255);
  background-color: #fff;
  color: #000;
}
.goods-detail {
  position: relative;
}
.content {
  height: 100%;
}
.viewer {
  background-color: red;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  .close {
    position: absolute;
    right: -3px;
    top: -5px;
    display: inline-block;
    padding: 3px;
    background-color: #fff;
    border-radius: 50%;
    border: 1px solid rgb(88, 88, 88);
  }
}
</style>