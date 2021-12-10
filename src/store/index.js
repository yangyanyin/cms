import { createStore } from 'vuex'

import rootState from './state'
import mutations from './mutations'
import actions from './actions'
export default createStore({
  state: rootState,
  mutations,
  actions
})