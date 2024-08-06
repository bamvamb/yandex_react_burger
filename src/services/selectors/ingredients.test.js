import { 
    selectIngredientTypes, 
    selectIngredientsByType, 
    selectIngredientById 
} from './ingredients';
import { dataApi } from '../apis/ingredients/ingredients';
  
describe('ingredientsSelectors', () => {
    const mockState = {
        [dataApi.reducerPath]: {
            queries: {
                'getIngredients(undefined)': {
                    data: [
                        { _id: '1', type: 'bun' },
                        { _id: '2', type: 'sauce' },
                        { _id: '3', type: 'main' },
                        { _id: '4', type: 'main' },
                    ],
                },
            },
        },
    };

    const emptyState = {
        [dataApi.reducerPath]: {
            queries: {
                'getIngredients(undefined)': {
                    data: [],
                },
            },
        },
    };
  
    describe('selectIngredientTypes', () => {
        it('should return an array of unique ingredient types', () => {
            const result = selectIngredientTypes(mockState);
            expect(result).toEqual(['bun', 'sauce', 'main']);
        });
        it('should return an empty array if no data is available', () => {
            const result = selectIngredientTypes(emptyState);
            expect(result).toEqual([]);
        });
    });
  
    describe('selectIngredientsByType', () => {
      it('should return an array of ingredients of the specified type', () => {
        const result = selectIngredientsByType(mockState, 'main');
        expect(result).toEqual([
          { _id: '3', type: 'main' },
          { _id: '4', type: 'main' },
        ]);
      });
  
      it('should return an empty array if no ingredients of the specified type are found', () => {
        const result = selectIngredientsByType(mockState, 'unknown');
        expect(result).toEqual([]);
      });
    });
  
    describe('selectIngredientById', () => {
      it('should return the ingredient with the specified id', () => {
        const result = selectIngredientById(mockState, '2');
        expect(result).toEqual({ _id: '2', type: 'sauce' });
      });
  
      it('should return undefined if no ingredient with the specified id is found', () => {
        const result = selectIngredientById(mockState, 'unknown');
        expect(result).toBeUndefined();
      });
    });
});