import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import patientReducer from './slices/patientSlice';

const makeStore = () =>
    configureStore({
        reducer: {
            patients: patientReducer,
        },
        devTools: process.env.NODE_ENV !== 'production',
    });

export const wrapper = createWrapper(makeStore);
