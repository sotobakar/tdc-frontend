import { publicAxios as axios } from '../../../lib/axios'

export interface LoginBody {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
}

const login = (body: LoginBody): Promise<LoginResponse> => {
  return axios.post('/login', body).then((response) => response.data.data)
}

export { login }
