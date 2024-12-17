import auth from '@/store/auth.js'
import { createStore } from 'vuex'

export default createStore({
  modules: {
    auth,
  },
})
