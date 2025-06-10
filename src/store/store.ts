// import { configureStore } from '@reduxjs/toolkit'
// import { useReducer } from './user/userSlice'
// // ...

// export const store = configureStore({
//   reducer: {
//     user:useReducer,
//   },
// })

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch


// store.ts
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice' // ✅ default import (потому что export default)

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
