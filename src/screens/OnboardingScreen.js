import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [step, setStep] = React.useState(1);
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.welcomeTitle}>Welcome to VISCERA</Text>
            <Text style={styles.welcomeText}>
              A psychological simulator that uses philosophical games, moral dilemmas, and adaptive questioning to reflect a living, evolving version of your psyche.
            </Text>
            <Text style={styles.welcomeSubtext}>
              It doesn't just tell you who you are—it watches who you become.
            </Text>
            <TouchableOpacity 
              style={styles.continueButton}
              onPress={() => setStep(2)}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        );
      
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>The Chamber</Text>
            <Text style={styles.stepDescription}>
              The core experience of VISCERA is The Chamber - a library of interactive, narratively-driven thought experiments.
            </Text>
            <Text style={styles.stepDetail}>
              • Multi-stage ethical simulations with moral complexity
            </Text>
            <Text style={styles.stepDetail}>
              • Written in cinematic prose, like you're living inside a psychodrama
            </Text>
            <Text style={styles.stepDetail}>
              • Type natural-language responses as the simulation adapts
            </Text>
            <Text style={styles.stepDetail}>
              • Call "End Simulation" at any time to trigger deep profile analysis
            </Text>
            <TouchableOpacity 
              style={styles.continueButton}
              onPress={() => setStep(3)}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        );
      
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>The Profiler Engine</Text>
            <Text style={styles.stepDescription}>
              Behind the scenes, VISCERA's AI analyzes your responses to build a psychological profile.
            </Text>
            <Text style={styles.stepDetail}>
              • Detects your narrative reflexes (what role did you assume?)
            </Text>
            <Text style={styles.stepDetail}>
              • Extracts latent traits (patterns in logic, emotion, instinct)
            </Text>
            <Text style={styles.stepDetail}>
              • Identifies contradictions in your reasoning
            </Text>
            <Text style={styles.stepDetail}>
              • Synthesizes insights about your psychological makeup
            </Text>
            <TouchableOpacity 
              style={styles.continueButton}
              onPress={() => setStep(4)}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        );
      
      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>The Library & The Construct</Text>
            <Text style={styles.stepDescription}>
              VISCERA maintains an archive of your journey and visualizes your evolving identity.
            </Text>
            <Text style={styles.stepDetail}>
              • The Library houses all prior scenarios you've completed
            </Text>
            <Text style={styles.stepDetail}>
              • View by date, tag, theme, or psychological outcome
            </Text>
            <Text style={styles.stepDetail}>
              • The Construct is your Raw Identity, visually represented
            </Text>
            <Text style={styles.stepDetail}>
              • Watch as your profile evolves over time through radar charts, trait bars, and contradiction heatmaps
            </Text>
            <TouchableOpacity 
              style={styles.continueButton}
              onPress={() => setStep(5)}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        );
      
      case 5:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Privacy & Consent</Text>
            <Text style={styles.stepDescription}>
              VISCERA deals with sensitive psychological data. Your privacy is paramount.
            </Text>
            <Text style={styles.stepDetail}>
              • All data can be stored locally on your device
            </Text>
            <Text style={styles.stepDetail}>
              • Cloud storage is optional and encrypted
            </Text>
            <Text style={styles.stepDetail}>
              • You can export or delete your data at any time
            </Text>
            <Text style={styles.stepDetail}>
              • Anonymized mode available for complete privacy
            </Text>
            <TouchableOpacity 
              style={styles.continueButton}
              onPress={() => navigation.navigate('Hub')}
            >
              <Text style={styles.continueButtonText}>Begin Experience</Text>
            </TouchableOpacity>
          </View>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>VISCERA</Text>
      </View>
      
      {renderStep()}
      
      <View style={styles.progressContainer}>
        {[1, 2, 3, 4, 5].map(i => (
          <View 
            key={i}
            style={[
              styles.progressDot,
              step === i && styles.progressDotActive
            ]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoText: {
    color: '#D4AF37',
    fontSize: 36,
    fontWeight: 'bold',
  },
  stepContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  welcomeTitle: {
    color: '#D4AF37',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  welcomeText: {
    color: '#E8DCC1',
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 16,
    textAlign: 'center',
  },
  welcomeSubtext: {
    color: '#D4AF37',
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 40,
    textAlign: 'center',
  },
  stepTitle: {
    color: '#D4AF37',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  stepDescription: {
    color: '#E8DCC1',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  stepDetail: {
    color: '#E8DCC1',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
    paddingLeft: 16,
  },
  continueButton: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 40,
  },
  continueButtonText: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 24,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2A2A2A',
    marginHorizontal: 6,
  },
  progressDotActive: {
    backgroundColor: '#D4AF37',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default OnboardingScreen;
