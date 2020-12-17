import articleApi from '@/api/article'

const state = {
  data: null, //когда мы получаем теги мы записываем в data
  isLoading: false,
  error: null,
}

export const mutationType = {
  getArticleStart: '[article] Get article start',
  getArticleSuccess: '[article] Get article success',
  getArticleFailure: '[article] Get article failure',

  deleteArticleStart: '[article] Delete article start',
  deleteArticleSuccess: '[article] Delete article success',
  deleteArticleFailure: '[article] Delete article failure',
}

export const actionTypes = {
  getArticle: '[article] Get article',

  deleteArticle: '[article] Delete article',
}

const mutations = {
  [mutationType.getArticleStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationType.getArticleSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationType.getArticleFailure](state) {
    state.isLoading = false
  },

  [mutationType.deleteArticleStart]() {},
  [mutationType.deleteArticleSuccess]() {},
  [mutationType.deleteArticleFailure]() {},
}

const actions = {
  [actionTypes.getArticle](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationType.getArticleStart, slug) // передал slug что бы легче дебажить
      articleApi
        .getArticle(slug)
        .then((article) => {
          context.commit(mutationType.getArticleSuccess, article)
          resolve(article) //если понадобится получить данные внутри компонента
        })
        .catch(() => {
          context.commit(mutationTypes.getArticleFailure)
        })
    })
  },

  [actionTypes.deleteArticle](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationType.deleteArticleStart, slug) // передал slug что бы легче дебажить
      articleApi
        .deleteArticle(slug)
        .then(() => {
          context.commit(mutationType.deleteArticleSuccess)
          resolve()
        })
        .catch(() => {
          context.commit(mutationTypes.deleteArticleFailure)
        })
    })
  },
}

export default {
  state,
  actions,
  mutations,
}
