import axios from 'axios'

axios.defaults.baseURL = "https://kenana-9rlk.onrender.com";



axios.interceptors.request.use((config) => {
  try {
    config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  } catch (error) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  config.headers.Accept = 'application/json'
  // config.headers["Content-Type"] = "application/json";
  return config
})
