import {
    TRegisterData,
    registerUserApi,
    TLoginData,
    loginUserApi,
    getUserApi,
    updateUserApi,
    logoutApi,
} from '@api';

import {
    SerializedError,
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
  
  
import { TUser } from '@utils-types';
// import { resetTokens, storeTokens } from '@tokenManager';
import { resetTokens, storeTokens } from '../utils/tokenManager';
import { _ActionCreatorWithPreparedPayload } from '@reduxjs/toolkit/dist/createAction';

type TUserState = {
    data: TUser;
    isAuthChecked: boolean;
    isAuthenticated: boolean;
    isLoading: boolean,
    loginError?: SerializedError;
    registerError?: SerializedError;
};

export const initialState: TUserState = {
    data: {
        name: '',
        email: ''
    },
    isLoading: false,
    isAuthChecked: false,
    isAuthenticated: false
};

export const register = createAsyncThunk<TUser, TRegisterData>(
    'user/register',
    async (data, thunkAPI) => {
        const res = await registerUserApi(data)
        if(!res.success) {
            return thunkAPI.rejectWithValue('Register failed')
        }
        const {user, refreshToken, accessToken} = res
        localStorage.setItem('refreshToken', refreshToken)
        storeTokens(refreshToken, accessToken)
        return user
    }
)
    
export const login = createAsyncThunk<TUser, TLoginData>(
    'user/login',
    async (data, thunkAPI) => {
        const res = await loginUserApi(data)
        if(!res.success) {
            return thunkAPI.rejectWithValue('Login failed')
        }
        const {user, refreshToken, accessToken} = res
        localStorage.setItem('refreshToken', refreshToken)
        storeTokens(refreshToken, accessToken)
        return user
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async (_, thunkAPI) => {
        console.log(localStorage.getItem('refreshToken'))
        const res = await logoutApi()
        if (!res.success) {
            return thunkAPI.rejectWithValue('Logout failed')
        }
        resetTokens()
        return res
    }
)

export const getUser = createAsyncThunk(
    'user/getUser',
    async(_, thunkAPI) => {
        const res = await getUserApi()
        if (!res.success) {
            return thunkAPI.rejectWithValue('Failed getting user')
        }
        return res.user
    }
)

export const updateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
    'user/updateUser',
    async(data, thunkAPI) => {
        const res = await updateUserApi(data)
        if(!res.success) {
            return thunkAPI.rejectWithValue('Failed update user data')
        }
        return res.user
    }
)

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.isLoading = true
            state.registerError = undefined
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isAuthenticated = true
            state.registerError = undefined
            state.data = action.payload
        })
        builder.addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.registerError = action.error
        })
        builder.addCase(login.pending, (state) => {
            state.isLoading = true
            state.loginError = undefined
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.loginError = undefined
            state.isAuthenticated = true
            state.data = action.payload
        })
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isAuthenticated = false
            state.loginError = action.error
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoading = false
            state.isAuthenticated = false
            state.data = {name: '', email: ''}
        })
        builder.addCase(getUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isAuthChecked = true
            state.isAuthenticated = true
            state.data = action.payload
        })
        builder.addCase(getUser.rejected, (state, action) => {
            state.isLoading = false
            state.isAuthChecked = true
        })
        builder.addCase(updateUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
        })
    }  
})

export default slice.reducer