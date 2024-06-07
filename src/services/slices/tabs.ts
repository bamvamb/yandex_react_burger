import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface TabState {
  elements_top: {
    [key:string]: number
  }
  container_scroll_top: number
}

const initialState:TabState = {
  elements_top: {},
  container_scroll_top: 0
}


export const tagsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setContainerScrollTop: (state, action:PayloadAction<number>) => {
      state.container_scroll_top = action.payload
    },
    setElementPosition: (state, action:PayloadAction<{
      type: string,
      top: number
    }>) => {
      state.elements_top[action.payload.type] = action.payload.top
    }
  },
});


export const { setContainerScrollTop, setElementPosition } = tagsSlice.actions;

export default tagsSlice;