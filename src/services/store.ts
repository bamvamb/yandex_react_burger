import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api';
import ingredientSlice from './slices/ingredient';
import burgerSlice from './slices/burger';

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [ingredientSlice.reducerPath]: ingredientSlice.reducer,
    [burgerSlice.reducerPath]: burgerSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store