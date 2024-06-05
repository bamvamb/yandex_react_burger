import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../../share/typing';


export interface BurgerState {
  bun: Ingredient|null,
  core: Ingredient[]
}

const initialState: BurgerState = {
  bun: null,
  core: []
};

const getRandomNumber = (max:number, min: number=0) => {
    return min + Math.round( Math.random() * (max-min))
}

const genRandomBurger = (
    ingredients:Ingredient[],
    max_sauses:number=2, 
    min_sauses: number=1,
    max_mains:number=5,
    min_mains:number=3
  ):BurgerState => {
    if( ingredients && ingredients.length !== 0){
      const buns = ingredients.filter( (ingredient) => ingredient.type === "bun")
      const sauses = ingredients.filter( (ingredient) => ingredient.type === "sauce" )
      const mains = ingredients.filter( (ingredient) => ingredient.type === "main")
      const current_bun = buns[getRandomNumber(buns.length-1)]
      let mains_count = getRandomNumber(max_mains, min_mains)
      let sauses_count = getRandomNumber(max_sauses, min_sauses)
      const core = []
      while( mains_count > 0 || sauses_count > 0){
        if(
          (sauses_count === 0 || getRandomNumber(1)) && mains_count > 0
        ){
            core.push( mains[getRandomNumber(mains.length - 1)])
          mains_count -= 1
        } else {
            core.push( sauses[getRandomNumber(sauses.length - 1)])
          sauses_count -= 1
        }
      }
      return {
        bun: current_bun,
        core
      }
    } else {
      return {
        bun: null,
        core: []
      }
    }
}


export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    changeBun: (state, action:PayloadAction<Ingredient>) => {
        state.bun = action.payload
    },
    clearBun: (state) => {
        state.bun = null
    },
    setCoreIngredient: (state, action:PayloadAction<{
      start_idx: number,
      end_idx: number
    }>) => {
        const new_core = state.core.slice()
        const ingredient = new_core.splice(action.payload.start_idx, 1)[0]
        new_core.splice(action.payload.end_idx, 0, ingredient)
        state.core = new_core
    },
    addCoreIngredient: (state, action:PayloadAction<{
      idx: number,
      ingredient: Ingredient
    }>) => {
        const new_core = state.core.slice()
        new_core.splice(action.payload.idx, 0, action.payload.ingredient)
        state.core = new_core
    },
    deleteCoreIngredient: (state, action:PayloadAction<number>) => {
        const new_core = state.core.slice()
        new_core.splice(action.payload, 1)
        state.core = new_core
    },
    clear: (state) => {
        state.bun = null
        state.core = []
    },
    createRandom: (state, action:PayloadAction<Ingredient[]>) => {
        const {bun, core} = genRandomBurger(action.payload)
        state.bun = bun;
        state.core = core;
    }
  },
});


export const { changeBun, clearBun, addCoreIngredient, setCoreIngredient, deleteCoreIngredient, createRandom, clear } = burgerSlice.actions;

export default burgerSlice;