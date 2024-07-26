import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetOrderResponse, IGetFeedsResponse, IOrder } from '../types';
import { apiUrl, wssUrl } from '../../../constants/varaibles';
import { wssclient } from '../../../constants/varaibles';

const initialState:IGetFeedsResponse = {
    orders: [],
    total: 0,
    totalToday: 0,
    success: true
} 

export const feedApi = createApi({
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

export const {useGetFeedQuery} = feedApi

export const feedWSApi = createApi({
  reducerPath: 'feedWSApi',
  async baseQuery (options: IGetFeedsResponse) {
    const socketData = wssclient.initNew('orders/all')
    await socketData.connected
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
            wssclient.addOnMessage(
              'orders/all', 
              (resp) => {
                const data = JSON.parse(resp) as IGetFeedsResponse;
                if (data.success) {
                    updateCachedData((draft) => {
                        draft.orders = data.orders
                        draft.total = data.total
                        draft.totalToday = data.totalToday
                    });
                } else {
                    updateCachedData((draft) => { draft.success = data.success })
                }
              },
              async () => await cacheEntryRemoved
            )
        } catch(error){
            console.log(error)
        }
      },
    }),
  }),
});


export const { useGetFeedsQuery } = feedWSApi;