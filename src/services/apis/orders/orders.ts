import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetOrdersResponse } from './types';
import { wssUrl } from '../../constants/varaibles';

const socket:{
    ws: WebSocket|undefined,
    connected: Promise<void>|undefined
} = {
    ws: undefined,
    connected: undefined
}

const init_connection = () => {
    const ws = new window.WebSocket(wssUrl + 'orders/all');
    socket.ws = ws
    socket.connected = new Promise<void>(resolve => {
        ws.onopen = () => resolve()
    });
}

const initialState:IGetOrdersResponse = {
    orders: [],
    total: 0,
    totalToday: 0,
    success: true
} 

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  async baseQuery (options: IGetOrdersResponse) {
    init_connection()
    await socket.connected
    return { data: options }
  },

  endpoints: (builder) => ({
    getOrders: builder.query<IGetOrdersResponse, void>({
      query: () =>  {return initialState},
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
            await cacheDataLoaded
            await socket.connected
            if(socket.ws){
                const {ws} = socket
                ws.onmessage = (event) => {
                    const data = JSON.parse(event.data) as IGetOrdersResponse;
                    if (data.success) {
                        updateCachedData((draft) => {
                            draft.orders = data.orders
                            draft.total = data.total
                            draft.totalToday = data.totalToday
                        });
                    } else {
                        updateCachedData((draft) => { draft.success = data.success })
                    }
                };
                ws.onclose = async () => {
                    await cacheEntryRemoved;
                };
            }
        } catch(error){
            console.log(error)
        }
      },

    }),

  }),

});


export const { useGetOrdersQuery } = ordersApi;