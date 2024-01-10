import { createSlice } from '@reduxjs/toolkit';
import {  cmsThunk } from "./cmsThunks";

export interface CmsState {
    cmsStatus: 'idle' | 'loading' | 'failed',
    cmsErrorMsg: string,
    cmsData: any 
}

const initialState: CmsState = {
    cmsStatus: 'loading',
    cmsErrorMsg: '',
    cmsData: [] 
}

export const authSlice = createSlice({
    name: 'cms',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(cmsThunk.pending, (state) => {
            state.cmsStatus = 'loading';
            state.cmsErrorMsg = ''
        })
        .addCase(cmsThunk.fulfilled, (state, action) => {
            state.cmsStatus = 'idle'
            state.cmsErrorMsg = ""
            state.cmsData = action.payload.data
        })
        .addCase(cmsThunk.rejected, (state, action) => {
            state.cmsErrorMsg = action?.error?.message ? action.error.message : ""
            state.cmsStatus = "failed"
        })
    }
})

export default authSlice.reducer;