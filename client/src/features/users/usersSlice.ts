import { createSlice, createAsyncThunk, type PayloadAction, isAnyOf } from '@reduxjs/toolkit';
import api from '../../api/axios';
import type { User } from '../../types';

interface UsersState {
    users: User[];
    isLoading: boolean;
    error: string | null;
    page: number;
    limit: number;
    total: number;
}

const initialState: UsersState = {
    users: [],
    isLoading: false,
    error: null,
    page: 1,
    limit: 5,
    total: 0,
};

// Thunks for CRUD operations
type FetchUsersParams = { page?: number; limit?: number; search?: string };
type FetchUsersResponse = { data: User[]; page: number; limit: number; total: number };
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (params: FetchUsersParams | undefined, { rejectWithValue }) => {
        try {
            const { page = 1, limit = 5, search = '' } = params || {};
            const response = await api.get<FetchUsersResponse>('/users', {
                params: { page, limit, search },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
        }
    }
);

export const createUser = createAsyncThunk('users/createUser', async (userData: Omit<User, '_id'>, { rejectWithValue }) => {
    try {
        const response = await api.post<User>('/users', userData);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message || 'Failed to create user');
    }
});

export const updateUser = createAsyncThunk('users/updateUser', async (userData: User, { rejectWithValue }) => {
    try {
        const response = await api.put<User>(`/users/${userData._id}`, userData);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message || 'Failed to update user');
    }
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (userId: string, { rejectWithValue }) => {
    try {
        await api.delete(`/users/${userId}`);
        return userId;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message || 'Failed to delete user');
    }
});


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Users
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                const payload = action.payload as any;
                if (Array.isArray(payload)) {
                    state.users = payload as User[];
                    state.page = 1;
                    state.limit = payload.length;
                    state.total = payload.length;
                } else {
                    state.users = payload?.data ?? [];
                    state.page = payload?.page ?? 1;
                    state.limit = payload?.limit ?? state.limit;
                    state.total = payload?.total ?? (payload?.data?.length ?? 0);
                }
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Create User
            .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.users.push(action.payload);
            })
            // Update User
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
                const index = state.users.findIndex(user => user._id === action.payload._id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            // Delete User
            .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
                state.users = state.users.filter(user => user._id !== action.payload);
            })
            // Handle loading/error for all mutations
            .addMatcher(
                isAnyOf(createUser.pending, updateUser.pending, deleteUser.pending),
                (state) => {
                    state.isLoading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                isAnyOf(createUser.rejected, updateUser.rejected, deleteUser.rejected),
                (state, action) => {
                    state.isLoading = false;
                    state.error = (action.payload as string) || 'Operation failed';
                }
            );
    }
});

export default usersSlice.reducer;

