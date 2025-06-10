import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IUser } from '../../types/taypes'
import type { RootState } from '../store'
// Define a type for the slice state
// Define a type for the slice state
interface UserState {
  user: IUser | null
  isAuth: boolean
}

// Define the initial state using that type
const initialState: UserState = {
  user: null,
  isAuth: false,
}
export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    Login: (state, actions: PayloadAction<IUser>) => {
      state.user = actions.payload
      state.isAuth = true
    },
    Logout: state => {
      state.isAuth = false
      state.user = null
    },
  },
})

export const {Login, Logout} = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user

export default userSlice.reducer
