import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    geohash: '',
    userInfo: {
      headImg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171221%2F2a14e6b09df846a1908379c06045ba96.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632980511&t=1f6f2bedc483c3e128111ab973758fe5',
      username: '登录/注册',
      bind: '未绑定',
      balance: 0,
      discount: 0,
      integral: 0,
    },
    showInfoChildren: true,
    address: '',
    showAlert: false,
    categoryName: '',
    shop_delivery_fee: 0,
    float_minimum_order_amount: 0,
    showViewer: false,
    showDialog: false,
    goodName: '',
    atrs: [],
    goodPrice: 0,
    cartItems: [],
    showCartBar: false
  },
  mutations: {
    setGeoHash(state, geohash) {
      state.geohash = geohash
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      state.userInfo.headImg = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171221%2F2a14e6b09df846a1908379c06045ba96.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632980511&t=1f6f2bedc483c3e128111ab973758fe5'
      state.userInfo.bind = '未绑定'
    },
    changeShowInfoChildren(state, show) {
      state.showInfoChildren = show
    },
    resetUsername(state, name) {
      state.userInfo.username = name
    },
    setAddress(state, address) {
      state.address = address
    },
    changeShowAlert(state, show) {
      state.showAlert = show
    },
    setCategoryName(state, name) {
      state.categoryName = name
    },
    setDeliveryFee(state, fee) {
      state.shop_delivery_fee = fee
    },
    setfloat_minimum_order_amount(state, fee) {
      state.float_minimum_order_amount = fee
    },
    setShowViewer(state, bool) {
      state.showViewer = bool
    },
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
    setCartItem(state, payload) {
      let product = state.cartItems.find(item => item.id === payload.id)
      if (!product) {
        state.cartItems.push(payload)
      } else {
        product.foods.push(payload.foods[0])
      }
    },
    clearCart(state, id) {
      let index = state.cartItems.findIndex(item => item.id === id)
      state.cartItems.splice(index, 1)
    },
    setShowCartBar(state, bool) {
      state.showCartBar = bool
    },
    subCart(state, payload) {
      let index = state.cartItems.findIndex(item => item.id === payload.id)
      let foodIndex = state.cartItems[index].foods.findIndex(item => item.food_id === payload.food_id)
      state.cartItems[index].foods.splice(foodIndex, 1)
    }
  },
  actions: {
  },
  getters: {
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
