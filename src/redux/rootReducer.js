import { combineReducers } from "@reduxjs/toolkit";
import doctorReducer from "./slices/doctorSlice";
import commonSlice from "./slices/commonSlice";

// Combine reducers
const rootReducer = combineReducers({
  doctor: doctorReducer,
  common: commonSlice,
});

// Reset root reducer state to initial state
export const resetRootReducer = () => {
  return {
    doctor: doctorReducer(undefined, {}),
  };
};

export default rootReducer;