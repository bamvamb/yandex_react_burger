import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Ingredient,  ingredientLoc} from '../../share/typing';
import { ls_storage } from '../../share/browser_storage';
import { getReauthBaseQuery, ls_user_keys } from './auth';


export interface getIngredientsResponse {
    success: boolean,
    data: Ingredient[]
}

export interface createOrderResponse {
  success: boolean,
  name: string,
  order: {
    number: number
  }
}

const baseQuery = fetchBaseQuery({ 
  baseUrl: 'https://norma.nomoreparties.space/api/',
  prepareHeaders: (headers) => {
    const token = ls_storage.get(ls_user_keys.accessToken)
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
      getIngredients: builder.query<Ingredient[], void>({
        query: () => 'ingredients',
        transformResponse: (response: getIngredientsResponse) => {
            if(response.success){
                return response.data.map(ingredientLoc)
            } else {
                return []
            }
        }
      }),
      createOrder: builder.mutation<createOrderResponse, string[]>({
        query: (ingredients_ids) => ({ 
            url: 'orders', 
            method: 'POST', 
            body: {ingredients: ingredients_ids},
            headers: {
              'Content-Type': 'application/json',
            }
        })
      }),
      ingredientDetails: builder.query<Ingredient|null, {ingredient_id: string|undefined}>({
        query: () => 'ingredients',
        transformResponse: (response: getIngredientsResponse, undefined, data) => {
            if(response.success && data && data.ingredient_id){
              const ingredient =  response.data.find( ingredient => ingredient._id === data.ingredient_id )
              return ingredient ? ingredientLoc(ingredient) : null
            } else {
              return null
            }
          }
        })
    })
});


export const { useGetIngredientsQuery, useCreateOrderMutation, useIngredientDetailsQuery } = dataApi;