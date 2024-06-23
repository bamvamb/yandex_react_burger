import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface TabState {
  elementsTop: {
    [key:string]: number
  }
  containerScrolTop: number
}

const initialState:TabState = {
  elementsTop: {},
  containerScrolTop: 0
}


export const tagsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setContainerScrollTop: (state, action:PayloadAction<number>) => {
      state.containerScrolTop = action.payload
    },
    setElementPosition: (state, action:PayloadAction<{
      type: string,
      top: number
    }>) => {
      state.elementsTop[action.payload.type] = action.payload.top
    }
  },
});


export const { setContainerScrollTop, setElementPosition } = tagsSlice.actions;

export default tagsSlice;