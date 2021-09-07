<template>
  <div class="commnets">
    <scroll class="content">
      <ul>
        <li v-for="item in comments" :key="item._id">
          <img :src="item.avatar" alt="" />
          <div class="info">
            <div class="username">
              {{ item.username }}
            </div>
            <div class="desc">
              {{ item.time_spent_desc }}
            </div>
            <div class="imgs">
              <img
                v-for="img in item.item_ratings"
                :key="img._id"
                :src="baseImgUrl + img.image_hash"
                alt=""
              />
            </div>
            <div class="good">
              <span v-for="good in item.item_ratings" :key="good._id">
                {{ good.food_name }}
              </span>
            </div>
          </div>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import { getCommentInfo } from "../../../axios/getFoods";
import Scroll from "../../../components/scroll/Scroll.vue";

export default {
  components: { Scroll },
  data() {
    return {
      comments: [],
      avatar:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171221%2F2a14e6b09df846a1908379c06045ba96.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632980511&t=1f6f2bedc483c3e128111ab973758fe5",
      baseImgUrl: "https://fuss10.elemecdn.com/",
    };
  },
  created() {
    this.getCommentInfo();
  },
  methods: {
    getCommentInfo() {
      getCommentInfo(this.$route.params.id)
        .then((res) => {
          for (let i of res.data) {
            if (i.avatar === "") {
              i.avatar = this.avatar;
            } else {
              i.avatar = this.baseImgUrl + i.avatar;
            }
          }
          this.comments = res.data;
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
.commnets {
  height: 75vh;
}
ul {
  background-color: #fff;
  li {
    margin: 0 10px;
    padding: 10px 0;
    display: flex;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .info {
      font-size: 12px;
      margin-left: 10px;
      div {
        margin: 2px 0;
      }
      .desc {
        color: rgb(133, 133, 133);
      }
      img {
        width: 50px;
        height: 50px;
        margin-right: 5px;
        border-radius: 0%;
      }
      .good {
        span {
          display: inline-block;
          width: 40px;
          margin-right: 5px;
          padding: 2px 3px;
          border: 1px solid #eee;
          text-align: center;
          height: 20px;
          color: rgb(126, 126, 126);
          font-size: 10px;
          border-radius: 5px;
          line-height: 20px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
}
.content {
  height: 100%;
}
</style>