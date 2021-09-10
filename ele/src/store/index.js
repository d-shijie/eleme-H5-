import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    geohash: '',//地址信息
    userInfo: {
      headImg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171221%2F2a14e6b09df846a1908379c06045ba96.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632980511&t=1f6f2bedc483c3e128111ab973758fe5',
      username: '登录/注册',
      bind: '未绑定',
      balance: 0,
      discount: 0,
      integral: 0,
    },//用户信息
    showInfoChildren: true,//显示用户详情
    address: '',//用户地址
    showAlert: false,//显示弹出框
    categoryName: '',//分类名称
    shop_delivery_fee: 0,//配送费
    float_minimum_order_amount: 0,//起送费
    showViewer: false,//图片预览
    showDialog: false,//选择商铺规格弹出框
    goodName: '',//商铺名称
    atrs: [],//商品规格
    goodPrice: 0,//商铺价格
    cartItems: [],//订单列表
    showCartBar: false,//是否显示商铺商品下方支付栏
    cartList: [],//购物车列表
    showOrder:true//是否显示订单表
  },
  mutations: {
    // 改变地址信息
    setGeoHash(state, geohash) {
      state.geohash = geohash
    },
    // 改变用户信息
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      state.userInfo.headImg = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171221%2F2a14e6b09df846a1908379c06045ba96.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632980511&t=1f6f2bedc483c3e128111ab973758fe5'
      state.userInfo.bind = '未绑定'
    },
    // 改变用户详情页是否显示
    changeShowInfoChildren(state, show) {
      state.showInfoChildren = show
    },
    // 重置用户名
    resetUsername(state, name) {
      state.userInfo.username = name
    },
    // 改变用户地址
    setAddress(state, address) {
      state.address = address
    },
    // 是否显示弹出框
    changeShowAlert(state, show) {
      state.showAlert = show
    },
    // 改变分类名称
    setCategoryName(state, name) {
      state.categoryName = name
    },
    // 设置配送费
    setDeliveryFee(state, fee) {
      state.shop_delivery_fee = fee
    },
    // 设置起送费
    setfloat_minimum_order_amount(state, fee) {
      state.float_minimum_order_amount = fee
    },
    // 是否显示图片预览
    setShowViewer(state, bool) {
      state.showViewer = bool
    },
    // 设置弹出框
    setShowDialog(state, bool) {
      state.showDialog = bool
    },
    setGoodName(state, name) {
      state.goodName = name
    },
    setGoodAtrs(state, atrs) {
      state.atrs = atrs
    },
    setGoodPrice(state, price) {
      state.goodPrice = price
    },
    // 加入订单表
    setCartItem(state, payload) {
      let product = state.cartItems.find(item => item.id === payload.id)
      if (!product) {
        state.cartItems.push(payload)
      } else {
        product.foods.push(payload.foods[0])
      }
    },
    // 减去订单
    clearCart(state, id) {
      let index = state.cartItems.findIndex(item => item.id === id)
      state.cartItems.splice(index, 1)
    },
    setShowCartBar(state, bool) {
      state.showCartBar = bool
    },
    // 减少已选商品
    subCart(state, payload) {
      let index = state.cartItems.findIndex(item => item.id === payload.id)
      let foodIndex = state.cartItems[index].foods.findIndex(item => item.food_id === payload.food_id)
      state.cartItems[index].foods.splice(foodIndex, 1)
    },
    // 添加购物车列表
    addCartList(state) {
      for (var i = 0; i < state.cartList.length; i++) {
        state.cartList[i].surplusTime -= 1000
      }
    },
    setShowOrder(state,bool){
      state.showOrder=bool
    }
  },
  actions: {
    // 购物清单定时器
    addCartList(context, payload) {
      this.state.cartList.push(payload)
      setInterval(() => {
        context.commit('addCartList')
      }, 1000)

    }
  },
  getters: {
    //总价
    price: (state) => (id) => {
      if (state.cartItems === []) {
        return 0
      }
      return state.cartItems.find(item => item.id === id)
        .foods.reduce((pre, item) => {
          return pre + item.price
        }, 0)
    }
  },
  modules: {
  }
})
