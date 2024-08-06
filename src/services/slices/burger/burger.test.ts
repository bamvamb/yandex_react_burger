
import { burgerSlice, initialState } from './burger';
import { IIngredient, ConstructorIngredient } from '../../../share/typing';

export const defaultBun: IIngredient = {
  _id: '1', 
  name: 'булка', 
  type: 'bun',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 1,
  image: '',
  image_mobile: '',
  image_large: '',
  __v: 2
}

export const defaultMain: IIngredient = {
  _id: '2', 
  name: 'основной ингредиент', 
  type: 'main',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 0,
  image: '',
  image_mobile: '',
  image_large: '',
  __v: 2
}

export const defaultSause: IIngredient = {
  _id: '3', 
  name: 'соус', 
  type: 'sause',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 0,
  image: '',
  image_mobile: '',
  image_large: '',
  __v: 2
}

describe('burgerSlice', () => {
  it('should return the initial state', () => {
    const action = { type: '' }
    expect(burgerSlice.reducer(undefined, action)).toEqual(initialState);
  });


  it('should handle the changeBun action', () => {
    const bun: IIngredient = { ...defaultBun };

    const action = burgerSlice.actions.changeBun(bun);
    const state = burgerSlice.reducer(initialState, action);

    expect(state.bun).toEqual(bun);
  });


  it('should handle the clearBun action', () => {
    const state = { ...initialState, bun: defaultBun };

    const action = burgerSlice.actions.clearBun();
    const newState = burgerSlice.reducer(state, action);

    expect(newState.bun).toBeNull();
  });


  it('should handle the addCoreIngredient action', () => {
    const ingredient: IIngredient = {...defaultMain};

    const action = burgerSlice.actions.addCoreIngredient({ idx: 0, ingredient });
    const state = burgerSlice.reducer(initialState, action);

    expect(
      formatCoreIngrediends(state.core)
    ).toEqual([addUIDToIngredient(ingredient)]);
  });


  it('should handle the setCoreIngredient action', () => {
    const ingredient1: IIngredient = {...defaultMain};
    const ingredient2: IIngredient = {...defaultSause};

    const state = { ...initialState, core: [addUIDToIngredient(ingredient1), addUIDToIngredient(ingredient2)] };

    const action = burgerSlice.actions.setCoreIngredient({ startIdx: 0, endIdx: 1 });
    const newState = burgerSlice.reducer(state, action);
    
    expect(formatCoreIngrediends(newState.core)).toEqual([addUIDToIngredient(ingredient2), addUIDToIngredient(ingredient1)]);
  });


  it('should handle the deleteCoreIngredient action', () => {
    const ingredient: IIngredient = {...defaultMain};
    const state = { ...initialState, core: [addUIDToIngredient(ingredient)] };

    const action = burgerSlice.actions.deleteCoreIngredient(0);
    const newState = burgerSlice.reducer(state, action);

    expect(newState.core).toEqual([]);
  });


  it('should handle the clear action', () => {
    const ingredient: IIngredient = {...defaultMain};
    const bun: IIngredient = {...defaultBun}

    const state = { ...initialState, bun, core: [addUIDToIngredient(ingredient)] };
    const action = burgerSlice.actions.clear();
    const newState = burgerSlice.reducer(state, action);

    expect(newState).toEqual(initialState);
  });


  it('should handle the createRandom action', () => {

    const ingredients: IIngredient[] = [
      {...defaultBun},
      {...defaultMain},
      {...defaultSause}
    ];

    const action = burgerSlice.actions.createRandom(ingredients);
    const state = burgerSlice.reducer(initialState, action);

    expect(state.bun).not.toBeNull();
    expect(state.core).not.toEqual([]);
  });

});

const addUIDToIngredient = (ingredient: IIngredient): ConstructorIngredient => ({ ...ingredient, uid: '123' });
const formatCoreIngrediends = (ingredients: IIngredient[]): IIngredient[] => ingredients.map(addUIDToIngredient) 