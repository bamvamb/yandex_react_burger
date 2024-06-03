import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectBurgerState = (state: RootState) => state.burger;

export const selectPrice = createSelector(
  selectBurgerState,
  (burgerState) =>  burgerState.core.reduce( 
    (accumulator, currentValue) => accumulator + currentValue.price, 
    (burgerState.bun ? burgerState.bun.price*2 : 0)
  )
);

interface ingredientsCount {
  [key: string]: number
}

export const selectIngridientsCount = createSelector(
  selectBurgerState,
  (burgerState):ingredientsCount => burgerState.core.reduce( 
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