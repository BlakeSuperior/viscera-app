import { configureStore } from '@reduxjs/toolkit';
import chamberReducer from './chamberSlice';
import profileReducer from './profileSlice';
import libraryReducer from './librarySlice';

export const store = configureStore({
  reducer: {
    chamber: chamberReducer,
    profile: profileReducer,
    library: libraryReducer,
  },
});
