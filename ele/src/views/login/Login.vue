<template>
  <div class="login">
    <nav-bar>
      <div @click="back" class="el-icon-arrow-left" slot="left"></div>
      <div class="center" slot="center">登录</div>
    </nav-bar>
    <el-form
      :model="queryInfo"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item prop="username">
        <el-input
          clearable
          placeholder="请输入账号"
          size="mini"
          v-model="queryInfo.username"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          clearable
          type="password"
          placeholder="请输入密码"
          size="mini"
          v-model="queryInfo.password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="captcha_code">
        <el-input
          clearable
          placeholder="请输入验证码"
          size="mini"
          v-model="queryInfo.captcha_code"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <span> <img :src="codeImg" alt="" /></span>
        <span @click="shift" class="shift">换一张</span>
      </el-form-item>
      <el-form-item>
        <el-button @click.native="login" type="primary" size="mini"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
    <alert>
      <div class="el-icon-warning" slot="top"></div>
      <div class="mid" slot="mid">登录失败</div>
    </alert>
  </div>
</template>

<script>
import NavBar from "../../components/navbar/NavBar.vue";
import Alert from "../../components/alert/Alert.vue";
import { getCaptchas, login } from "../../axios/getLogin";

export default {
  components: { NavBar, Alert },
  data() {
    return {
      codeImg: "",
      queryInfo: {
        username: "dsj",
        password: "123456",
        captcha_code: null,
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 3,
            max: 6,
            message: "长度在 3 到 6 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "长度在 6 到 10 个字符",
            trigger: "blur",
          },
        ],
        captcha_code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
      userInfo: {},
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
      this.$router.back();
    },
    login() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          login(this.queryInfo)
            .then((res) => {
              this.userInfo.username = res.data.username;
              this.userInfo.balance = res.data.balance;
              this.userInfo.discount = res.data.gift_amount;
              this.userInfo.integral = res.data.point;
              window.localStorage.setItem(
                "user_id",
                JSON.stringify(res.data.id)
              );
              this.$store.commit("setUserInfo", this.userInfo);
              console.log(res);
              if (res.data.status === 0) {
                this.$store.commit("changeShowAlert", true);
              } else {
                this.$router.push("/profile");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.$message({
            type: "error",
            customClss: "message",
            message: "登录失败",
          });
        }
      });
    },
    shift() {
      this.getCaptchas();
    },
  },
};
</script>
<style scoped  lang='less'>
/* @import url(); 引入css类 */
.el-form {
  margin-top: 40px;
  width: 100%;
  padding: 20px 0 0 0;
  background-color: #fff;
  .el-form-item {
    text-align: center;
    .qr {
      background-color: red;
    }
    .el-input,
    .el-button,
    img {
      margin-left: -100px;
    }
  }
}
.shift {
  font-size: 12px;
  margin-left: 5px;
  color: rgb(121, 123, 255);
}
.message/deep/ {
  width: 100px;
}
</style>