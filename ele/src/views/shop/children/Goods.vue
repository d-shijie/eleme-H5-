<template>
  <div class="goods">
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
export default {
  components: { GoodsDetail, BottomButton, Scroll },
  data() {
    return {
      titles: [],
      currentIndex: 0,
      tops: [],
    };
  },
  created() {
    this.getFoodList();
  },
  methods: {
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
    height: 100%;
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
</style>