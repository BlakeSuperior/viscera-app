import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { recordInteraction, endSimulation } from '../store/chamberSlice';

const ChamberScreen = () => {
  const [userResponse, setUserResponse] = React.useState('');
  const dispatch = useDispatch();
  const { 
    currentSimulation, 
    simulationStatus, 
    currentBranch, 
    interactions,
    analysisInProgress,
    analysisResults
  } = useSelector(state => state.chamber);

  const handleSubmit = () => {
    // Check if user wants to end simulation
    if (userResponse.toLowerCase().trim() === 'end simulation') {
      dispatch(endSimulation());
      return;
    }

    // Record the interaction
    dispatch(recordInteraction({
      response: userResponse,
      branchId: currentBranch ? currentBranch.id : 'initial'
    }));

    // Clear input
    setUserResponse('');

    // In a real implementation, we would process the response
    // and determine the next narrative branch here
  };

  // Render loading state during analysis
  if (analysisInProgress) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.analysisLoading}>
          <Text style={styles.loadingText}>Analyzing simulation data...</Text>
          <Text style={styles.subText}>Generating psychological profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Render analysis results if available
  if (analysisResults) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.analysisContainer}>
          <Text style={styles.analysisTitle}>
            CHAMBER ANALYSIS – SIMULATION {currentSimulation?.simulationNumber} "{currentSimulation?.title}"
          </Text>
          
          <View style={styles.analysisSection}>
            <Text style={styles.sectionTitle}>Summary of Decisions</Text>
            <Text style={styles.sectionContent}>{analysisResults.decisionsummary}</Text>
          </View>
          
          <View style={styles.analysisSection}>
            <Text style={styles.sectionTitle}>Narrative Reflex Observed</Text>
            <Text style={styles.sectionContent}>{analysisResults.narrativeReflex}</Text>
          </View>
          
          <View style={styles.analysisSection}>
            <Text style={styles.sectionTitle}>Latent Traits Detected</Text>
            {analysisResults.latentTraits.map((trait, index) => (
              <View key={index} style={styles.traitItem}>
                <Text style={styles.traitName}>{trait.trait}</Text>
                <Text style={styles.traitScore}>{trait.score}</Text>
                <Text style={styles.traitEvidence}>{trait.evidence}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.analysisSection}>
            <Text style={styles.sectionTitle}>Contradictions or Avoidance Patterns</Text>
            {analysisResults.contradictions.map((contradiction, index) => (
              <View key={index} style={styles.contradictionItem}>
                <Text style={styles.contradictionDesc}>{contradiction.description}</Text>
                <Text style={styles.contradictionEvidence}>
                  Evidence: {contradiction.evidence.join(', ')}
                </Text>
              </View>
            ))}
          </View>
          
          <View style={styles.analysisSection}>
            <Text style={styles.sectionTitle}>Instruments of the Test</Text>
            {analysisResults.instruments.map((instrument, index) => (
              <View key={index} style={styles.instrumentItem}>
                <Text style={styles.instrumentElement}>{instrument.element}</Text>
                <Text style={styles.instrumentPurpose}>{instrument.purpose}</Text>
                <Text style={styles.instrumentResponse}>{instrument.userResponse}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.analysisSection}>
            <Text style={styles.sectionTitle}>Reflection</Text>
            <Text style={styles.reflectionText}>{analysisResults.reflection}</Text>
          </View>
          
          <TouchableOpacity style={styles.returnButton}>
            <Text style={styles.returnButtonText}>Return to Hub</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Render active simulation
  return (
    <SafeAreaView style={styles.container}>
      {simulationStatus === 'in-progress' && currentSimulation ? (
        <View style={styles.simulationContainer}>
          <View style={styles.narrativeContainer}>
            <Text style={styles.simulationTitle}>
              {currentSimulation.title} - {currentSimulation.simulationNumber}
            </Text>
            
            <Text style={styles.narrativeText}>
              {currentBranch || currentSimulation.content.initialSetup}
            </Text>
            
            {interactions.length > 0 && (
              <View style={styles.interactionsContainer}>
                {interactions.map((interaction, index) => (
                  <View key={index} style={styles.interactionItem}>
                    <Text style={styles.userResponse}>{interaction.userResponse}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={userResponse}
              onChangeText={setUserResponse}
              placeholder="Enter your response..."
              placeholderTextColor="#8b8b8b"
              multiline
            />
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            
            <Text style={styles.endSimulationHint}>
              Type "End Simulation" to conclude and view analysis
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.noSimulationContainer}>
          <Text style={styles.noSimulationText}>No active simulation.</Text>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Select a Simulation</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  simulationContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  narrativeContainer: {
    flex: 1,
  },
  simulationTitle: {
    color: '#D4AF37',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  narrativeText: {
    color: '#E8DCC1',
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 24,
  },
  interactionsContainer: {
    marginTop: 16,
  },
  interactionItem: {
    marginBottom: 16,
    paddingLeft: 16,
    borderLeftWidth: 2,
    borderLeftColor: '#D4AF37',
  },
  userResponse: {
    color: '#D4AF37',
    fontSize: 16,
    fontStyle: 'italic',
  },
  inputContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    paddingTop: 16,
  },
  input: {
    backgroundColor: '#1A1A1A',
    color: '#D4AF37',
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: 'bold',
  },
  endSimulationHint: {
    color: '#8b8b8b',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
  noSimulationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  noSimulationText: {
    color: '#E8DCC1',
    fontSize: 18,
    marginBottom: 24,
  },
  startButton: {
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: 'bold',
  },
  analysisLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    color: '#D4AF37',
    fontSize: 20,
    marginBottom: 16,
  },
  subText: {
    color: '#E8DCC1',
    fontSize: 16,
  },
  analysisContainer: {
    flex: 1,
    padding: 16,
  },
  analysisTitle: {
    color: '#D4AF37',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  analysisSection: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
    paddingBottom: 16,
  },
  sectionTitle: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionContent: {
    color: '#E8DCC1',
    fontSize: 16,
    lineHeight: 22,
  },
  traitItem: {
    marginBottom: 12,
  },
  traitName: {
    color: '#E8DCC1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  traitScore: {
    color: '#D4AF37',
    fontSize: 14,
  },
  traitEvidence: {
    color: '#E8DCC1',
    fontSize: 14,
    fontStyle: 'italic',
  },
  contradictionItem: {
    marginBottom: 12,
  },
  contradictionDesc: {
    color: '#8B0000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contradictionEvidence: {
    color: '#E8DCC1',
    fontSize: 14,
  },
  instrumentItem: {
    marginBottom: 12,
  },
  instrumentElement: {
    color: '#E8DCC1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  instrumentPurpose: {
    color: '#4682B4',
    fontSize: 14,
  },
  instrumentResponse: {
    color: '#E8DCC1',
    fontSize: 14,
    fontStyle: 'italic',
  },
  reflectionText: {
    color: '#D4AF37',
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  returnButton: {
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  returnButtonText: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChamberScreen;
