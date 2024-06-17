import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type InputsNames = "name"|"email"|"password"

export interface InputsState {
  values: {
    name: string,
    email: string,
    password: string,
  },
  errors: {
    name: boolean,
    email: boolean,
    password: boolean,
  }
}

const initialState:InputsState = {
  values: {
    name: "",
    email: "",
    password: ""
  },
  errors: {
    name: false,
    email: false,
    password: false,
  }
}

//TODO check input values


export const profileInputsSlice = createSlice({
  name: 'profileInputs',
  initialState,
  reducers: {
    setKeyValue: (state, action:PayloadAction<{key:InputsNames, value:string}>) => {
      state.values[action.payload.key] = action.payload.value
    },
    setKeyError: (state, action:PayloadAction<{key:InputsNames, value:boolean}>) => {
      state.errors[action.payload.key] = action.payload.value
    },
  },
});


export const { setKeyValue, setKeyError } = profileInputsSlice.actions;

export default profileInputsSlice;