import { homeFeed, getWishList, addToWishList, removeFromWishList, justForYou } from 'services/home';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { saveBuyRadarMemeberId } from "utils/helpers"
import { categories } from 'services/category';

export const headerCategoriesThunk = createAsyncThunk(
  'home/headerCategories',
  async ({ body }: { body: any }) => {
    const { data } = await categories({ body });
    return data
  }
);

export const homeFeedThunk = createAsyncThunk(
  'home/homeFeed',
  async ({ body }: { body: any }) => {
    const { data } = await homeFeed({ body });
    saveBuyRadarMemeberId(data.member_id)
    return data
  }
);

export const justForYouThunk = createAsyncThunk(
  'home/justforyou',
  async ({ body, isMore }: { body: any, isMore: boolean }) => {
    // console.log("@justForYouThunk ====page", body.page)
    const { data } = await justForYou({ body });
    return data
  }
);

export const getWishListThunk = createAsyncThunk(
  'user/getWishList',
  async ({ body }: { body: any }) => {
    const response = await getWishList({ body });
    return response
  }
);

export const addToWishListThunk = createAsyncThunk(
  'user/addToWishList',
  async ({ body }: { body: any }) => {
    const response = await addToWishList({ body });
    return { product_id: body.product_id, ...response }
  }
);

export const removeFromWishListThunk = createAsyncThunk(
  'user/removeFromWishList',
  async ({ body }: { body: any }) => {
    const response = await removeFromWishList({ body });
    return { ...response, ...body }
  }
);


