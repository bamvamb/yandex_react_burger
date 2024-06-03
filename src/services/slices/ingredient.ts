import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../../share/typing';


export interface IngredientState {
  ingredient: Ingredient|null;
}


const initialState: IngredientState = {
  ingredient: null
};


export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {
    select: (state, action:PayloadAction<Ingredient>) => {
        state.ingredient = action.payload
    },
    clear: (state) => {
        state.ingredient = null
    }
  },
});


export const { select, clear } = ingredientSlice.actions;

export default ingredientSlice;