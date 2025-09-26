import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import api from '../../api/axios';
import type { AuthResponse } from '../../types';

// Get user from localStorage
const userString = localStorage.getItem('user');
const user: AuthResponse | null = userString ? JSON.parse(userString) : null;

interface AuthState {
    user: AuthResponse | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: user,
    isAuthenticated: !!user,
    isLoading: false,
    error: null,
};

// Async thunk for login
export const login = createAsyncThunk('auth/login', async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
        const response = await api.post<AuthResponse>('/auth/login', userData);
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message || 'An error occurred');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('user');
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.user = null;
                state.isAuthenticated = false;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

