import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Ingredient,  ingredientLoc} from '../../share/typing';
import { ls_storage } from '../../share/browser_storage/browser_storage';

export interface getIngredientsResponse {
    success: Boolean,
    data: Ingredient[]
}

export interface createOrderResponse {
  success: Boolean,
  name: string,
  order: {
    number: Number
  }
}

export const dataApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ 
      baseUrl: 'https://norma.nomoreparties.space/api/',
      prepareHeaders: (headers) => {
        const token = ls_storage.get("accessToken")
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
      },
    }),
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
      
    })
});


export const { useGetIngredientsQuery, useCreateOrderMutation } = dataApi;