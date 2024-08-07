import { createSelector } from '@reduxjs/toolkit';
import { RootStoreState } from '../store';
import { IIngredient } from '../../share/typing';
import { dataApi } from '../apis/ingredients/ingredients';

const selectIngredientsState = (state: RootStoreState) => {
    const ingredinentsState = state[dataApi.reducerPath];
    const store_key = Object.keys(ingredinentsState.queries).find( key => key.includes("getIngredients"))
    return (ingredinentsState.queries[store_key ?? "getIngredients(undefined)"])
}

export const selectIngredientTypes = createSelector(
    selectIngredientsState,
    (ingredinentsState) => {
        const data = (ingredinentsState?.data?? []) as IIngredient[]
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

export const selectIngredientsByType = createSelector(
    selectIngredientsState, (state: RootStoreState, type: string) => type,
    (ingredinentsState, type) => {
        const data = (ingredinentsState?.data?? []) as IIngredient[]
        return data.filter( ingredient => ingredient.type === type )
    }
);

export const selectIngredientById = createSelector(
    selectIngredientsState, (state: RootStoreState, ingredient_id: string|undefined) => ingredient_id,
    (ingredinentsState, ingredient_id) => {
        const data = (ingredinentsState?.data?? []) as IIngredient[]
        return data.find( ingredient => ingredient._id === ingredient_id )
    }
);