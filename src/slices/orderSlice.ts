import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createSlice, SerializedError, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrdersState = {
    orderRequest: boolean;
    orderModalData: TOrder | null;
    isOrderLoading: boolean;
    isOrdersLoading: boolean;
    error: null | SerializedError;
    data: TOrder[];
};

export const initialState: TOrdersState = {
    orderRequest: false,
    orderModalData: null,
    isOrderLoading: true,
    isOrdersLoading: true,
    error: null,
    data: []
};

export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (data: string[]) => {
        const res = await orderBurgerApi(data)
        return res
    }
)

export const getOrder = createAsyncThunk(
    'orders/getOrder',
    async(data: number) => {
        const res = await getOrderByNumberApi(data)
        return res.orders[0]
    }
)

export const getOrders = createAsyncThunk(
    'orders/getOrders',
    async () => await getOrdersApi()
)

const slice = createSlice({
    name: 'orders',
    initialState,
    reducers: {resetOrderModalData(state) {
        state.orderModalData = null;
      }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.orderRequest = true
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.orderRequest = false
                state.orderModalData = action.payload.order
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.error = action.error
                state.orderRequest = false
            })
            .addCase(getOrder.pending, (state) => {
                state.isOrderLoading = true
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.isOrderLoading = false
                state.orderModalData = action.payload
            })
            .addCase(getOrder.rejected, (state) => {
                state.isOrderLoading = false
            })
            .addCase(getOrders.pending, (state) => {
                state.isOrdersLoading = true
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isOrdersLoading = false
                state.data = action.payload
                state.error = null
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isOrdersLoading = false
                state.error = action.error
            })
    }
})

export const {resetOrderModalData} = slice.actions
export default slice.reducer