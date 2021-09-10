<template>
  <div class="address">
    <nav-bar>
      <div @click="back" class="el-icon-arrow-left" slot="left"></div>
      <div class="center" slot="center">编辑地址</div>
    </nav-bar>
    <div class="addresses">
      <div class="address" v-for="(item, index) in address" :key="index">
        <div class="name">{{ item.address }}</div>
        <div class="detail">{{ item.address_detail }}</div>
        <div class="info">{{ item.name }}{{ item.phone }}</div>
        <span class="el-icon-close" @click="deleteAddress(item.id)"></span>
      </div>
    </div>
    <el-button @click.native="add">新增地址</el-button>
  </div>
</template>

<script>
import NavBar from "../../../components/navbar/NavBar.vue";
import { getAddress, deleteAddress } from "../../../axios/getLogin";
export default {
  components: { NavBar },
  data() {
    return {
      address: [],//用户地址
    };
  },
  created() {
    this.getAddress();
  },
  methods: {
    // 获取用户地址
    getAddress() {
      getAddress(window.localStorage.getItem("user_id"))
        .then((res) => {
          this.address = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    back() {
      this.$store.commit("changeShowInfoChildren", true);
      this.$router.back();
    },
    add() {
      this.$router.push("add");
    },
    // 删除地址
    deleteAddress(address_id) {
      deleteAddress(window.localStorage.getItem("user_id"), address_id)
        .then(() => {
          this.getAddress();
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
.el-button {
  margin-top: 40px;
  width: 100%;
}
.addresses {
  background-color: #fff;
  margin-top: 40px;
  .address {
    position: relative;
    padding: 10px 5px;
    border-bottom: 1px solid #eee;
    .name {
      font-size: 14px;
    }
    .detail,
    .info {
      font-size: 12px;
    }
    .detail {
      margin: 5px 0;
    }
    .info {
      color: #ccc;
    }
  }
}
.el-icon-close {
  position: absolute;
  border-radius: 50%;
  border: 1px solid #eee;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
}
</style>