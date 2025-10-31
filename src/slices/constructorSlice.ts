import { TConstructorIngredient, TIngredient } from "@utils-types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

type TConstructorState = {
    bun: TIngredient | null,
    ingredients: TConstructorIngredient[]
}

export const initialState: TConstructorState = {
    bun: null,
    ingredients: []
}

const slice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        addBun(state, action: PayloadAction<TIngredient | null>) {
            state.bun = action.payload
        },
        addIngredient: {
            prepare: (payload: TIngredient) => ({
                payload: {...payload, id: uuidv4()}
            }),

            reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
                if (action.type === 'bun') {
                    state.bun = action.payload
                } else {
                    state.ingredients.push(action.payload)
                }
            },
        },
        removeIngredient(state, action: PayloadAction<string>) {
            state.ingredients = state.ingredients.filter(item => item.id !== action.payload)
        },
        moveIngredient(state, action: PayloadAction<{idx: number, upwards: boolean}>) {
            const item = state.ingredients[action.payload.idx]
            if (action.payload.upwards) {
                state.ingredients[action.payload.idx] = state.ingredients[action.payload.idx-1]
                state.ingredients[action.payload.idx-1] = item
            } else {
                state.ingredients[action.payload.idx] = state.ingredients[action.payload.idx+1]
                state.ingredients[action.payload.idx+1] = item

            }
        },
        resetState(state) {
            state.bun = null
            state.ingredients = []
        }
    }
})

export const {addBun, addIngredient, removeIngredient, moveIngredient, resetState} = slice.actions
export default slice.reducer