import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {lsStorage} from '../../share/browser-storage';
import { SerializedError } from '@reduxjs/toolkit';

export const apiUrl = 'https://norma.nomoreparties.space/api/'

export interface ResponseMessage {
  success: boolean,
  message: string
}

export interface ResponsePatchProfile {
  user: {
    email: string,
    name: string
  },
  success: boolean
}

export interface ResponseAuthMessage {
  success: boolean,
  user: {
    email: string,
    name: string
  },
  accessToken: string,
  refreshToken: string
}

export const lsUserKeys = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  username: "username",
  email: "email"
}

export const getLSUserInfo = () => {
  const name = lsStorage.get(lsUserKeys.username)
  const email = lsStorage.get(lsUserKeys.email)
  if(name && email){
    return {name, email}
  }
}

export const refreshTokensInStorage = (accessToken: string, refreshToken: string) => {
  lsStorage.set(lsUserKeys.accessToken, accessToken.split("Bearer ")[1])
  lsStorage.set(lsUserKeys.refreshToken, refreshToken)
}

const setUserInStorage = ({user, accessToken, refreshToken}:ResponseAuthMessage) => {
  lsStorage.set(lsUserKeys.email, user.email)
  lsStorage.set(lsUserKeys.username, user.name)
  refreshTokensInStorage(accessToken, refreshToken)
}

export const deleteUserFromStorage = () => Object.keys(lsUserKeys).forEach( key => lsStorage.delete(key))

export const getErrorMessage = (error: FetchBaseQueryError | SerializedError | undefined) => {
  if(!error) return
  if('data' in error && typeof error.data === 'object' && 
    error.data && 'message' in error.data){
    return error.data?.message as string
  }
  return null
}

const jwt_expired_403 = "jwt expired"
const jwt_malformed_403 = "jwt malformed"

export const check_jwt_expired = (error: FetchBaseQueryError) => {
  if(!error) return false
  if(error.status === 401) return true
  const error_message = getErrorMessage(error)
  if(error.status === 403 && error_message && [
    jwt_expired_403, jwt_malformed_403
  ].includes(error_message)) {
    return true
  }
}

export const transformAuthResponse = (
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

const protectedApiRoutes:string[] = [
  "auth/user",
  "auth/logout",
  "orders"
]

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
    if (result.error && isProtected && check_jwt_expired(result.error)) {
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
      logOut: builder.mutation<ResponseMessage,{}>({
        query: () => ({
            url: 'auth/logout', 
            method: 'POST', 
            body: {
              token: lsStorage.get("refreshToken")
            },
            headers: jsonHeader
        }),
        transformResponse: (response:ResponseMessage):ResponseMessage => {
          if(response.success){
            deleteUserFromStorage()
          }
          return response
        }
      }),
      patchProfile: builder.mutation<ResponsePatchProfile,{
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
      refreshToken: builder.mutation<ResponseMessage,{}>({
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
        }):ResponseMessage => {
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