<template>
  <div class="info">
    <div class="box" v-if="show">
      <nav-bar>
        <div @click="back" class="el-icon-arrow-left" slot="left"></div>
        <div class="center" slot="center">用户信息</div>
      </nav-bar>
      <div class="top">
        <info-item>
          <div class="text" slot="left">头像</div>
          <div class="avatar" slot="center">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="$store.state.userInfo.headImg"
                :src="$store.state.userInfo.headImg"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="el-icon-arrow-right" slot="right"></div>
        </info-item>
        <info-item path="/info/resetusername">
          <div class="text" slot="left">用户名</div>
          <div class="username" slot="center">
            {{ $store.state.userInfo.username }}
          </div>
          <div class="el-icon-arrow-right" slot="right"></div>
        </info-item>
        <info-item path="/info/address">
          <div class="text" slot="left">收货地址</div>
          <div class="el-icon-arrow-right" slot="right"></div>
        </info-item>
      </div>
      <div class="mid">
        <header>账号绑定</header>
        <info-item path="/profile">
          <div class="el-icon-phone" slot="left">手机</div>
          <div class="el-icon-arrow-right" slot="right"></div>
        </info-item>
      </div>
      <div class="bottom">
        <header>安全设置</header>
        <info-item path="/info/resetpassword">
          <div class="left" slot="left">登陆密码</div>
          <div class="center1" slot="center">修改密码</div>
          <div class="el-icon-arrow-right" slot="right"></div>
        </info-item>
      </div>
      <el-button @click.native="loginout" size="mini" type="warning"
        >退出登录</el-button
      >
    </div>
    <router-view v-else> </router-view>
  </div>
</template>

<script>
import NavBar from "../../components/navbar/NavBar.vue";
import InfoItem from "./InfoItem.vue";
import { loginout } from "../../axios/getLogin";
export default {
  components: { NavBar, InfoItem },
  data() {
    return {
      imageUrl:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171221%2F2a14e6b09df846a1908379c06045ba96.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632980511&t=1f6f2bedc483c3e128111ab973758fe5",
    };
  },
  computed: {
    show() {
      return this.$store.state.showInfoChildren;
    },
  },
  created() {},
  methods: {
    back() {
      this.$router.back();
    },
    loginout() {
      loginout()
        .then(() => {
          window.localStorage.clear();
          this.$router.push("/profile");
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
.top {
  margin-top: 40px;
}
.avatar {
  width: 30px;
  border-radius: 50%;
  float: right;
}
.mid,
.bottom {
  margin-top: 14px;
}
header {
  padding: 5px 10px;
}
.username,
.center1 {
  font-size: 12px;
  float: right;
}
.el-button {
  width: 100%;
  margin-top: 15px;
}
</style>