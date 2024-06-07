import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api';
import ingredientSlice from './slices/ingredient';
import burgerSlice from './slices/burger';
import tagsSlice from './slices/tabs';

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [ingredientSlice.reducerPath]: ingredientSlice.reducer,
    [burgerSlice.reducerPath]: burgerSlice.reducer,
    [tagsSlice.reducerPath]: tagsSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootStoreState = ReturnType<typeof store.getState>;

export default store