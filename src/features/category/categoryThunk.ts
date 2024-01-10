import { createAsyncThunk } from '@reduxjs/toolkit';
import { categories } from 'services/category';

export const categoriesThunk = createAsyncThunk(
    'home/categories',
    async ({ body }: { body: any }) => {
      const { data } = await categories({ body });
      return data
    }
  );