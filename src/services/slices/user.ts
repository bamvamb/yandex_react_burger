import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
  authorized: boolean,
  loading: boolean,
  error: boolean,
  name?: string|undefined,
  email?: string|undefined
}

const initialState:IUserState = {
  authorized: false,
  loading: false,
  error: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authStarted:(state) => {
        state.loading = true
        state.error = false
    },
    authSuccess:(state, action:PayloadAction<{name:string, email:string}>) => {
        state.loading = false
        state.authorized = true
        state.name = action.payload.name
        state.email = action.payload.email
        state.error = false
    },
    authError:(state) => {
        state.loading = false
        state.authorized = false
        state.error = true
    },
    unauthorized:(state) => {
        state.loading = false
        state.authorized = false
        state.error = false
        state.name = undefined
        state.email = undefined
    }
  },
});


export const { authStarted, authError, authSuccess, unauthorized } = userSlice.actions;