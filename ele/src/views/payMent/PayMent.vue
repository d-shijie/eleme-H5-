<template>
  <div class="pay-ment">
    <nav-bar>
      <div @click="back" class="el-icon-arrow-left" slot="left"></div>
      <div class="center" slot="center">在线支付</div>
    </nav-bar>
    <alert>
      <div class="el-icon-warning-outline" slot="top"></div>
      <div class="text" slot="mid">{{ text }}</div>
    </alert>
    <div class="info">
      <div class="text">剩余支付时间</div>
      <div class="time">{{ time }}</div>
    </div>
    <header>选择支付方式</header>
    <div class="pay-ways">
      <div
        @click="itemClick(1)"
        :class="{ active: currentIndex === 1 }"
        class="pay-way"
      >
        <span class="img"
          ><img src="../../assets/images/other/zhifubao.png" alt=""
        /></span>
        <span class="name">支付宝</span>
      </div>
      <div
        @click="itemClick(2)"
        :class="{ active: currentIndex === 2 }"
        class="pay-way"
      >
        <span class="img"
          ><img src="../../assets/images/other/weixin.png" alt=""
        /></span>
        <span class="name">微信</span>
      </div>
    </div>
    <el-button type="success">确认支付</el-button>
  </div>
</template>

<script>
import Alert from "../../components/alert/Alert.vue";
import NavBar from "../../components/navbar/NavBar.vue";
export default {
  data() {
    return {
      myTime: 30 * 60 * 1000,
      timer: null,
      text: "",
      currentIndex: 1,
    };
  },
  components: {
    NavBar,
    Alert,
  },
  computed: {
    time() {
      let date = new Date(this.myTime);
      const m = (date.getMinutes() + "").padStart(2, "0");
      const s = (date.getSeconds() + "").padStart(2, "0");
      return m + ":" + s;
    },
  },
  created() {
    if (this.myTime > 0) {
      this.text = "暂不开放支付功能";
      this.$store.commit("changeShowAlert", true);
      this.timer = setInterval(() => {
        this.myTime -= 1000;
      }, 1000);
    } else {
      this.text = "支付超时";
      this.$store.commit("changeShowAlert", true);
      clearInterval(this.timer);
    }
  },
  methods: {
    back() {
      this.$router.back();
    },
    itemClick(index) {
      this.currentIndex = index;
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.pay-ment {
  position: relative;
}
.el-button {
  position: absolute;
  margin-top: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
}
.pay-ways {
  background-color: #fff;
  .pay-way {
    padding: 15px;
    border-bottom: 1px solid #eee;
    .img {
      img {
        border-radius: 50%;
        width: 40px;
        height: 40px;
      }
    }
    .name {
      margin-left: 10px;
      font-size: 14px;
      color: rgb(88, 88, 88);
    }
  }
}
header {
  padding: 10px;
  color: rgb(97, 97, 97);
}
.info {
  padding: 20px;
  background-color: #fff;
  margin-top: 40px;
  text-align: center;
  .text {
    font-size: 12px;
  }
  .time {
    margin-top: 10px;
    font-size: 24px;
    font-weight: 500;
  }
}
.active {
  color: #fff;
  background-color: rgb(181, 181, 255);
}
</style>