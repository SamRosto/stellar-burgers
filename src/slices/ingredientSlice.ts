import { getIngredientsApi } from "@api";
import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import { TIngredient } from "@utils-types";

type TIngredientsState = {
    isLoading: boolean;
    data: TIngredient[];
    error: null | SerializedError;
  };
  
  export const initialState: TIngredientsState = {
    isLoading: true,
    data: [],
    error: null,
  };

export const getIngredients = createAsyncThunk(
    'ingredients/fetch',
    async () => await getIngredientsApi()
)

const slice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getIngredients.pending, (state) => {
            state.isLoading = true,
            state.error = null
        })
        .addCase(getIngredients.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = null
            state.data = action.payload
        })
        .addCase(getIngredients.rejected, (state, action) => {
            state.error = action.error
            state.isLoading = false
        })
    }
})

export default slice.reducer