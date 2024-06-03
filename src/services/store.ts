import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api';
import ingredientSlice from './slices/ingredient';

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [ingredientSlice.reducerPath]: ingredientSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store