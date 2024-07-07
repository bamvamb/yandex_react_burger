import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TInputsNames = "name"|"email"|"password"

export interface IInputState {
  error: boolean;
  value: string;
  changed: boolean;
}
export type TInputsState = {
  [propName in TInputsNames]: IInputState
};

const defaultInputState:IInputState = {
  value: "",
  error: false,
  changed: false
}

const initialState:TInputsState = {
  name: {...defaultInputState},
  email: {...defaultInputState},
  password: {...defaultInputState},
}

export const profileInputsSlice = createSlice({
  name: 'profileForm',
  initialState,
  reducers: {
    setKeyValue: (state, action:PayloadAction<{key:TInputsNames, value:string}>) => {
      state[action.payload.key].value = action.payload.value
      state[action.payload.key].error = false
    },
    setKeyError: (state, action:PayloadAction<{key:TInputsNames, value:boolean}>) => {
      state[action.payload.key].error = action.payload.value
    },
    setHasChange: (state, action:PayloadAction<{key:TInputsNames, value:boolean}>) => {
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