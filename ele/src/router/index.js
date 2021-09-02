import Vue from 'vue'
import VueRouter from 'vue-router'
const City = () => import('../views/city/City.vue')
const CitySearch = () => import("../views/citySearch/CitySearch.vue")
// const Home = () => import('../views/home/Home.vue')
const Main = () => import('../views/main/Main.vue')
const Search = () => import('../views/search/Search.vue')
const Profile = () => import('../views/profile/Profile.vue')
const Order = () => import('../views/order/Order.vue')
const VIP = () => import('../views/vip/VIP.vue')
const Service = () => import('../views/service/Service.vue')
const Download = () => import('../views/download/Download.vue')
const Login = () => import('../views/login/Login.vue')
const Info = () => import('../views/info/Info.vue')
const Address = () => import('../views/info/children/Address.vue')
const ResetUserName = () => import('../views/info/children/ResetUserName.vue')
const ResetPassword = () => import('../views/info/children/ResetPassword.vue')
const AddAddress = () => import('../views/info/children/AddAdress.vue')
const AddDetail = () => import('../views/info/children/AddDetail.vue')
const Payment = () => import('../views/vip/Payment.vue')
const Category = () => import('../views/category/Category.vue')
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
    component: Order
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
  }
]

const router = new VueRouter({
  routes
})

export default router
