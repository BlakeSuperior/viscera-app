import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  simulations: [],
  userSimulations: [],
  loading: false,
  error: null,
  filters: {
    date: null,
    tags: [],
    outcomes: []
  },
  currentView: 'chronological'
};

export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    fetchSimulationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSimulationsSuccess: (state, action) => {
      state.simulations = action.payload;
      state.loading = false;
    },
    fetchSimulationsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchUserSimulationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserSimulationsSuccess: (state, action) => {
      state.userSimulations = action.payload;
      state.loading = false;
    },
    fetchUserSimulationsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addUserSimulation: (state, action) => {
      state.userSimulations.push(action.payload);
    },
    updateUserSimulation: (state, action) => {
      const index = state.userSimulations.findIndex(
        sim => sim.id === action.payload.id
      );
      if (index !== -1) {
        state.userSimulations[index] = {
          ...state.userSimulations[index],
          ...action.payload
        };
      }
    },
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload
      };
    },
    clearFilters: (state) => {
      state.filters = {
        date: null,
        tags: [],
        outcomes: []
      };
    },
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    }
  }
});

export const {
  fetchSimulationsStart,
  fetchSimulationsSuccess,
  fetchSimulationsFailure,
  fetchUserSimulationsStart,
  fetchUserSimulationsSuccess,
  fetchUserSimulationsFailure,
  addUserSimulation,
  updateUserSimulation,
  setFilters,
  clearFilters,
  setCurrentView
} = librarySlice.actions;

export default librarySlice.reducer;
