import { axios } from '../../../lib/axios'
import { ApiResponse } from '../../../types/api'

export interface User {
  id: number
  name: string
  email: string
  created_at: string
  updated_at: string
}

export interface CreateUserBody {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface UpdateUserBody {
  name?: string
  email?: string
  password?: string
  password_confirmation?: string
}

const getUsers = (): Promise<User[]> => {
  return axios.get('/users').then((response) => response.data.data)
}

const createUser = (body: CreateUserBody): Promise<ApiResponse> => {
  return axios.post('/users', body).then((response) => response.data)
}

const getUser = (id: string): Promise<User> => {
  return axios.get(`/users/${id}`).then((response) => response.data.data)
}

const updateUser = (id: string, body: UpdateUserBody): Promise<ApiResponse> => {
  return axios.put(`/users/${id}`, body).then((response) => response.data)
}

const deleteUser = (id: string): Promise<ApiResponse> => {
  return axios.delete(`/users/${id}`).then((response) => response.data)
}

export { getUsers, createUser, getUser, updateUser, deleteUser }
