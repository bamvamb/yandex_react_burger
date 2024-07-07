import { configureStore } from '@reduxjs/toolkit';
import { dataApi } from './apis/data';
import burgerSlice from './slices/burger';
import tagsSlice from './slices/tabs';
import { authApi } from './apis/auth';
import profileInputsSlice from './slices/profileForm';
import { userSlice } from './slices/user';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [dataApi.reducerPath]: dataApi.reducer,
    [burgerSlice.reducerPath]: burgerSlice.reducer,
    [tagsSlice.reducerPath]: tagsSlice.reducer,
    [profileInputsSlice.reducerPath]: profileInputsSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dataApi.middleware, authApi.middleware),
});

export type RootStoreState = ReturnType<typeof store.getState>;
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']


export default store