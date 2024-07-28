import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetOrderResponse, IGetFeedsResponse, IOrder } from './types';
import { apiUrl } from '../../constants/varaibles';
import { wssclient } from '../../constants/varaibles';
import { deleteUserFromStorage, getLSTokens } from '../../tokens'
import authApi from '../auth/auth';

const initialState:IGetFeedsResponse = {
    orders: [],
    total: 0,
    totalToday: 0,
    success: true
} 

export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery:  fetchBaseQuery({ 
      baseUrl: apiUrl,
    }),
    endpoints: (builder) => ({
      getFeed: builder.query<IOrder|undefined, {order_number:number|string|undefined}>({
        query: ({order_number}) => `/orders/${order_number}`,
        transformResponse: (response: IGetOrderResponse) => {
            if(response.success){
                return response.orders[0]
            }
        }
      })
    })
})

export const {useGetFeedQuery} = ordersApi

const sortOrders = (orders:IOrder[]) => orders.sort( 
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
)

export const orderWSApi = createApi({
  reducerPath: 'feedWSApi',
  async baseQuery (options: IGetFeedsResponse) {
    return { data: options }
  },
  endpoints: (builder) => ({
    getFeeds: builder.query<IGetFeedsResponse, void>({
      query: () =>  {return initialState},
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
            await cacheDataLoaded
            wssclient.addEvents(
              'orders/all', 
              {
                onmessage:(resp) => {
                  const data = JSON.parse(resp) as IGetFeedsResponse;
                  if (data.success) {
                      updateCachedData((draft) => {
                          draft.orders = sortOrders(data.orders)
                          draft.total = data.total
                          draft.totalToday = data.totalToday
                      });
                  } else {
                      updateCachedData((draft) => { 
                        draft.success = data.success 
                        draft.message = data.message
                      })
                  }
                }, 
                onclose: async () => await cacheEntryRemoved,
                onerror: (err) => {
                  updateCachedData((draft) => { 
                    draft.success = false
                    draft.message = err.reason
                  })
                }
              })
        } catch(error){
            updateCachedData((draft) => {
              draft.success = false
              draft.message = "ошибка инициализации подключения"
            })
        }
      },
    }),
    getOrders: builder.query<IGetFeedsResponse, void>({
      query: () =>  {return initialState},
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        try {
          const refreshToken = async (successCallback: () => Promise<void>) => {
            const refreshTokenMutation = authApi.endpoints.refreshToken.initiate({})
            const resp = await dispatch(refreshTokenMutation)
            if(resp.data?.success){
              await successCallback()
            }
            if(resp.error){
              const logoutMutation =  authApi.endpoints.logOut.initiate({})
              const resp = await dispatch(logoutMutation)
              if(!resp.data?.success){
                deleteUserFromStorage()
              }
              window.location.href = "/login"
            }
          }

          const initConnection = async () => {
            await cacheDataLoaded
            const {accessToken} = getLSTokens()
            if(accessToken){
              wssclient.addEvents(
                'orders', 
                {
                  onmessage: async (resp) => {
                    const data = JSON.parse(resp) as IGetFeedsResponse;
                    if (data.success) {
                        updateCachedData((draft) => {
                            draft.orders = sortOrders(data.orders)
                            draft.total = data.total
                            draft.totalToday = data.totalToday
                        });
                    } else {
                        if(data.success === false){
                          if(data.success === false && data.message === "Invalid or missing token"){
                            await refreshToken(initConnection)
                          } else {
                            updateCachedData((draft) => { 
                              draft.success = data.success
                              draft.message = data.message
                            })
                          }
                        }
                    }
                  },
                  onclose: async () => await cacheEntryRemoved,
                  onerror: (err) => {
                    updateCachedData((draft) => { 
                      draft.success = false
                      draft.message = err.reason
                    })
                  }
                },
                accessToken
              )
            } else {
              await refreshToken(initConnection)
            }
          }
          await initConnection()
        } catch(error){
          updateCachedData((draft) => {
            draft.success = false
            draft.message = "ошибка инициализации подключения"
          })
        }
      },
    }),
  }),
});


export const { useGetFeedsQuery, useGetOrdersQuery } = orderWSApi;