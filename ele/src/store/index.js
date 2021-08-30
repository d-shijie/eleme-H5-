import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    geohash: ''
  },
  mutations: {
    setGeoHash(state, geohash) {
      state.geohash = geohash
    }
  },
  actions: {
  },
  modules: {
  }
})
