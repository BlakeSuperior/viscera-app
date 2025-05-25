import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Switch, Slider, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const SettingsScreen = () => {
  // In a real app, these would be connected to Redux state
  const [anonymized, setAnonymized] = React.useState(false);
  const [dataStorage, setDataStorage] = React.useState('cloud');
  const [sharingEnabled, setSharingEnabled] = React.useState(false);
  const [textSize, setTextSize] = React.useState(16);
  const [textSpeed, setTextSpeed] = React.useState(1);
  const [darkModeVariant, setDarkModeVariant] = React.useState('cathedral');
  const [hapticIntensity, setHapticIntensity] = React.useState(0.5);
  const [masterVolume, setMasterVolume] = React.useState(0.7);
  const [ambientVolume, setAmbientVolume] = React.useState(0.5);
  const [effectsVolume, setEffectsVolume] = React.useState(0.8);
  const [muted, setMuted] = React.useState(false);
  const [highContrast, setHighContrast] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [screenReaderOptimized, setScreenReaderOptimized] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Customize Your Experience</Text>
      </View>
      
      <ScrollView style={styles.settingsContainer}>
        {/* Privacy Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Text style={styles.settingLabel}>Anonymized Profile</Text>
              <Text style={styles.settingDescription}>
                Remove personally identifiable information from your profile
              </Text>
            </View>
            <Switch
              value={anonymized}
              onValueChange={setAnonymized}
              trackColor={{ false: '#2A2A2A', true: '#D4AF37' }}
              thumbColor={anonymized ? '#E8DCC1' : '#8b8b8b'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Text style={styles.settingLabel}>Data Storage</Text>
              <Text style={styles.settingDescription}>
                Choose where your simulation data is stored
              </Text>
            </View>
            <View style={styles.segmentedControl}>
              <TouchableOpacity 
                style={[
                  styles.segmentButton, 
                  dataStorage === 'local' && styles.segmentButtonActive
                ]}
                onPress={() => setDataStorage('local')}
              >
                <Text 
                  style={[
                    styles.segmentButtonText,
                    dataStorage === 'local' && styles.segmentButtonTextActive
                  ]}
                >
                  Local
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.segmentButton, 
                  dataStorage === 'cloud' && styles.segmentButtonActive
                ]}
                onPress={() => setDataStorage('cloud')}
              >
                <Text 
                  style={[
                    styles.segmentButtonText,
                    dataStorage === 'cloud' && styles.segmentButtonTextActive
                  ]}
                >
                  Cloud
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.segmentButton, 
                  dataStorage === 'hybrid' && styles.segmentButtonActive
                ]}
                onPress={() => setDataStorage('hybrid')}
              >
                <Text 
                  style={[
                    styles.segmentButtonText,
                    dataStorage === 'hybrid' && styles.segmentButtonTextActive
                  ]}
                >
                  Hybrid
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Text style={styles.settingLabel}>Enable Sharing</Text>
              <Text style={styles.settingDescription}>
                Allow sharing of insights from your profile
              </Text>
            </View>
            <Switch
              value={sharingEnabled}
              onValueChange={setSharingEnabled}
              trackColor={{ false: '#2A2A2A', true: '#D4AF37' }}
              thumbColor={sharingEnabled ? '#E8DCC1' : '#8b8b8b'}
            />
          </View>
          
          <TouchableOpacity style={styles.dangerButton}>
            <Text style={styles.dangerButtonText}>Export All Data</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.dangerButton}>
            <Text style={styles.dangerButtonText}>Delete All Data</Text>
          </TouchableOpacity>
        </View>
        
        {/* Display Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Text style={styles.settingLabel}>Text Size</Text>
              <Text style={styles.settingDescription}>
                Adjust the size of text throughout the app
              </Text>
            </View>
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderValue}>A</Text>
              <Slider
                style={styles.slider}
                value={textSize}
                minimumValue={12}
                maximumValue={24}
                step={1}
                onValueChange={setTextSize}
                minimumTrackTintColor="#D4AF37"
                maximumTrackTintColor="#2A2A2A"
                thumbTintColor="#E8DCC1"
              />
              <Text style={[styles.sliderValue, { fontSize: 20 }]}>A</Text>
            </View>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Text style={styles.settingLabel}>Text Speed</Text>
              <Text style={styles.settingDescription}>
                Control how quickly text appears during simulations
              </Text>
            </View>
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderValue}>Slow</Text>
              <Slider
                style={styles.slider}
                value={textSpeed}
                minimumValue={0.5}
                maximumValue={2}
                step={0.1}
                onValueChange={setTextSpeed}
                minimumTrackTintColor="#D4AF37"
                maximumTrackTintColor="#2A2A2A"
                thumbTintColor="#E8DCC1"
              />
              <Text style={styles.sliderValue}>Fast</Text>
            </View>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Text style={styles.settingLabel}>Dark Mode Variant</Text>
              <Text style={styles.settingDescription}>
                Choose your preferred dark theme style
              </Text>
            </View>
            <View style={styles.themeSelector}>
              <TouchableOpacity 
                style={[
                  styles.themeOption, 
                  darkModeVariant === 'cathedral' && styles.themeOptionActive,
                  { backgroundColor: '#0A0A0A' }
                ]}
                onPress={() => setDarkModeVariant('cathedral')}
              >
                <Text style={styles.themeOptionText}>Cathedral</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.themeOption, 
                  darkModeVariant === 'void' && styles.themeOptionActive,
                  { backgroundColor: '#000000' }
                ]}
                onPress={() => setDarkModeVariant('void')}
              >
                <Text style={styles.themeOptionText}>Void</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.themeOption, 
                  darkModeVariant === 'twilight' && styles.themeOptionActive,
                  { backgroundColor: '#1A1A2E' }
                ]}
                onPress={() => setDarkModeVariant('twilight')}
              >
                <Text style={styles.themeOptionText}>Twilight</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Text style={styles.settingLabel}>Haptic Feedback</Text>
              <Text style={styles.settingDescription}>
                Adjust the intensity of haptic feedback
              </Text>
            </View>
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderValue}>Off</Text>
              <Slider
                style={styles.slider}
                value={hapticIntensity}
                minimumValue={0}
                maximumValue={1}
                step={0.1}
                onValueChange={setHapticIntensity}
                minimumTrackTintColor="#D4AF37"
                maximumTrackTintColor="#2A2A2A"
                thumbTintColor="#E8DCC1"
              />
              <Text style={styles.sliderValue}>Max</Text>
            </View>
          </View>
        </View>
        
        {/* Audio Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Audio</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Text style={styles.settingLabel}>Master Volume</Text>
            </View>
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderValue}>0</Text>
              <Slider
                style={styles.slider}
                value={masterVolume}
                minimumValue={0}
                maximumValue={1}
                step={0.1}
                onValueChange={setMasterVolume}
                minimumTrackTintColor="#D4AF37"
                maximumTrackTintColor="#2A2A2A"
                thumbTintColor="#E8DCC1"
              />
              <Text style={styles.sliderValue}>100</Text>
            </View>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Text style={styles.settingLabel}>Ambient Volume</Text>
            </View>
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderValue}>0</Text>
              <Slider
                style={styles.slider}
                value={ambientVolume}
                minimumValue={0}
                maximumValue={1}
                step={0.1}
                onValueChange={setAmbientVolume}
                minimumTrackTintColor="#D4AF37"
                maximumTrackTintColor="#2A2A2A"
                thumbTintColor="#E8DCC1"
              />
              <Text style={styles.sliderValue}>100</Text>
            </View>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Text style={styles.settingLabel}>Effects Volume</Text>
            </View>
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderValue}>0</Text>
              <Slider
                style={styles.slider}
                value={effectsVolume}
                minimumValue={0}
                maximumValue={1}
                step={0.1}
                onValueChange={setEffectsVolume}
                minimumTrackTintColor="#D4AF37"
                maximumTrackTintColor="#2A2A2A"
                thumbTintColor="#E8DCC1"
              />
              <Text style={styles.sliderValue}>100</Text>
            </View>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Text style={styles.settingLabel}>Mute All Audio</Text>
            </View>
            <Switch
              value={muted}
              onValueChange={setMuted}
              trackColor={{ false: '#2A2A2A', true: '#D4AF37' }}
              thumbColor={muted ? '#E8DCC1' : '#8b8b8b'}
            />
          </View>
        </View>
        
        {/* Accessibility Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accessibility</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Text style={styles.settingLabel}>High Contrast Mode</Text>
              <Text style={styles.settingDescription}>
                Increase contrast for better visibility
              </Text>
            </View>
            <Switch
              value={highContrast}
              onValueChange={setHighContrast}
              trackColor={{ false: '#2A2A2A', true: '#D4AF37' }}
              thumbColor={highContrast ? '#E8DCC1' : '#8b8b8b'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Text style={styles.settingLabel}>Reduced Motion</Text>
              <Text style={styles.settingDescription}>
                Minimize animations and motion effects
              </Text>
            </View>
            <Switch
              value={reducedMotion}
              onValueChange={setReducedMotion}
              trackColor={{ false: '#2A2A2A', true: '#D4AF37' }}
              thumbColor={reducedMotion ? '#E8DCC1' : '#8b8b8b'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Text style={styles.settingLabel}>Screen Reader Optimized</Text>
              <Text style={styles.settingDescription}>
                Enhance compatibility with screen readers
              </Text>
            </View>
            <Switch
              value={screenReaderOptimized}
              onValueChange={setScreenReaderOptimized}
              trackColor={{ false: '#2A2A2A', true: '#D4AF37' }}
              thumbColor={screenReaderOptimized ? '#E8DCC1' : '#8b8b8b'}
            />
          </View>
        </View>
        
        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Version</Text>
            <Text style={styles.aboutValue}>1.0.0</Text>
          </View>
          
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Privacy Policy</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Terms of Service</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Acknowledgements</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  headerTitle: {
    color: '#D4AF37',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerSubtitle: {
    color: '#E8DCC1',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
  settingsContainer: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
    paddingBottom: 16,
  },
  sectionTitle: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingLabelContainer: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    color: '#E8DCC1',
    fontSize: 16,
  },
  settingDescription: {
    color: '#8b8b8b',
    fontSize: 12,
    marginTop: 2,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderValue: {
    color: '#E8DCC1',
    fontSize: 12,
    width: 30,
    textAlign: 'center',
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    overflow: 'hidden',
  },
  segmentButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  segmentButtonActive: {
    backgroundColor: '#D4AF37',
  },
  segmentButtonText: {
    color: '#E8DCC1',
    fontSize: 12,
  },
  segmentButtonTextActive: {
    color: '#0A0A0A',
    fontWeight: 'bold',
  },
  themeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  themeOption: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeOptionActive: {
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  themeOptionText: {
    color: 'transparent',
    fontSize: 1,
  },
  dangerButton: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#8B0000',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  dangerButtonText: {
    color: '#8B0000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  aboutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  aboutLabel: {
    color: '#E8DCC1',
    fontSize: 14,
  },
  aboutValue: {
    color: '#8b8b8b',
    fontSize: 14,
  },
  linkButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  linkButtonText: {
    color: '#D4AF37',
    fontSize: 14,
  },
});

export default SettingsScreen;
