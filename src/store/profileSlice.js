import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  traits: [],
  contradictions: [],
  narrativeRoles: [],
  psychometricSummary: {
    moralFlexibility: 0,
    empathicRange: 0,
    cognitiveConsistency: 0,
    selfAwareness: 0,
    decisionConfidence: 0
  },
  evolutionMetrics: {
    stabilityIndex: 0,
    growthVector: 'neutral',
    significantShifts: []
  },
  version: 1,
  lastUpdated: null
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateTraits: (state, action) => {
      // Find if trait exists
      const traitIndex = state.traits.findIndex(
        trait => trait.name === action.payload.name
      );
      
      if (traitIndex >= 0) {
        // Update existing trait
        const trait = state.traits[traitIndex];
        
        // Add to history
        trait.history.push({
          value: action.payload.value,
          timestamp: new Date().toISOString(),
          simulationId: action.payload.simulationId
        });
        
        // Update current value
        trait.value = action.payload.value;
        trait.confidence = action.payload.confidence || trait.confidence;
      } else {
        // Add new trait
        state.traits.push({
          category: action.payload.category,
          name: action.payload.name,
          value: action.payload.value,
          confidence: action.payload.confidence || 0.5,
          history: [{
            value: action.payload.value,
            timestamp: new Date().toISOString(),
            simulationId: action.payload.simulationId
          }]
        });
      }
      
      state.lastUpdated = new Date().toISOString();
      state.version += 1;
    },
    
    addContradiction: (state, action) => {
      state.contradictions.push({
        description: action.payload.description,
        firstDetected: new Date().toISOString(),
        lastConfirmed: new Date().toISOString(),
        frequency: 1,
        relatedTraits: action.payload.relatedTraits || [],
        status: 'active'
      });
      
      state.lastUpdated = new Date().toISOString();
      state.version += 1;
    },
    
    updateContradiction: (state, action) => {
      const contradictionIndex = state.contradictions.findIndex(
        c => c.description === action.payload.description
      );
      
      if (contradictionIndex >= 0) {
        const contradiction = state.contradictions[contradictionIndex];
        contradiction.lastConfirmed = new Date().toISOString();
        contradiction.frequency += 1;
        contradiction.status = action.payload.status || contradiction.status;
        
        if (action.payload.relatedTraits) {
          contradiction.relatedTraits = [
            ...new Set([...contradiction.relatedTraits, ...action.payload.relatedTraits])
          ];
        }
      }
      
      state.lastUpdated = new Date().toISOString();
      state.version += 1;
    },
    
    updateNarrativeRole: (state, action) => {
      const roleIndex = state.narrativeRoles.findIndex(
        role => role.role === action.payload.role
      );
      
      if (roleIndex >= 0) {
        // Update existing role
        const role = state.narrativeRoles[roleIndex];
        role.frequency = action.payload.frequency || role.frequency;
        role.lastObserved = new Date().toISOString();
        
        if (action.payload.contexts) {
          role.contexts = [...new Set([...role.contexts, ...action.payload.contexts])];
        }
      } else {
        // Add new role
        state.narrativeRoles.push({
          role: action.payload.role,
          frequency: action.payload.frequency || 0.5,
          contexts: action.payload.contexts || [],
          firstObserved: new Date().toISOString(),
          lastObserved: new Date().toISOString()
        });
      }
      
      state.lastUpdated = new Date().toISOString();
      state.version += 1;
    },
    
    updatePsychometricSummary: (state, action) => {
      state.psychometricSummary = {
        ...state.psychometricSummary,
        ...action.payload
      };
      
      state.lastUpdated = new Date().toISOString();
      state.version += 1;
    },
    
    addSignificantShift: (state, action) => {
      state.evolutionMetrics.significantShifts.push({
        description: action.payload.description,
        timestamp: new Date().toISOString(),
        simulationId: action.payload.simulationId
      });
      
      state.evolutionMetrics.stabilityIndex = action.payload.newStabilityIndex || 
        state.evolutionMetrics.stabilityIndex;
      
      state.evolutionMetrics.growthVector = action.payload.newGrowthVector || 
        state.evolutionMetrics.growthVector;
      
      state.lastUpdated = new Date().toISOString();
      state.version += 1;
    },
    
    resetProfile: () => initialState
  }
});

export const { 
  updateTraits, 
  addContradiction, 
  updateContradiction, 
  updateNarrativeRole,
  updatePsychometricSummary,
  addSignificantShift,
  resetProfile
} = profileSlice.actions;

export default profileSlice.reducer;
