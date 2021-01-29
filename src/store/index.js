import Vue from 'vue'
import Vuex from 'vuex'
import {VERIFY_EMAIL, VERIFY_CODE_TOKEN} from "./actions.type";
import ApiService from "../common/api.service";
import {
  SET_TOKEN,
  SET_EMAIL,
  SET_TIMER,
  SET_SENDED,
  SET_ERROR_VERIFY,
  SET_SUCCESS_VERIFY,
  SET_STATUS,
  SET_TIME_LIMIT
} from "./mutations.type";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: false,
    email: null,
    timer: false,
    timeLimit: false,
    sended: null,
    errorVerify: false,
    successVerify: false,
    status: null
  },
  mutations: {
    [SET_TOKEN]:(state, value)=>{
      state.token = value
    },
    [SET_EMAIL]:(state, value)=>{
      state.email = value
    },
    [SET_TIMER]:(state, value) => {
      state.timer = value
    },
    [SET_SENDED]:(state, value) => {
      state.sended = value
    },
    [SET_ERROR_VERIFY]:(state, value) => {
      state.errorVerify = value
    },
    [SET_SUCCESS_VERIFY]: (state, value) => {
      state.successVerify = value
    },
    [SET_STATUS]: (state, value) => {
      state.status = value
    },
    [SET_TIME_LIMIT]: (state, value) => {
      state.timeLimit = value
    }
  },
  actions: {
    [VERIFY_EMAIL]:({state, commit})=>{
      return ApiService.post('/api/confirmation/tokens/confirms.json', {
        'email': state.email
      }).then(res => {
        commit(SET_TOKEN, res.data.data.token),
        commit(SET_TIMER, res.data.data.timer),
        commit(SET_SENDED, res.data.data.sended)
      })
    },
    [VERIFY_CODE_TOKEN]: ({state, commit}, params) => {
      console.log('Run confirm token code. Code = ' + params.code + ', token = ' + state.token)
      return ApiService.post('/api/confirmation/tokens/verifies.json', {
        code: params.code,
        token: state.token
      }).catch((err)=>{
        commit(SET_ERROR_VERIFY, err)
      })
    }
  },
  modules: {
  }
})
