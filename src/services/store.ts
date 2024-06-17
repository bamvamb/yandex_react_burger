import { configureStore } from '@reduxjs/toolkit';
import { dataApi } from './apis/data';
import ingredientSlice from './slices/ingredient';
import burgerSlice from './slices/burger';
import tagsSlice from './slices/tabs';
import { authApi, authUnautorizedApi } from './apis/auth';
import profileInputsSlice from './slices/profileInputs';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [authUnautorizedApi.reducerPath]: authUnautorizedApi.reducer,
    [dataApi.reducerPath]: dataApi.reducer,
    [ingredientSlice.reducerPath]: ingredientSlice.reducer,
    [burgerSlice.reducerPath]: burgerSlice.reducer,
    [tagsSlice.reducerPath]: tagsSlice.reducer,
    [profileInputsSlice.reducerPath]: profileInputsSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dataApi.middleware, authApi.middleware, authUnautorizedApi.middleware),
});

export type RootStoreState = ReturnType<typeof store.getState>;

export default store