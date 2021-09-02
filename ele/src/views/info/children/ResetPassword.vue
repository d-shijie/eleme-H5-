<template>
  <div class="reset-password">
    <nav-bar>
      <div @click="back" class="el-icon-arrow-left" slot="left"></div>
      <div class="center" slot="center">修改密码</div>
    </nav-bar>
    <el-form :model="queryInfo">
      <el-form-item>
        <el-input placeholder="用户名" v-model="queryInfo.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="旧密码"
          v-model="queryInfo.oldpassWord"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="新密码"
          v-model="queryInfo.newpassword"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="确认密码"
          v-model="queryInfo.confirmpassword"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="验证码"
          v-model="queryInfo.captcha_code"
        ></el-input>
        <span><img :src="codeImg" alt="" /></span>
        <span @click="shift" class="shift">换一张</span>
      </el-form-item>
    </el-form>
    <el-button type="success" @click="reset">确认修改</el-button>
    <Alert>
      <div class="el-icon-warning" slot="top"></div>
      <div class="mid" slot="mid">密码修改失败</div>
    </Alert>
  </div>
</template>

<script>
import NavBar from "../../../components/navbar/NavBar.vue";
import Alert from "../../../components/alert/Alert.vue";
import { changePssword, getCaptchas } from "../../../axios/getLogin";
export default {
  components: {
    NavBar,
    Alert,
  },
  data() {
    return {
      queryInfo: {
        username: "",
        oldpassWord: "",
        newpassword: "",
        confirmpassword: "",
        captcha_code: "",
      },
      codeImg: "",
    };
  },
  created() {
    this.getCaptchas();
  },
  methods: {
    getCaptchas() {
      getCaptchas()
        .then((res) => {
          this.codeImg = res.data.code;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    back() {
      this.$store.commit("changeShowInfoChildren", true);
      this.$router.back();
    },
    reset() {
      changePssword(this.queryInfo)
        .then((res) => {
          
          if (res.data.status === 1) {
            this.$router.push("/profile");
          } else {
            this.$store.commit("changeShowAlert", true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    shift() {
      this.getCaptchas();
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.el-form {
  margin-top: 50px;
}
.el-button {
  width: 100%;
}
.shift {
  color: rgb(109, 109, 255);
}
</style>