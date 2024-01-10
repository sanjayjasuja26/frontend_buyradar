import { cms } from 'services/cms';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const cmsThunk = createAsyncThunk(
    '/cms',
    async () => {
      const response = await cms();
      return response
    }
);