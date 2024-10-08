import { createSlice } from "@reduxjs/toolkit";

const doctorSlice = createSlice({
    name: "doctor",
    initialState: {
        isLoggedIn: localStorage.getItem("doctorJwtToken") ? true : false,
        doctorData: null,
        searchResults: {
            searchOn: null,
            results: null,
        }
    },
    reducers: {
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setDoctorData: (state, action) => {
            state.doctorData = action.payload;
        },
        resetDoctorState: (state) => {
            state.isLoggedIn = false
        }, // Reset user state to initial state
    },
});

// export admin actions and reducer
export const {
    setLoggedIn,
    setDoctorData,
    resetDoctorState,
} = doctorSlice.actions;

export default doctorSlice.reducer;