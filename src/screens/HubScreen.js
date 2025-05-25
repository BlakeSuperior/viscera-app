import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';

const HubScreen = () => {
  const profile = useSelector(state => state.profile);
  const lastUpdated = profile.lastUpdated ? new Date(profile.lastUpdated).toLocaleDateString() : 'Never';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>VISCERA</Text>
        <Text style={styles.headerSubtitle}>Psychological Simulator</Text>
      </View>
      
      <View style={styles.profileIndicator}>
        <Text style={styles.profileText}>
          Profile Version: {profile.version || 1}
        </Text>
        <Text style={styles.profileUpdated}>
          Last Updated: {lastUpdated}
        </Text>
      </View>
      
      <View style={styles.hubContainer}>
        {/* The Chamber Navigation */}
        <TouchableOpacity style={[styles.navItem, styles.chamberNav]}>
          <View style={styles.navIconContainer}>
            <Image 
              source={require('../assets/chamber-icon.png')} 
              style={styles.navIcon}
              defaultSource={require('../assets/chamber-icon-default.png')}
            />
          </View>
          <Text style={styles.navTitle}>The Chamber</Text>
          <Text style={styles.navSubtitle}>Enter Simulation</Text>
        </TouchableOpacity>
        
        {/* The Library Navigation */}
        <TouchableOpacity style={[styles.navItem, styles.libraryNav]}>
          <View style={styles.navIconContainer}>
            <Image 
              source={require('../assets/library-icon.png')} 
              style={styles.navIcon}
              defaultSource={require('../assets/library-icon-default.png')}
            />
          </View>
          <Text style={styles.navTitle}>The Library</Text>
          <Text style={styles.navSubtitle}>Past Simulations</Text>
        </TouchableOpacity>
        
        {/* The Construct Navigation */}
        <TouchableOpacity style={[styles.navItem, styles.constructNav]}>
          <View style={styles.navIconContainer}>
            <Image 
              source={require('../assets/construct-icon.png')} 
              style={styles.navIcon}
              defaultSource={require('../assets/construct-icon-default.png')}
            />
          </View>
          <Text style={styles.navTitle}>The Construct</Text>
          <Text style={styles.navSubtitle}>Your Profile</Text>
        </TouchableOpacity>
        
        {/* Settings Navigation */}
        <TouchableOpacity style={[styles.navItem, styles.settingsNav]}>
          <View style={styles.navIconContainer}>
            <Image 
              source={require('../assets/settings-icon.png')} 
              style={styles.navIcon}
              defaultSource={require('../assets/settings-icon-default.png')}
            />
          </View>
          <Text style={styles.navTitle}>Settings</Text>
          <Text style={styles.navSubtitle}>Preferences</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          "The mirror reflects all but its own face."
        </Text>
      </View>
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
    alignItems: 'center',
  },
  headerTitle: {
    color: '#D4AF37',
    fontSize: 32,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#E8DCC1',
    fontSize: 14,
    marginTop: 4,
  },
  profileIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#1A1A1A',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#2A2A2A',
  },
  profileText: {
    color: '#D4AF37',
    fontSize: 12,
  },
  profileUpdated: {
    color: '#8b8b8b',
    fontSize: 12,
  },
  hubContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  navItem: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chamberNav: {
    borderLeftColor: '#D4AF37', // Gold
  },
  libraryNav: {
    borderLeftColor: '#4682B4', // Steel Blue
  },
  constructNav: {
    borderLeftColor: '#8B0000', // Dark Red
  },
  settingsNav: {
    borderLeftColor: '#E8DCC1', // Parchment
  },
  navIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: '#D4AF37',
  },
  navTitle: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navSubtitle: {
    color: '#E8DCC1',
    fontSize: 12,
    marginTop: 2,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  footerText: {
    color: '#8b8b8b',
    fontSize: 12,
    fontStyle: 'italic',
  },
});

export default HubScreen;
