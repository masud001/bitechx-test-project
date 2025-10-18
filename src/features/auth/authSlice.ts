import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface AuthState {
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}

const initialState: AuthState = {
  token: null,
  status: 'idle',
};

export const login = createAsyncThunk<string, string, { rejectValue: string}>(
  'auth/login',
  async (email: string, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/auth`, { email }, {
        headers: { 'Content-Type': 'application/json' }
      });
      const token = res.data?.token as string;
      if (!token) throw new Error('No token returned');
      return token;
    } catch (err: unknown) {
      const message = (function getMessage(e: unknown): string {
        if (typeof e === 'object' && e && 'response' in e) {
          const resp = (e as { response?: { data?: { message?: string } } }).response;
          if (resp?.data?.message) return resp.data.message;
        }
        if (e instanceof Error) return e.message;
        return 'Login failed';
      })(err);
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.status = 'idle';
      state.error = undefined;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
      });
  }
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;