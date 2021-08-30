import Vue from 'vue'
import VueRouter from 'vue-router'
const City = () => import('../views/city/City.vue')
const CitySearch = () => import("../views/citySearch/CitySearch.vue")
// const Home = () => import('../views/home/Home.vue')
const Main = () => import('../views/main/Main.vue')
const Search = () => import('../views/search/Search.vue')
const Profile = () => import('../views/profile/Profile.vue')
const Order = () => import('../views/order/Order.vue')
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
  }
  // {
  //   path: "/home/:geohash",
  //   component: Home,
  //   children: [
  //     {
  //       redirect: 'main',
  //       path: ''
  //     },
  //     {
  //       path: "main",
  //       component: Main
  //     },
  //     {
  //       path: "search",
  //       component: Search
  //     },
  //     {
  //       path: "order",
  //       component: Order
  //     },
  //     {
  //       path: "profile",
  //       component: Profile
  //     },
  //   ]
  // },


]

const router = new VueRouter({
  routes
})

export default router
