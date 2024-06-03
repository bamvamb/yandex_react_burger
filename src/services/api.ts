import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Ingredient,  ingredientLoc} from '../share/typing';

export interface baseApiResponse {
    success: Boolean,
    data: Ingredient[]
}

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://norma.nomoreparties.space/api/' }),
    endpoints: (builder) => ({
      getIngredients: builder.query<Ingredient[], void>({
        query: () => 'ingredients',
        transformResponse: (response: baseApiResponse) => {
            if(response.success){
                return response.data.map(ingredientLoc)
            } else {
                return []
            }
        }
      }),
    })
});


export const { useGetIngredientsQuery } = baseApi;