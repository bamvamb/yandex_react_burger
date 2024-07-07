import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConstructorIngredient, IIngredient } from '../../share/typing';
import { v4 as uuid4 } from 'uuid';

export interface BurgerState {
  bun: IIngredient|null,
  core: ConstructorIngredient[]
}

const initialState: BurgerState = {
  bun: null,
  core: []
};

const getRandomNumber = (max:number, min: number=0):number => {
    return min + Math.round( Math.random() * (max-min))
}

const genRandomBurger = (
    ingredients:IIngredient[],
    max_sauses:number=2, 
    min_sauses: number=1,
    max_mains:number=5,
    min_mains:number=3
  ):BurgerState => {
    if( ingredients && ingredients.length !== 0){
      const buns = ingredients.filter( (ingredient) => ingredient.type === "bun")
      const sauses = ingredients.filter( (ingredient) => ingredient.type === "sauce" )
      const mains = ingredients.filter( (ingredient) => ingredient.type === "main")
      const currentBun = buns[getRandomNumber(buns.length-1)]
      let mainsCount = getRandomNumber(max_mains, min_mains)
      let sausesCount = getRandomNumber(max_sauses, min_sauses)
      const core = []
      while( mainsCount > 0 || sausesCount > 0){
        if(
          (sausesCount === 0 || getRandomNumber(1)) && mainsCount > 0
        ){
            core.push( mains[getRandomNumber(mains.length - 1)])
          mainsCount -= 1
        } else {
            core.push( sauses[getRandomNumber(sauses.length - 1)])
          sausesCount -= 1
        }
      }
      return {
        bun: currentBun,
        core: core.map(addUIDToIngredient)
      }
    } else {
      return {
        bun: null,
        core: []
      }
    }
}

const addUIDToIngredient = (ingredient: IIngredient):ConstructorIngredient => ({...ingredient, uid:uuid4()})

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    changeBun: (state, action:PayloadAction<IIngredient>) => {
        state.bun = action.payload
    },
    clearBun: (state) => {
        state.bun = null
    },
    setCoreIngredient: (state, action:PayloadAction<{
      startIdx: number,
      endIdx: number
    }>) => {
        const new_core = state.core.slice()
        const ingredient = new_core.splice(action.payload.startIdx, 1)[0]
        new_core.splice(action.payload.endIdx, 0, ingredient)
        state.core = new_core
    },
    addCoreIngredient: (state, action:PayloadAction<{
      idx: number,
      ingredient: IIngredient
    }>) => {
        const new_core = state.core.slice()
        const new_ingredient = addUIDToIngredient(action.payload.ingredient)
        new_core.splice(action.payload.idx, 0, new_ingredient)
        state.core = new_core
    },
    deleteCoreIngredient: (state, action:PayloadAction<number>) => {
        const newCore = state.core.slice()
        newCore.splice(action.payload, 1)
        state.core = newCore
    },
    clear: (state) => {
        state.bun = null
        state.core = []
    },
    createRandom: (state, action:PayloadAction<IIngredient[]>) => {
        const {bun, core} = genRandomBurger(action.payload)
        state.bun = bun;
        state.core = core;
    }
  },
});


export const { changeBun, clearBun, addCoreIngredient, setCoreIngredient, deleteCoreIngredient, createRandom, clear } = burgerSlice.actions;

export default burgerSlice;