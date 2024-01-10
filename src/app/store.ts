import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from "features/auth/authSlice"
import cmsReducer from "features/cms/cmsSlice"
import homeReducer from "features/home/homeSlice"
import categoryReducer from "features/category/categorySlice"
import productSlice from "features/productDetail/productSlice"
import browseSlice from 'features/browse/browseSlice';
import userSlice from "features/userAccount/userSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cms: cmsReducer,
    home: homeReducer,
    category: categoryReducer,
    product: productSlice,
    browse: browseSlice,
    user: userSlice,
    merchant: productSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
