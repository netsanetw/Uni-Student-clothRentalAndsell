import axiosClient from './axiosClient'

export const loginUser = (credentials) => {
  return axiosClient.post('/api/users/token/', credentials)
}

export const registerUser = (userData) => {
  return axiosClient.post('/api/users/register/', userData)
}
