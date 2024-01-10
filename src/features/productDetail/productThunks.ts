import { productDetail, setPriority, merchantList, similarProducts, recommendedProducts, targetPrice ,incorrectPrice } from 'services/product';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const productDetailThunk = createAsyncThunk(
  'product/productDetail',
  async ({ body }: { body: any }) => {
    const { data } = await productDetail({ body });
    return data
  }
);
export const productDetailAfterSetProrityThunk = createAsyncThunk(
  'product/productDetailAfterSetPriority',
  async ({ body }: { body: any }) => {
    const { data } = await productDetail({ body });
    return data
  }
);
export const setPriorityThunk = createAsyncThunk(
  'api/setPriority',
  async ({ body }: { body: any }) => {
    const { data } = await setPriority({ body });
    return data
  }
);

export const merchantListThunk = createAsyncThunk(
  'product/merchants',
  async ({ body }: { body: any }) => {
    const { data } = await merchantList({ body });
    return data
  }
);

export const similarProductsThunk = createAsyncThunk(
  'product/similarProducts',
  async ({ body }: { body: any }) => {
    const { data } = await similarProducts({ body });
    return data
  }
);

export const recommendedProductsThunk = createAsyncThunk(
  'product/recommendedProducts',
  async ({ body }: { body: any }) => {
    const { data } = await recommendedProducts({ body });
    return data
  }
);

export const targetPriceThunk = createAsyncThunk(
  'product/targetPrice',
  async ({ body }: { body: any }) => {
    const response = await targetPrice({ body });
    return response;
  }
);

export const inCorrectPriceThunk = createAsyncThunk(
  'api/addProductReport',
  async ({ body }: { body: any }) => {
    const response = await incorrectPrice({ body });
    return response;
  }
)
