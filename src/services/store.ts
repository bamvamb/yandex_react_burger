import { configureStore } from '@reduxjs/toolkit';
import { dataApi } from './apis/ingredients/ingredients';
import burgerSlice from './slices/burger/burger';
import tagsSlice from './slices/tabs/tabs';
import { authApi } from './apis/auth/auth';
import profileInputsSlice from './slices/profileForm/profileForm';
import { userSlice } from './slices/user/user';
import { feedWSApi, feedApi } from './apis/orders/feeds/feeds';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [dataApi.reducerPath]: dataApi.reducer,
    [feedApi.reducerPath]: feedApi.reducer,
    [feedWSApi.reducerPath]: feedWSApi.reducer,
    [burgerSlice.reducerPath]: burgerSlice.reducer,
    [tagsSlice.reducerPath]: tagsSlice.reducer,
    [profileInputsSlice.reducerPath]: profileInputsSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      dataApi.middleware, 
      authApi.middleware, 
      feedApi.middleware,
      feedWSApi.middleware
    ),
});

export type RootStoreState = ReturnType<typeof store.getState>;
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']


export default store