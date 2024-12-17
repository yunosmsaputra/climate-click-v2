import CryptoJS from 'crypto-js'
import { enc_key } from '@/utils/constant.js'

export default {
  namespaced: true,
  state: {
    auth: null,
    profile: null,
  },
  mutations: {
    SET_PROFILE(state, profile) {
      state.profile = profile
    },
    SET_AUTH(state, auth) {
      state.auth = auth
    },
    LOGOUT(state) {
      state.profile = null
    },
  },
  actions: {
    login({ commit }, profile) {
      commit(
        'SET_PROFILE',
        CryptoJS.AES.encrypt(JSON.stringify(profile), enc_key.profile).toString()
      )
      localStorage.setItem(
        'profile',
        CryptoJS.AES.encrypt(JSON.stringify(profile), enc_key.profile).toString()
      )
    },
    setToken({ commit }, token) {
      commit('SET_AUTH', CryptoJS.AES.encrypt(token, enc_key.auth))
      localStorage.setItem('auth', CryptoJS.AES.encrypt(token, enc_key.auth).toString())
    },
    logout({ commit }) {
      commit('LOGOUT')
    },
  },
  getters: {
    profile(state) {
      return state.profile
    },
  },
}
