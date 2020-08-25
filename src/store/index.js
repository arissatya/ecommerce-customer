import Vue from 'vue'
import Vuex from 'vuex'
import ServerAPI from '../server/ServerAPI'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    }
  },
  actions: {
    login (context, payload) {
      ServerAPI({
        method: 'POST',
        url: 'user/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('user', payload.email)
          router.push('/')
        })
        .catch((err) => {
          router.push('/login')
          console.log(err)
        })
    },
    logout (context, payload) {
      localStorage.clear()
    },
    register (context, payload) {
      ServerAPI({
        method: 'POST',
        url: 'user/register',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          router.push('/login')
        })
        .catch((err) => {
          router.push('/register')
          console.log(err)
        })
    },
    fetchProducts (context) {
      ServerAPI({
        method: 'GET',
        url: 'products'
      })
        .then(({ data }) => {
          context.commit('SET_PRODUCTS', data)
        })
        .catch((err) => {
          console.table(err)
          context.commit('ALERT', 'FETCH FAILED')
        })
    }
  },
  getters: {
    products (state) {
      return state.products
    }
  }
})