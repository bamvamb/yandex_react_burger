import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface InputsState {
    name: string,
    email: string,
    password: string,
}

const initialState:InputsState = {
  name: "",
  email: "",
  password: ""
}


export const profileInputsSlice = createSlice({
  name: 'profileInputs',
  initialState,
  reducers: {
    setKey: (state, action:PayloadAction<{key:keyof InputsState, value:string}>) => {
      state[action.payload.key] = action.payload.value
    }
  },
});


export const { setKey } = profileInputsSlice.actions;

export default profileInputsSlice;