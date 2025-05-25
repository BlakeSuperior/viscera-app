import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSimulation: null,
  simulationStatus: 'idle', // 'idle', 'in-progress', 'completed'
  currentBranch: null,
  interactions: [],
  analysisInProgress: false,
  analysisResults: null,
};

export const chamberSlice = createSlice({
  name: 'chamber',
  initialState,
  reducers: {
    startSimulation: (state, action) => {
      state.currentSimulation = action.payload;
      state.simulationStatus = 'in-progress';
      state.currentBranch = action.payload.content.initialSetup;
      state.interactions = [];
      state.analysisResults = null;
    },
    recordInteraction: (state, action) => {
      state.interactions.push({
        timestamp: new Date().toISOString(),
        narrativeText: state.currentBranch,
        userResponse: action.payload.response,
        branchId: action.payload.branchId,
      });
    },
    advanceNarrative: (state, action) => {
      state.currentBranch = action.payload;
    },
    endSimulation: (state) => {
      state.simulationStatus = 'completed';
      state.analysisInProgress = true;
    },
    setAnalysisResults: (state, action) => {
      state.analysisResults = action.payload;
      state.analysisInProgress = false;
    },
    resetChamber: (state) => {
      return initialState;
    },
  },
});

export const { 
  startSimulation, 
  recordInteraction, 
  advanceNarrative, 
  endSimulation, 
  setAnalysisResults,
  resetChamber
} = chamberSlice.actions;

export default chamberSlice.reducer;
