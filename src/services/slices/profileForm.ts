import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type InputsNames = "name"|"email"|"password"

export interface InputsState {
  name: {
    error: boolean,
    value: string, 
    has_changed: boolean
  },
  email: {
    error: boolean,
    value: string, 
    has_changed: boolean
  },
  password: {
    error: boolean,
    value: string, 
    has_changed: boolean
  }
}

const initialState:InputsState = {
  name: {
    value: "",
    error: false,
    has_changed: false
  },
  email: {
    value: "",
    error: false,
    has_changed: false
  },
  password: {
    value: "",
    error: false,
    has_changed: false
  },
}

//TODO check input values


export const profileInputsSlice = createSlice({
  name: 'profileForm',
  initialState,
  reducers: {
    setKeyValue: (state, action:PayloadAction<{key:InputsNames, value:string}>) => {
      state[action.payload.key].value = action.payload.value
      state[action.payload.key].error = false
    },
    setKeyError: (state, action:PayloadAction<{key:InputsNames, value:boolean}>) => {
      state[action.payload.key].error = action.payload.value
    },
    setHasChange: (state, action:PayloadAction<{key:InputsNames, value:boolean}>) => {
      state[action.payload.key].has_changed = action.payload.value
    },
    clearForm: (state) => {      
      state.email.has_changed = false
      state.email.error = false
      
      state.password.has_changed = false
      state.password.error = false

      state.name.has_changed = false
      state.name.error = false
    }
  },
});


export const { setKeyValue, setKeyError, setHasChange, clearForm } = profileInputsSlice.actions;

export default profileInputsSlice;