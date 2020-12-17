import {mutationTypes as authMutationTypes} from '@/store/modules/auth'

const state = {
  isSummitting: false,
  validationErrors: null,
}

const mutations = {
  [authMutationTypes.updateCurrentUserStart](state) {
    state.isSubmitting = true
    state.validationErrors = false
  },
  [authMutationTypes.updateCurrentUserSuccess](state) {
    state.isSummitting = false
  },
  [authMutationTypes.updateCurrentUserFailure](state, payload) {
    state.isSummitting = false
    state.validationErrors = payload
  },
}

export default {
  state,
  mutations,
}
