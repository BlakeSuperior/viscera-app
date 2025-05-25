import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentView, setFilters, clearFilters } from '../store/librarySlice';

const LibraryScreen = () => {
  const dispatch = useDispatch();
  const { userSimulations, loading, filters, currentView } = useSelector(state => state.library);

  const renderSimulationItem = ({ item }) => (
    <TouchableOpacity style={styles.simulationItem}>
      <View style={styles.simulationHeader}>
        <Text style={styles.simulationTitle}>{item.simulation?.title || 'Untitled'}</Text>
        <Text style={styles.simulationNumber}>{item.simulation?.simulationNumber || '000'}</Text>
      </View>
      
      <View style={styles.simulationMeta}>
        <Text style={styles.simulationDate}>
          {new Date(item.completedAt).toLocaleDateString()}
        </Text>
        <View style={styles.tagContainer}>
          {item.simulation?.tags?.map((tag, index) => (
            <Text key={index} style={styles.tag}>{tag}</Text>
          ))}
        </View>
      </View>
      
      <Text style={styles.simulationSummary}>
        {item.analysis?.decisionsummary?.substring(0, 100)}...
      </Text>
      
      <View style={styles.simulationFooter}>
        <Text style={styles.narrativeReflex}>
          Role: {item.analysis?.narrativeReflex || 'Unknown'}
        </Text>
        <Text style={styles.contradictionCount}>
          Contradictions: {item.analysis?.contradictions?.length || 0}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderFilterBar = () => (
    <View style={styles.filterBar}>
      <Text style={styles.filterTitle}>View:</Text>
      
      <View style={styles.viewOptions}>
        <TouchableOpacity 
          style={[
            styles.viewOption, 
            currentView === 'chronological' && styles.viewOptionActive
          ]}
          onPress={() => dispatch(setCurrentView('chronological'))}
        >
          <Text style={[
            styles.viewOptionText,
            currentView === 'chronological' && styles.viewOptionTextActive
          ]}>
            Chronological
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.viewOption, 
            currentView === 'byTag' && styles.viewOptionActive
          ]}
          onPress={() => dispatch(setCurrentView('byTag'))}
        >
          <Text style={[
            styles.viewOptionText,
            currentView === 'byTag' && styles.viewOptionTextActive
          ]}>
            By Tag
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.viewOption, 
            currentView === 'byOutcome' && styles.viewOptionActive
          ]}
          onPress={() => dispatch(setCurrentView('byOutcome'))}
        >
          <Text style={[
            styles.viewOptionText,
            currentView === 'byOutcome' && styles.viewOptionTextActive
          ]}>
            By Outcome
          </Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.clearFiltersButton}
        onPress={() => dispatch(clearFilters())}
      >
        <Text style={styles.clearFiltersText}>Clear Filters</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>The Library</Text>
        <Text style={styles.headerSubtitle}>Archive of Past Simulations</Text>
      </View>
      
      {renderFilterBar()}
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading archives...</Text>
        </View>
      ) : userSimulations.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No simulations in archive.</Text>
          <Text style={styles.emptySubtext}>Complete your first Chamber to begin building your psychological profile.</Text>
        </View>
      ) : (
        <FlatList
          data={userSimulations}
          renderItem={renderSimulationItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
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
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#1A1A1A',
  },
  filterTitle: {
    color: '#E8DCC1',
    fontSize: 14,
    marginRight: 8,
  },
  viewOptions: {
    flexDirection: 'row',
    flex: 1,
  },
  viewOption: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
  },
  viewOptionActive: {
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  viewOptionText: {
    color: '#E8DCC1',
    fontSize: 12,
  },
  viewOptionTextActive: {
    color: '#D4AF37',
    fontWeight: 'bold',
  },
  clearFiltersButton: {
    padding: 6,
  },
  clearFiltersText: {
    color: '#8B0000',
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#E8DCC1',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    color: '#E8DCC1',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    color: '#8b8b8b',
    fontSize: 14,
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
  },
  simulationItem: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#D4AF37',
  },
  simulationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  simulationTitle: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  simulationNumber: {
    color: '#8b8b8b',
    fontSize: 12,
  },
  simulationMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  simulationDate: {
    color: '#8b8b8b',
    fontSize: 12,
  },
  tagContainer: {
    flexDirection: 'row',
  },
  tag: {
    color: '#E8DCC1',
    fontSize: 10,
    backgroundColor: '#2A2A2A',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginLeft: 4,
  },
  simulationSummary: {
    color: '#E8DCC1',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  simulationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  narrativeReflex: {
    color: '#4682B4',
    fontSize: 12,
  },
  contradictionCount: {
    color: '#8B0000',
    fontSize: 12,
  },
});

export default LibraryScreen;
