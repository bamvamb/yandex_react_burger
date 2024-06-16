import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Ingredient,  ingredientLoc} from '../../share/typing';
import { ls_storage } from '../../share/browser_storage/browser_storage';
import authApi, {ls_user_keys} from './auth';

import type { 
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError 
} from '@reduxjs/toolkit/query/react';

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

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshTokenMutation =  authApi.endpoints.refreshToken.initiate({})
    const resp = await api.dispatch(refreshTokenMutation)
    if(resp.data?.success){
      result = await baseQuery(args, api, extraOptions);
    }
    if(resp.error){
      window.location.href = "/login"
      //TODO history apply to redirect after relogin
    }
  }
  return result
}

export const dataApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithReauth,
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