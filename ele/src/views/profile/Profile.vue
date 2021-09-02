<template>
  <div class="profile">
    <nav-bar>
      <div @click="back" class="el-icon-arrow-left" slot="left"></div>
      <div class="center" slot="center">我的</div>
    </nav-bar>
    <div @click="login" class="login">
      <img :src="userInfo.headImg" alt="" />
      <div class="info">
        <div class="name">{{ userInfo.username }}</div>
        <div class="el-icon-phone">{{ userInfo.bind }}</div>
      </div>
      <div class="el-icon-arrow-right"></div>
    </div>
    <div class="counts">
      <profile-info
        :count="$store.state.userInfo.balance"
        desc="我的余额"
        unit="元"
      ></profile-info>
      <profile-info
        :count="$store.state.userInfo.discount"
        desc="我的优惠"
        unit="个"
      ></profile-info>
      <profile-info
        :count="$store.state.userInfo.integral"
        desc="我的积分"
        unit="分"
      ></profile-info>
    </div>
    <div class="mid">
      <profile-button path="/order">
        <div class="el-icon-tickets" slot="left"></div>
        <div class="center" slot="center">我的订单</div>
        <div class="el-icon-arrow-right" slot="right"></div>
      </profile-button>
      <profile-button>
        <div class="el-icon-shopping-bag-1" slot="left"></div>
        <div class="center" slot="center">积分商城</div>
        <div class="el-icon-arrow-right" slot="right"></div>
      </profile-button>
      <profile-button path="/vip" :showBorder="false">
        <div class="el-icon-medal" slot="left"></div>
        <div class="center" slot="center">饿了么会员</div>
        <div class="el-icon-arrow-right" slot="right"></div>
      </profile-button>
    </div>
    <div class="bottom">
      <profile-button path="/service">
        <div class="el-icon-service" slot="left"></div>
        <div class="center" slot="center">服务中心</div>
        <div class="el-icon-arrow-right" slot="right"></div>
      </profile-button>
      <profile-button path="/download" :showBorder="false">
        <div class="el-icon-eleme" slot="left"></div>
        <div class="center" slot="center">下载饿了么APP</div>
        <div class="el-icon-arrow-right" slot="right"></div>
      </profile-button>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/navbar/NavBar.vue";
import ProfileInfo from "../profile/ProfileInfo.vue";
import ProfileButton from "../profile/ProfileButton.vue";
export default {
  components: { NavBar, ProfileInfo, ProfileButton },
  data() {
    return {};
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  created() {},
  methods: {
    back() {
      this.$router.back();
    },
    login() {
      if (window.localStorage.getItem("user_id")) {
        this.$store.commit("changeShowInfoChildren", true);
        this.$router.push("/info");
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.login {
  margin-top: 40px;
  width: 100%;
  display: flex;
  padding: 10px 0;
  background-color: rgb(121, 121, 255);
  justify-content: space-between;
  align-items: center;
  img {
    padding-left: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .info {
    flex: 1;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    color: #fff;
    justify-content: space-between;
    .name {
      font-weight: 600;
      margin-bottom: 10px;
    }
    .el-icon-phone {
      font-size: 14px;
    }
  }
  .el-icon-arrow-right {
    padding-right: 10px;
  }
}
.counts {
  display: flex;
  justify-content: space-between;
  div {
    flex: 1;
  }
}
.mid,
.bottom {
  margin-top: 15px;
}
</style>