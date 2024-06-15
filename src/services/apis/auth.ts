import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ResponseMessage {
  success: Boolean,
  message: string
}

const jsonHeader = {
  'Content-Type': 'application/json',
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://norma.nomoreparties.space/api/' }),
    endpoints: (builder) => ({
      registerUser: builder.mutation<ResponseMessage,{
        email: string, 
        password: string, 
        name: string 
      }>({
        query: (formData) => ({
            url: 'auth/register', 
            method: 'POST', 
            body: formData,
            headers: jsonHeader
        })
      }),
      forgotPassword: builder.mutation<ResponseMessage,{
        email:string
      }>({
        query: (formData) => ({
            url: 'password-reset', 
            method: 'POST', 
            body: formData,
            headers: jsonHeader
        })
      }),
      resetPassword: builder.mutation<ResponseMessage,{
        password:string,
        token:string
      }>({
        query: (formData) => ({
            url: 'password-reset/reset', 
            method: 'POST', 
            body: formData,
            headers: jsonHeader
        })
      })
    })
});

//const [createOrder,{data:order, isSuccess, isError, isLoading}] = useCreateOrderMutation()

export const { useRegisterUserMutation, useForgotPasswordMutation, useResetPasswordMutation } = authApi;