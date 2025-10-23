import { PayloadAction, SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { getFeedsApi } from "@api";

type TFeedsState = {
    data: TOrdersData;
    error: null | SerializedError;
  };
  
export const initialState: TFeedsState = {
    data: {
        orders: [],
        total: NaN,
        totalToday: NaN
    },
    error: null,
};

export const getFeeds = createAsyncThunk<TOrdersData>(
    'feeds/getFeeds',
    async () => {
        const res = await getFeedsApi()
        return res
    }
);
  
const slice = createSlice({
    name: 'feeds',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getFeeds.pending, (state) => {
            state.error = null;
        })
        .addCase(getFeeds.fulfilled, (state, action) => {
            state.error = null;
            state.data = action.payload;
        })
        .addCase(getFeeds.rejected, (state, action) => {
            state.error = action.error;
        });
    }
});

export default slice.reducer;