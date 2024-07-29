import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi } from '@reduxjs/toolkit/query/react';
import {lsStorage} from '../../../share/browser-storage';
import { IResponseAuthMessage, IResponseMessage, IUserResponse } from './types';
import { refreshTokensInStorage, deleteUserFromStorage} from '../../tokens';
import { apiUrl, jsonHeader, protectedApiRoutes } from '../../constants/varaibles';
import { baseQuery, checkJwtExpired, transformAuthResponse } from '../../utils';


export const getReauthBaseQuery = (_baseQuery:BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
>) => {
  const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    let result = await _baseQuery(args, api, extraOptions);   
    const path = typeof args === "string" ? args : args?.url.replace(apiUrl, "")
    const isProtected = protectedApiRoutes.includes(path)
    if (result.error && isProtected && checkJwtExpired(result.error)) {
      const refreshTokenMutation = authApi.endpoints.refreshToken.initiate({})
      const resp = await api.dispatch(refreshTokenMutation)
      if(resp.data?.success){
        result = await _baseQuery(args, api, extraOptions);
      }
      if(resp.error){
        const logoutMutation =  authApi.endpoints.logOut.initiate({})
        const resp = await api.dispatch(logoutMutation)
        if(!resp.data?.success){
          deleteUserFromStorage()
        }
        window.location.href = "/login"
      }
    }
    return result
  }
  return baseQueryWithReauth
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: getReauthBaseQuery(
      baseQuery
    ),
    endpoints: (builder) => ({
      logOut: builder.mutation<IResponseMessage,{}>({
        query: () => ({
            url: 'auth/logout', 
            method: 'POST', 
            body: {
              token: lsStorage.get("refreshToken")
            },
            headers: jsonHeader
        }),
        transformResponse: (response:IResponseMessage):IResponseMessage => {
          if(response.success){
            deleteUserFromStorage()
          }
          return response
        }
      }),
      patchProfile: builder.mutation<IUserResponse,{
        email:string,
        name:string,
        password?:string
      }>({
        query: (formData) => ({
            url: 'auth/user', 
            method: 'PATCH', 
            body: formData,
            headers: jsonHeader
        })
      }),
      getProfile: builder.query<{
        success: boolean,
        user: {
          email: string,
          name: string
        }
      }, void>({
        query: () => 'auth/user'
      }),
      registerUser: builder.mutation<IResponseMessage,{
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
        transformResponse: (response:IResponseAuthMessage):IResponseMessage => transformAuthResponse(response, {
          success_message: "User successfully registered",
          error_message: "Error occured on register action"
        })
      }),
      refreshToken: builder.mutation<IResponseMessage,{}>({
        query: () => ({
            url: 'auth/token', 
            method: 'POST', 
            body: {
              token: lsStorage.get("refreshToken")
            },
            headers: jsonHeader
        }),
        transformResponse: (response:{
          success: boolean,
          accessToken: string,
          refreshToken: string
        }):IResponseMessage => {
          if(response.success){
            refreshTokensInStorage(response.accessToken, response.refreshToken)
            return {
              success: response.success,
              message: "succsessfully refresh tokens"
            }
          } else {
            return {
              success: response.success,
              message: "error occured on trying to refresh token"
            }
          }
        }
      }),
      forgotPassword: builder.mutation<IResponseMessage,{
        email:string
      }>({
        query: (formData) => ({
            url: 'password-reset', 
            method: 'POST', 
            body: formData,
            headers: jsonHeader
        })
      }),
      resetPassword: builder.mutation<IResponseMessage,{
        password:string,
        token:string
      }>({
        query: (formData) => ({
            url: 'password-reset/reset', 
            method: 'POST', 
            body: formData,
            headers: jsonHeader
        })
      }),
      logIn: builder.mutation<IResponseMessage,{
        email: string, 
        password: string
      }>({
        query: (formData) => ({
            url: 'auth/login', 
            method: 'POST', 
            body: formData,
            headers: jsonHeader
        }),
        transformResponse: (response:IResponseAuthMessage):IResponseMessage => transformAuthResponse(response, {
          success_message: "User successfully logged in",
          error_message: "Error occured on login action"
        })
      }),
    })
});

export const { 
  useLogOutMutation, 
  usePatchProfileMutation,
  useGetProfileQuery,
  useRegisterUserMutation,
  useLogInMutation,   
  useForgotPasswordMutation, 
  useResetPasswordMutation,
} = authApi;

export default authApi