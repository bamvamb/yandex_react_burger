import { FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query"

import { lsStorage } from "../share/browser-storage"
import { lsUserKeys, setUserInStorage } from "./tokens"
import { backendUrl, jwt_expired_403, jwt_malformed_403, protectedApiRoutes } from "./constants/varaibles"
import { SerializedError } from "@reduxjs/toolkit"
import { IResponseAuthMessage, IResponseMessage } from "./apis/auth/types"

export const check_jwt_expired = (error: FetchBaseQueryError):boolean => {
    if(!error) return false
    if(error.status === 401) return true
    const error_message = getErrorMessage(error)
    if(error.status === 403 && error_message && [
      jwt_expired_403, jwt_malformed_403
    ].includes(error_message)) {
      return true
    }
    return false
  }

export const getErrorMessage = (error: FetchBaseQueryError | SerializedError | undefined): string | null => {
    if(!error) return null
    if('data' in error && typeof error.data === 'object' && 
      error.data && 'message' in error.data){
      return error.data?.message as string
    }
    return null
}

export const baseQuery = fetchBaseQuery({ 
    baseUrl: `${backendUrl}/api/`,
    prepareHeaders: (headers) => {
      const token = lsStorage.get(lsUserKeys.accessToken)
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
})

export const transformAuthResponse = (
    response:IResponseAuthMessage, 
    messages:{
      success_message: string,
      error_message: string
    }):IResponseMessage => {
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