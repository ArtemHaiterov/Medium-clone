import feedApi from '@/api/feed'

const state = {
  data: null, //когда мы получакм данные мы записываем в data
  isLoading: false, // в true когда мы фетчим наш фид
  error: null, // null когда нету ошибке и string когда есть
}

export const mutationType = {
  getFeedStart: '[feed] Get feed start',
  getFeedSuccess: '[feed] Get feed success',
  getFeedFailure: '[feed] Get feed failure',
}

export const actionTypes = {
  getFeed: '[feed] Get feed',
}

const mutations = {
  [mutationType.getFeedStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationType.getFeedSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationType.getFeedFailure](state) {
    state.isLoading = false
  },
}

const actions = {
  [actionTypes.getFeed](context, {apiUrl}) {
    return new Promise((resolve) => {
      context.commit(mutationType.getFeedStart)
      feedApi
        .getFeed(apiUrl)
        .then((response) => {
          context.commit(mutationType.getFeedSuccess, response.data)
          resolve(response.data) //если понадобится получить данные внутри компонента
        })
        .catch(() => {
          context.commit(mutationTypes.getFeedFailure)
        })
    })
  },
}

export default {
  state,
  actions,
  mutations,
}
