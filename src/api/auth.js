// Все запросы, которые относятся к модулю авторизации
import axios from '@/api/axios'

//credentials - наши 3 поля логин, эмейл, пароль
const register = (credentials) => {
  return axios.post('/users', {user: credentials})
}

const login = (credentials) => {
  return axios.post('/users/login', {user: credentials})
}

const getCurrentUser = () => {
  return axios.get('/user')
}

const updateCurrentUser = (currentUserInput) => {
  return axios
    .put('/user', {user: currentUserInput})
    .then((response) => response.data.user)
}

export default {
  register,
  login,
  getCurrentUser,
  updateCurrentUser
}
