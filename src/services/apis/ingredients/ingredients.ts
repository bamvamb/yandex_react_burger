import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IIngredient,  ingredientLoc} from '../../../share/typing';
import { lsStorage } from '../../../share/browser-storage';
import { getReauthBaseQuery } from '../auth/auth';
import { lsUserKeys } from '../../tokens';
import { apiUrl } from '../../constants/varaibles';
import { IGetIngredientsResponse, ICreateOrderResponse } from './types';

const baseQuery = fetchBaseQuery({ 
  baseUrl: apiUrl,
  prepareHeaders: (headers) => {
    const token = lsStorage.get(lsUserKeys.accessToken)
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
})

export const dataApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: getReauthBaseQuery(
      baseQuery
    ),
    endpoints: (builder) => ({
      getIngredients: builder.query<IIngredient[], void>({
        query: () => 'ingredients',
        transformResponse: (response: IGetIngredientsResponse) => {
            if(response.success){
                return response.data.map(ingredientLoc)
            } else {
                return []
            }
        }
      }),
      createOrder: builder.mutation<ICreateOrderResponse, string[]>({
        query: (ingredients_ids) => ({ 
            url: 'orders', 
            method: 'POST', 
            body: {ingredients: ingredients_ids},
            headers: {
              'Content-Type': 'application/json',
            }
        })
      }),
      ingredientDetails: builder.query<IIngredient|null, {ingredient_id: string|undefined}>({
        query: () => 'ingredients',
        transformResponse: (response: IGetIngredientsResponse, _, data) => {
          if(response.success && data && data.ingredient_id){
            const ingredient =  response.data.find( ingredient => ingredient._id === data.ingredient_id )
            return ingredient ? ingredientLoc(ingredient) : null
          } else {
            return null
          }
        }
      }),

    })
});


export const { useGetIngredientsQuery, useCreateOrderMutation, useIngredientDetailsQuery } = dataApi;