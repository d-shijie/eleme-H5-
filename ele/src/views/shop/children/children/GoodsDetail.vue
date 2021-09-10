<template>
  <div ref="good" class="goods-detail">
    <header>
      {{ title }}
    </header>
    <ul>
      <li v-for="item in foods" :key="item._id">
        <span class="new">新品</span>
        <span class="brand">品牌</span>
        <img
          @click="itemClick(item)"
          :src="imgBaseUrl + item.image_path"
          alt=""
        />
        <div class="info">
          <div class="name">
            {{ item.name }}
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
          <div class="sell">
            月售{{ item.month_sales }} 好评率{{ item.satisfy_rate }}%
          </div>
          <div class="bottom">
            <span class="price">￥{{ item.specfoods[0].price }}</span>
            <span class="add-cart">
              <add-cart :foods="item.specfoods" :name="item.name" :price='item.specfoods[0].price'></add-cart>
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import AddCart from "../../../../components/addCart/AddCart.vue";

export default {
  components: { AddCart },
  props: {
    title: {
      type: String,
      default: "",
    },
    foods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      imgUrl: "",//图片地址
      imgBaseUrl: "//elm.cangdu.org/img/",
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.getTop();
  },
  methods: {
    // 图片预览
    itemClick(item) {
      this.$store.commit("setShowViewer", true);
      this.imgUrl = this.imgBaseUrl + item.image_path;
      this.$emit("getImgUrl", this.imgUrl);
    },
    // 获取元素距离顶部距离 传入父组件
    getTop() {
      let top = this.$refs.good.offsetTop;
      this.$emit("getTop", top);
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.goods-detail {
  width: 100%;
}
header {
  background-color: #f2f2f2;
  padding: 10px 0 10px 10px;
  font-weight: 600;
  color: #555555;
}
ul {
  .new,
  .brand {
    position: absolute;
    top: 10px;
    font-size: 6px;
    display: inline-block;
    padding: 2px;
    border: 1px solid rgb(253, 105, 105);
    border-radius: 10px;
    color: rgb(253, 105, 105);
  }
  .new {
    left: 160px;
  }
  .brand {
    left: 190px;
  }
  li {
    display: flex;
    position: relative;
    padding: 10px;
    align-items: center;
    border-bottom: 1px solid #eee;
    img {
      width: 50px;
      height: 50px;
      border-radius: 10px;
    }
    .info {
      margin-left: 10px;
      .name {
        width: 100px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-weight: 600;
        font-size: 14px;
      }
      .desc {
        margin: 5px 0;
        font-size: 12px;
      }
      .sell {
        font-size: 12px;
      }
      .bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .add-cart {
          margin-left: 40px;
        }
      }
      .price {
        font-weight: 600;
        font-size: 14px;
        color: rgb(255, 85, 85);
      }
    }
  }
}
</style>