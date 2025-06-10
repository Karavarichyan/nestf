import { instance } from '../api/axios.api'
import type { IResponseUserData, IUser, IUserData } from '../types/taypes'

export const AuthServices = {
  async registration(
    userData: IUserData
  ): Promise<IResponseUserData | undefined> {
    const { data } = await instance.post<IResponseUserData>('user', userData)
    return data
  },
  async Login(userData:IUserData): Promise<IUser | undefined> {
    const {data} = await instance.post<IUser>('auth/Login',userData)
    return data
  },
  async getProfile() : Promise<IUser | undefined>{
    const {data } = await instance.get<IUser>('auth/profile')
    if(data) return data
  },
}
