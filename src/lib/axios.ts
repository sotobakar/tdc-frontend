import Axios from 'axios'

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
  },
})

// Add a request interceptor to set the authorization header
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')

    if (token) {
      config.headers.Authorization = `Bearer ${token ? JSON.parse(token) : ''}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

// Add a response interceptor to handle 401 status code
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('access_token')

      window.location.href = '/login'
    }

    return Promise.reject(error)
  },
)

const publicAxios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
  },
})

export { axios, publicAxios }
