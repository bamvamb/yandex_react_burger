import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {ls_storage} from '../../share/browser_storage/browser_storage';

export interface ResponseMessage {
  success: Boolean,
  message: string
}

export interface ResponseAuthMessage {
  success: Boolean,
  user: {
    email: string,
    name: string
  },
  accessToken: string,
  refreshToken: string
}

const setUserInStorage = ({user, accessToken, refreshToken}:ResponseAuthMessage) => {
  ls_storage.set("email", user.email)
  ls_storage.set("username", user.name)
  ls_storage.set("accessToken", accessToken.split("Bearer ")[1])
  ls_storage.set("refreshToken", refreshToken)
}

const transformAuthResponse = (
  response:ResponseAuthMessage, 
  messages:{
    success_message: string,
    error_message: string
  }):ResponseMessage => {
  if(response.success){
    setUserInStorage(response)
    return {
      success: response.success,
      message: messages.success_message
    }
  } else {
    return {
      success: response.success,
      message: messages.error_message
    }
  }
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
        }),
        transformResponse: (response:ResponseAuthMessage):ResponseMessage => transformAuthResponse(response, {
          success_message: "User successfully registered",
          error_message: "Error occured on register action"
        })
      }),
      logIn: builder.mutation<ResponseMessage,{
        email: string, 
        password: string
      }>({
        query: (formData) => ({
            url: 'auth/login', 
            method: 'POST', 
            body: formData,
            headers: jsonHeader
        }),
        transformResponse: (response:ResponseAuthMessage):ResponseMessage => transformAuthResponse(response, {
          success_message: "User successfully logged in",
          error_message: "Error occured on login action"
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

export const { useRegisterUserMutation, useLogInMutation, useForgotPasswordMutation, useResetPasswordMutation } = authApi;