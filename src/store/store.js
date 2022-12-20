import { configureStore } from '@reduxjs/toolkit'
import auth from './auth'
import filteroperation from './filteroperation'



export const store = configureStore({
    reducer: {
      authh:auth,
      filteropera:filteroperation
    },
  })