import { configureStore } from '@reduxjs/toolkit';
import { dataApi } from './apis/data';
import ingredientSlice from './slices/ingredient';
import burgerSlice from './slices/burger';
import tagsSlice from './slices/tabs';
import { authApi } from './apis/auth';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [dataApi.reducerPath]: dataApi.reducer,
    [ingredientSlice.reducerPath]: ingredientSlice.reducer,
    [burgerSlice.reducerPath]: burgerSlice.reducer,
    [tagsSlice.reducerPath]: tagsSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dataApi.middleware),
});

export type RootStoreState = ReturnType<typeof store.getState>;

export default store