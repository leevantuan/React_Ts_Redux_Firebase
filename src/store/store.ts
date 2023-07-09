import studentsSlice from '../redux/reducers';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({ reducer: { students: studentsSlice } });
