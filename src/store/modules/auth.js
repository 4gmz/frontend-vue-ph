import axios from 'axios'
import Cookies from 'js-cookie'

import {user} from '../../services/auth'

// state
export const state = {
  user: null,
  token: Cookies.get('token')
}

// getters
export const getters = {
  user: state => state.user,
  token: state => state.token,
  check: state => state.user !== null
}

// mutations
export const mutations = {
  SAVE_TOKEN(state, { access_token, remember }){
    state.token = access_token
    Cookies.set('token', access_token, { expires: remember ? 365 : null })
  },

  FETCH_USER_SUCCESS(state, { user }){
    state.user = user
  },

  FETCH_USER_FAILURE(state){
    state.token = null
    Cookies.remove('token')
  },

  LOGOUT(state){
    state.user = null
    state.token = null

    Cookies.remove('token')
  },

  UPDATE_USER(state, { user }){
    state.user = user
  }
}

// actions
export const actions = {
  saveToken ({ commit, dispatch }, payload) {
    commit('SAVE_TOKEN', payload)
  },

  async fetchUser ({ commit }) {
    try {
      //const { data } = await axios.get('/api/user')
      const { data } = await user()

      commit('FETCH_USER_SUCCESS', { user: data })
    } catch (e) {
      commit('FETCH_USER_FAILURE')
    }
  },

  updateUser ({ commit }, payload) {
    commit('UPDATE_USER', payload)
  },

  async logout ({ commit }) {
    try {
      await axios.post('/api/logout')
    } catch (e) { }

    commit('LOGOUT')
  },

  async fetchOauthUrl (ctx, { provider }) {
    const { data } = await axios.post(`/api/oauth/${provider}`)

    return data.url
  }
}