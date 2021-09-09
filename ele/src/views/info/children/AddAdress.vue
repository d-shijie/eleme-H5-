<template>
  <div class="add">
    <nav-bar>
      <div @click="back" class="el-icon-arrow-left" slot="left"></div>
      <div class="center" slot="center">新增地址</div>
    </nav-bar>
    <el-form :model="queryInfo">
      <el-form-item>
        <el-input
          v-model="queryInfo.name"
          placeholder="姓名"
          size="mini"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          @focus="goto"
          v-model="queryInfo.address"
          placeholder="地址"
          size="mini"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="queryInfo.address_detail"
          placeholder="详细地址"
          size="mini"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="queryInfo.phone"
          placeholder="电话号码"
          size="mini"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="queryInfo.phone_bk"
          placeholder="备注电话"
          size="mini"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="add" type="primary" size="mini">增加</el-button>
  </div>
</template>

<script>
import NavBar from "../../../components/navbar/NavBar.vue";
import { addAddress } from "../../../axios/getLogin";
export default {
  components: { NavBar },
  data() {
    return {
      queryInfo: {
        name: "",
        address: this.$store.state.address,
        address_detail: "",
        phone: "",
        phone_bk: "",
        user_id: 0,
        tag: "美食",
        sex: 1,
        tag_type: 2,
        geohash: this.$store.state.geohash,
      },
    };
  },
  created() {},
  methods: {
    back() {
      this.$store.commit("changeShowInfoChildren", true);
      this.$router.back();
    },
    goto() {
      this.$router.push("addDetail");
    },
    add() {
      addAddress(window.localStorage.getItem("user_id"), this.queryInfo)
        .then((res) => {
          console.log(res);
          this.$router.back();
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
.el-form {
  margin-top: 40px;
}
.el-button {
  width: 100%;
}
</style>