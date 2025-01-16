import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import bcrypt from 'bcryptjs';

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [
    {
      id: '1',
      email: 'admin@example.com',
      password: bcrypt.hashSync('admin123', 10),
      name: 'Администратор'
    }
  ]
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      registerUser: (state, action: PayloadAction<Omit<User, 'id'>>) => {
        const hashedPassword = bcrypt.hashSync(action.payload.password, 10);
        const newUser = {
          ...action.payload,
          password: hashedPassword, 
          id: Date.now().toString()
        };
        state.users.push(newUser);
      }
    }
  });

export const { registerUser } = usersSlice.actions;
export default usersSlice.reducer; 