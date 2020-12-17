import popularTagsApi from '@/api/popularTags'

const state = {
  data: null, //когда мы получаем теги мы записываем в data
  isLoading: false,
  error: null,
}

export const mutationType = {
  getPopularTagsStart: '[popularTags] Get popular tags start',
  getPopularTagsSuccess: '[popularTags] Get popular tags success',
  getPopularTagsFailure: '[popularTags] Get popular tags failure',
}

export const actionTypes = {
  getPopularTags: '[popularTags] Get popular tags',
}

const mutations = {
  [mutationType.getPopularTagsStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationType.getPopularTagsSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationType.getPopularTagsFailure](state) {
    state.isLoading = false
  },
}

const actions = {
  [actionTypes.getPopularTags](context) {
    return new Promise((resolve) => {
      context.commit(mutationType.getPopularTagsStart)
      popularTagsApi
        .getPopularTags()
        .then((tags) => {
          context.commit(mutationType.getPopularTagsSuccess, tags)
          resolve(tags) //если понадобится получить данные внутри компонента
        })
        .catch(() => {
          context.commit(mutationTypes.getPopularTagsFailure)
        })
    })
  },
}

export default {
  state,
  actions,
  mutations,
}
