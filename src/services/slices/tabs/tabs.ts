import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITabState } from './types';

const initialState:ITabState = {
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