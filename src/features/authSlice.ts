import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import bcrypt from 'bcryptjs';

interface AuthState {
  token: string | null;
  userId: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  userId: null,
  status: 'idle',
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ token: string; userId: string }>) => {
      state.status = 'succeeded';
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.status = 'idle';
      state.error = null;
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export const login = (credentials: { email: string; password: string }) => 
  (dispatch: any, getState: () => RootState) => {
    dispatch(loginStart());

    const users = getState().users.users;
    const user = users.find(u => u.email === credentials.email);

    if (!user) {
      dispatch(loginFailure('Пользователь не найден'));
      return;
    }

    const isValidPassword = bcrypt.compareSync(credentials.password, user.password);
    if (!isValidPassword) {
      dispatch(loginFailure('Неверный пароль'));
      return;
    }

    const token = btoa(user.email + ':' + Date.now());
    dispatch(loginSuccess({ token, userId: user.id }));
  };

export default authSlice.reducer;
