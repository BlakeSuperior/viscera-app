import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TestPlanDocument = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>VISCERA Mobile App Test Plan</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Chamber Functionality Testing</Text>
        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>1.1 Simulation Initialization</Text>
          <Text style={styles.testCaseDescription}>
            Verify that simulations load correctly with proper title, number, and initial narrative text.
          </Text>
          <Text style={styles.testSteps}>
            Steps:
            1. Navigate to Chamber screen
            2. Select a simulation
            3. Verify title and simulation number display correctly
            4. Verify initial narrative text appears with proper styling
          </Text>
          <Text style={styles.expectedResult}>
            Expected Result: Simulation loads with correct title, number, and narrative text with typewriter effect.
          </Text>
        </View>
        
        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>1.2 User Response Processing</Text>
          <Text style={styles.testCaseDescription}>
            Verify that user responses are correctly processed and narrative advances appropriately.
          </Text>
          <Text style={styles.testSteps}>
            Steps:
            1. Enter a response in the input field
            2. Submit the response
            3. Verify response is displayed in the interaction history
            4. Verify narrative advances based on response
          </Text>
          <Text style={styles.expectedResult}>
            Expected Result: Response is recorded and displayed, narrative advances with new content.
          </Text>
        </View>
        
        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>1.3 End Simulation Command</Text>
          <Text style={styles.testCaseDescription}>
            Verify that "End Simulation" command triggers analysis process.
          </Text>
          <Text style={styles.testSteps}>
            Steps:
            1. Type "End Simulation" in the input field
            2. Submit the command
            3. Verify transition to analysis loading state
            4. Verify analysis results appear after processing
          </Text>
          <Text style={styles.expectedResult}>
            Expected Result: Simulation ends, loading screen appears, then analysis results are displayed.
          </Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Profiler Engine Testing</Text>
        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>2.1 Analysis Generation</Text>
          <Text style={styles.testCaseDescription}>
            Verify that the Profiler Engine generates complete analysis results.
          </Text>
          <Text style={styles.testSteps}>
            Steps:
            1. Complete a simulation
            2. End the simulation
            3. Verify all analysis sections are present:
               - Summary of Decisions
               - Narrative Reflex Observed
               - Latent Traits Detected
               - Contradictions or Avoidance Patterns
               - Instruments of the Test
               - Reflection
          </Text>
          <Text style={styles.expectedResult}>
            Expected Result: Complete analysis with all sections populated with relevant content.
          </Text>
        </View>
        
        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>2.2 Profile Impact</Text>
          <Text style={styles.testCaseDescription}>
            Verify that analysis results update the user's psychological profile.
          </Text>
          <Text style={styles.testSteps}>
            Steps:
            1. Note initial profile state in Construct
            2. Complete a simulation and view analysis
            3. Navigate to Construct
            4. Verify profile traits, contradictions, and narrative roles have updated
          </Text>
          <Text style={styles.expectedResult}>
            Expected Result: Profile data in Construct is updated to reflect new simulation results.
          </Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Library Testing</Text>
        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>3.1 Simulation Archiving</Text>
          <Text style={styles.testCaseDescription}>
            Verify that completed simulations are properly archived in the Library.
          </Text>
          <Text style={styles.testSteps}>
            Steps:
            1. Complete a simulation
            2. Navigate to Library
            3. Verify the simulation appears in the list
            4. Verify simulation details (title, date, summary) are correct
          </Text>
          <Text style={styles.expectedResult}>
            Expected Result: Completed simulation appears in Library with correct details.
          </Text>
        </View>
        
        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>3.2 Filtering and Sorting</Text>
          <Text style={styles.testCaseDescription}>
            Verify that Library filtering and view options work correctly.
          </Text>
          <Text style={styles.testSteps}>
            Steps:
            1. Navigate to Library with multiple simulations
            2. Test each view option (Chronological, By Tag, By Outcome)
            3. Apply and clear filters
            4. Verify simulation list updates appropriately
          </Text>
          <Text style={styles.expectedResult}>
            Expected Result: Simulation list updates based on selected view and filters.
          </Text>
        </View>
        
        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>3.3 Simulation Record Viewing</Text>
          <Text style={styles.testCaseDescription}>
            Verify that simulation records can be viewed with complete details.
          </Text>
          <Text style={styles.testSteps}>
            Steps:
            1. Select a simulation from the Library
            2. Verify full transcript is available
            3. Verify complete analysis is displayed
            4. Verify profile impact information is shown
          </Text>
          <Text style={styles.expectedResult}>
            Expected Result: Complete simulation record is displayed with all details.
          </Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Construct Testing</Text>
        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>4.1 Visualization Rendering</Text>
          <Text style={styles.testCaseDescription}>
            Verify that all visualization types render correctly in the Construct.
          </Text>
          <Text style={styles.testSteps}>
            Steps:
            1. Navigate to Construct
            2. Test each visualization type:
               - Radar chart
               - Trait bars
               - Contradiction heatmap
               - Narrative roles timeline
            3. Verify visualizations render with correct data
          </Text>
          <Text style={styles.expectedResult}>
            Expected Result: All visualizations render correctly with appropriate data.
          </Text>
        </View>
        
        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>4.2 Profile Evolution</Text>
          <Text style={styles.testCaseDescription}>
            Verify that profile evolution metrics are calculated and displayed correctly.
          </Text>
          <Text style={styles.testSteps}>
            Steps:
            1. Complete multiple simulations
            2. Navigate to Construct
            3. Verify stability index and growth vector reflect simulation history
            4. Verify significant shifts are recorded
          </Text>
          <Text style={styles.expectedResult}>
            Expected Result: Evolution metrics accurately reflect changes in profile over time.
          </Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Navigation and UI Testing</Text>
        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>5.1 Navigation Flow</Text>
          <Text style={styles.testCaseDescription}>
            Verify that navigation between all screens works correctly.
          </Text>
          <Text style={styles.testSteps}>
            Steps:
            1. Start from Hub screen
            2. Navigate to each main screen (Chamber, Library, Construct, Settings)
            3. Return to Hub from each screen
            4. Test deep navigation (e.g., Library → Simulation Record → Analysis)
          </Text>
          <Text style={styles.expectedResult}>
            Expected Result: All navigation paths work correctly with appropriate transitions.
          </Text>
        </View>
        
        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>5.2 Responsive Layout</Text>
          <Text style={styles.testCaseDescription}>
            Verify that UI layouts adapt correctly to different screen sizes and orientations.
          </Text>
          <Text style={styles.testSteps}>
            Steps:
            1. Test app on different device sizes (phone, tablet)
            2. Test in both portrait and landscape orientations
            3. Verify all UI elements remain accessible and properly sized
          </Text>
          <Text style={styles.expectedResult}>
            Expected Result: UI adapts to different screen sizes and orientations while maintaining usability.
          </Text>
        </View>
        
        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>5.3 Dark Cathedral Aesthetic</Text>
          <Text style={styles.testCaseDescription}>
            Verify that the dark cathedral aesthetic is consistently applied throughout the app.
          </Text>
          <Text style={styles.testSteps}>
            Steps:
            1. Navigate through all screens
            2. Verify color scheme (black, smoke, gold ink) is consistent
            3. Verify typography maintains medical/occult hybrid style
            4. Verify interactive elements follow design guidelines
          </Text>
          <Text style={styles.expectedResult}>
            Expected Result: Visual design is consistent with the dark cathedral aesthetic throughout the app.
          </Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. Settings and Preferences Testing</Text>
        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>6.1 Privacy Settings</Text>
          <Text style={styles.testCaseDescription}>
            Verify that privacy settings are applied correctly.
          </Text>
          <Text style={styles.testSteps}>
            Steps:
            1. Navigate to Settings
            2. Toggle Anonymized Profile setting
            3. Change Data Storage option
            4. Toggle Enable Sharing setting
            5. Verify settings are saved and applied
          </Text>
          <Text style={styles.expectedResult}>
            Expected Result: Privacy settings are saved and applied correctly throughout the app.
          </Text>
        </View>
        
        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>6.2 Display Settings</Text>
          <Text style={styles.testCaseDescription}>
            Verify that display settings affect the UI appropriately.
          </Text>
          <Text style={styles.testSteps}>
            Steps:
            1. Adjust Text Size setting
            2. Adjust Text Speed setting
            3. Change Dark Mode Variant
            4. Adjust Haptic Feedback intensity
            5. Verify changes are applied throughout the app
          </Text>
          <Text style={styles.expectedResult}>
            Expected Result: Display settings changes are reflected in the UI.
          </Text>
        </View>
        
        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>6.3 Accessibility Settings</Text>
          <Text style={styles.testCaseDescription}>
            Verify that accessibility settings improve app usability for different needs.
          </Text>
          <Text style={styles.testSteps}>
            Steps:
            1. Enable High Contrast Mode
            2. Enable Reduced Motion
            3. Enable Screen Reader Optimized mode
            4. Verify each setting improves accessibility as intended
          </Text>
          <Text style={styles.expectedResult}>
            Expected Result: Accessibility settings enhance usability for users with different needs.
          </Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7. Performance Testing</Text>
        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>7.1 Load Times</Text>
          <Text style={styles.testCaseDescription}>
            Verify that app screens and features load within acceptable time frames.
          </Text>
          <Text style={styles.testSteps}>
            Steps:
            1. Measure initial app launch time
            2. Measure navigation time between screens
            3. Measure simulation loading time
            4. Measure analysis generation time
            5. Verify all times are within acceptable ranges
          </Text>
          <Text style={styles.expectedResult}>
            Expected Result: All load times are within acceptable ranges for a responsive experience.
          </Text>
        </View>
        
        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>7.2 Memory Usage</Text>
          <Text style={styles.testCaseDescription}>
            Verify that app maintains reasonable memory usage during extended sessions.
          </Text>
          <Text style={styles.testSteps}>
            Steps:
            1. Monitor memory usage during app startup
            2. Complete multiple simulations in succession
            3. Navigate between screens repeatedly
            4. Verify memory usage remains stable
          </Text>
          <Text style={styles.expectedResult}>
            Expected Result: Memory usage remains stable without significant leaks or growth.
          </Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>8. Data Management Testing</Text>
        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>8.1 Data Persistence</Text>
          <Text style={styles.testCaseDescription}>
            Verify that user data persists correctly between app sessions.
          </Text>
          <Text style={styles.testSteps}>
            Steps:
            1. Complete a simulation and view analysis
            2. Close and restart the app
            3. Navigate to Library and Construct
            4. Verify all data is preserved
          </Text>
          <Text style={styles.expectedResult}>
            Expected Result: All user data persists between app sessions.
          </Text>
        </View>
        
        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>8.2 Data Export and Delete</Text>
          <Text style={styles.testCaseDescription}>
            Verify that data export and delete functions work correctly.
          </Text>
          <Text style={styles.testSteps}>
            Steps:
            1. Navigate to Settings
            2. Use Export All Data function
            3. Verify exported data is complete and readable
            4. Use Delete All Data function
            5. Verify all user data is removed
          </Text>
          <Text style={styles.expectedResult}>
            Expected Result: Data export produces complete data file, data delete removes all user data.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    padding: 16,
  },
  title: {
    color: '#D4AF37',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
    paddingBottom: 16,
  },
  sectionTitle: {
    color: '#D4AF37',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  testCase: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  testCaseTitle: {
    color: '#E8DCC1',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  testCaseDescription: {
    color: '#E8DCC1',
    fontSize: 14,
    marginBottom: 12,
  },
  testSteps: {
    color: '#E8DCC1',
    fontSize: 14,
    marginBottom: 12,
  },
  expectedResult: {
    color: '#D4AF37',
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default TestPlanDocument;
