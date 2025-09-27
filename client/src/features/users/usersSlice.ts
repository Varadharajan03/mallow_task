import { createSlice, createAsyncThunk, type PayloadAction, isAnyOf } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
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

type FetchUsersParams = { page?: number; limit?: number; search?: string };
type FetchUsersResponse = { data: User[]; page: number; limit: number; total: number };

export const fetchUsers = createAsyncThunk<FetchUsersResponse, FetchUsersParams | undefined>(
  'users/fetchUsers',
  async (params, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 5, search = '' } = params || {};
      const response = await api.get<FetchUsersResponse>('/users', {
        params: { page, limit, search },
      });
      return response.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

export const createUser = createAsyncThunk<User, Omit<User, '_id'>>(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post<User>('/users', userData);
      return response.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      return rejectWithValue(error.response?.data?.message || 'Failed to create user');
    }
  }
);

export const updateUser = createAsyncThunk<User, User>(
  'users/updateUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.put<User>(`/users/${userData._id}`, userData);
      return response.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      return rejectWithValue(error.response?.data?.message || 'Failed to update user');
    }
  }
);

export const deleteUser = createAsyncThunk<string, string>(
  'users/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      await api.delete(`/users/${userId}`);
      return userId;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<FetchUsersResponse>) => {
        state.isLoading = false;
        state.users = action.payload.data;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
      })
      // Update User
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex((user) => user._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
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
  },
});

export default usersSlice.reducer;
