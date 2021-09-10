import Vue from 'vue'
import VueRouter from 'vue-router'
//城市页
const City = () => import('../views/city/City.vue')
// 地址搜索页
const CitySearch = () => import("../views/citySearch/CitySearch.vue")
// 首页
const Main = () => import('../views/main/Main.vue')
// 店铺搜索页
const Search = () => import('../views/search/Search.vue')
// 个人页
const Profile = () => import('../views/profile/Profile.vue')
//订单页
const Order = () => import('../views/order/Order.vue')
// 会员页
const VIP = () => import('../views/vip/VIP.vue')
// 服务页
const Service = () => import('../views/service/Service.vue')
// 下载页
const Download = () => import('../views/download/Download.vue')
// 登录页
const Login = () => import('../views/login/Login.vue')
// 用户信息页
const Info = () => import('../views/info/Info.vue')
// 地址页
const Address = () => import('../views/info/children/Address.vue')
// 重置用户名页
const ResetUserName = () => import('../views/info/children/ResetUserName.vue')
// 重置密码页
const ResetPassword = () => import('../views/info/children/ResetPassword.vue')
// 添加地址页
const AddAddress = () => import('../views/info/children/AddAdress.vue')
// 添加地址详情页
const AddDetail = () => import('../views/info/children/AddDetail.vue')
//支付页 无用
const Payment = () => import('../views/vip/Payment.vue')
// 分类页
const Category = () => import('../views/category/Category.vue')
// 店铺页
const Shop = () => import('../views/shop/Shop.vue')
// 商品页
const Goods = () => import('../views/shop/children/Goods.vue')
// 评论页
const Comments = () => import('../views/shop/children/Comments.vue')
// 确认订单页
const ConfirmOrder = () => import('../views/confirmOrder/ConfirmOrder.vue')
// 支付页
const PayMent = () => import('../views/payMent/PayMent.vue')
// 订单详情页
const OrderDetail = () => import('../views/order/OrderDetail.vue')
Vue.use(VueRouter)

const routes = [
  {
    redirect: '/city',
    path: ''
  },
  {
    path: "/city",
    component: City
  },
  {
    path: "/citysearch/:id",
    component: CitySearch
  },
  {
    path: "/main/:geohash",
    component: Main
  },
  {
    path: "/search/:geohash",
    component: Search
  },
  {
    path: "/order",
    component: Order,
    children: [
      {
        path: 'orderDetail',
        component: OrderDetail
      },
    ]
  },

  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/vip',
    component: VIP,
    children: [

    ]
  },
  {
    path: '/service',
    component: Service
  },
  {
    path: '/download',
    component: Download
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: '/info',
    component: Info,
    children: [
      {
        path: 'address',
        component: Address
      },
      {
        path: "resetusername",
        component: ResetUserName
      },
      {
        path: "resetpassword",
        component: ResetPassword
      },
      {
        path: "add",
        component: AddAddress
      },
      {
        path: "adddetail",
        component: AddDetail
      }
    ]
  },
  {
    path: '/vip/payment',
    component: Payment
  },
  {
    path: '/category/:id',
    component: Category
  },
  {
    path: "/shop/:id",
    component: Shop,
    children: [
      {
        redirect: 'goods',
        path: ''
      },
      {
        path: 'goods',
        component: Goods
      },
      {
        path: 'comments',
        component: Comments
      }
    ]
  },
  {
    path: '/confirmOrder/:id',
    component: ConfirmOrder
  },
  {
    path: '/confirmOrder/:id/payment',
    component: PayMent
  },

]

const router = new VueRouter({
  routes
})

export default router
