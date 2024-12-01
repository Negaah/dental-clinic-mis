import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// درخواست برای دریافت داده‌های بیماران
export const fetchPatients = createAsyncThunk('patients/fetchPatients', async () => {
    const response = await fetch('http://localhost:8000/api/patients/'); // تغییر با API واقعی شما
    if (!response.ok) throw new Error('Failed to fetch patients');
    return await response.json();
});

const patientSlice = createSlice({
    name: 'patients',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {}, // برای تغییرات محلی
    extraReducers: (builder) => {
        builder
            .addCase(fetchPatients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPatients.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchPatients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default patientSlice.reducer;
