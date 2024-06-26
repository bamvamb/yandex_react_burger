import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type InputsNames = "name"|"email"|"password"

export interface InputState {
  error: boolean;
  value: string;
  changed: boolean;
}
export type InputsState = {
  [propName in InputsNames]: InputState
};

const defaultInputState:InputState = {
  value: "",
  error: false,
  changed: false
}

const initialState:InputsState = {
  name: {...defaultInputState},
  email: {...defaultInputState},
  password: {...defaultInputState},
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
      state[action.payload.key].changed = action.payload.value
    },
    clearForm: (state) => {      
      state.email.changed = false
      state.email.error = false
      
      state.password.changed = false
      state.password.error = false

      state.name.changed = false
      state.name.error = false
    }
  },
});


export const { setKeyValue, setKeyError, setHasChange, clearForm } = profileInputsSlice.actions;

export default profileInputsSlice;