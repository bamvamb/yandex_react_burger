import { createSelector } from '@reduxjs/toolkit';
import { RootStoreState } from '../store';
import { Ingredient } from '../../share/typing';
import { baseApi } from '../api';

const selectIngredientsState = (state: RootStoreState) => state[baseApi.reducerPath];

export const selectIngredientTypes = createSelector(
    selectIngredientsState,
    (ingredinentsState) => {
        const store_key = Object.keys(ingredinentsState.queries).find( key => key.includes("getIngredients"))
        const data = (ingredinentsState.queries[store_key ?? "getIngredients(undefined)"]?.data?? []) as Ingredient[]
        return data.reduce( 
            (accumulator, currentValue) => {
                if(!accumulator.includes(currentValue.type)){
                    accumulator.push(currentValue.type)
                } 
                return accumulator
            }, [] as string[]
        )
    }
  );

