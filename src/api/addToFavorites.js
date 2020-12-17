import axios from '@/api/axios'

const getUrl = (slug) => `/articles/${slug}/favorite`

const addFromFavorites = (slug) => {
  const url = getUrl(slug)
  return axios.post(url).then((response) => response.data.article)
}

const removeFromFavorites = (slug) => {
  const url = getUrl(slug)
  return axios.delete(url).then((response) => response.data.article)
}

export default {
  addFromFavorites,
  removeFromFavorites,
}
