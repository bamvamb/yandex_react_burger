import { selectPrice, selectIngridientsCount, selectIngredientIds } from './burger';
import { initialState, burgerSlice } from '../slices/burger/burger';

describe('selectors', () => {
  it('selectPrice', () => {
    const state = {
      [burgerSlice.reducerPath]:{ 
        ...initialState, core: [{ price: 10 }, { price: 20 }] 
    }};
    expect(selectPrice(state)).toBe(30);
  });

  it('selectPrice with bun', () => {
    const state = {
      [burgerSlice.reducerPath]:{ 
        ...initialState, 
        core: [{ price: 10 }, { price: 20 }], bun: { price: 5 } 
    }};
    expect(selectPrice(state)).toBe(40);
  });

  it('selectIngridientsCount', () => {
    const state = {
      [burgerSlice.reducerPath]:{ 
        ...initialState, core: [{ _id: '1' }, { _id: '2' }, { _id: '1' }] 
      }
    };
    expect(selectIngridientsCount(state)).toEqual({ '1': 2, '2': 1 });
  });

  it('selectIngridientsCount with bun', () => {
    const state = {
      [burgerSlice.reducerPath]:{ 
        ...initialState, core: [{ _id: '1' }, { _id: '2' }], bun: { _id: '3' } 
      }
    };
    expect(selectIngridientsCount(state)).toEqual({ '1': 1, '2': 1, '3': 2 });
  });

  it('selectIngredientIds', () => {
    const state = {
      [burgerSlice.reducerPath]:{ 
        ...initialState, core: [{ _id: '1' }, { _id: '2' }] 
      }
    };
    expect(selectIngredientIds(state)).toEqual(['1', '2']);
  });

  it('selectIngredientIds with bun', () => {
    const state = {
      [burgerSlice.reducerPath]:{ 
        ...initialState, core: [{ _id: '1' }, { _id: '2' }], bun: { _id: '3' } 
      }
    };
    expect(selectIngredientIds(state)).toEqual(['3', '3', '1', '2']);
  });
});