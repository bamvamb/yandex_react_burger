import { createSelector } from '@reduxjs/toolkit';
import { RootStoreState } from '../store';
import { IBurgerState } from '../slices/burger/types';

const selectBurgerState = (state: RootStoreState):IBurgerState => state.burger;

export const selectPrice = createSelector(
  selectBurgerState,
  (burgerState) =>  burgerState.core.reduce( 
    (accumulator, currentValue) => accumulator + currentValue.price, 
    (burgerState.bun ? burgerState.bun.price*2 : 0)
  )
);

interface IIngredientsCount {
  [key: string]: number
}

export const selectIngridientsCount = createSelector(
  selectBurgerState,
  (burgerState):IIngredientsCount => burgerState.core.reduce( 
    (accumulator, currentValue) => {
      if(accumulator[currentValue._id]){
        accumulator[currentValue._id] += 1
      } else {
        accumulator[currentValue._id] = 1
      }
      return accumulator
    }, 
    (burgerState.bun ? {[burgerState.bun._id]: 2} : {})
  )
);

export const selectIngredientIds = createSelector(
  selectBurgerState,
  (burgerState) => burgerState.core.reduce( 
    (accumulator, currentValue) => [...accumulator, currentValue._id], 
    (burgerState.bun ? [burgerState.bun._id, burgerState.bun._id] : [])
  )
);
