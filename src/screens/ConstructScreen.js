import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Svg, Polygon, Circle, Line, Text as SvgText } from 'react-native-svg';

const ConstructScreen = () => {
  const { traits, contradictions, narrativeRoles, psychometricSummary, evolutionMetrics } = 
    useSelector(state => state.profile);
  
  const [activeView, setActiveView] = React.useState('radar'); // 'radar', 'bars', 'heatmap', 'timeline'
  
  const renderRadarChart = () => {
    // This is a simplified radar chart implementation
    // In a real app, you would use a more sophisticated charting library
    
    // Group traits by category for the radar chart
    const traitCategories = {};
    traits.forEach(trait => {
      if (!traitCategories[trait.category]) {
        traitCategories[trait.category] = [];
      }
      traitCategories[trait.category].push(trait);
    });
    
    const categories = Object.keys(traitCategories);
    const numCategories = categories.length || 5; // Default to 5 if no categories
    
    // Calculate points for radar chart
    const centerX = 150;
    const centerY = 150;
    const radius = 100;
    
    // Generate polygon points for each category
    const generatePolygonPoints = (categoryValues) => {
      return categories.map((category, i) => {
        const angle = (Math.PI * 2 * i) / numCategories;
        const value = categoryValues[category] || 0;
        const distance = (value / 10) * radius; // Normalize to 0-10 scale
        const x = centerX + distance * Math.cos(angle);
        const y = centerY + distance * Math.sin(angle);
        return `${x},${y}`;
      }).join(' ');
    };
    
    // Calculate average value for each category
    const categoryValues = {};
    categories.forEach(category => {
      const categoryTraits = traitCategories[category];
      const sum = categoryTraits.reduce((acc, trait) => acc + trait.value, 0);
      categoryValues[category] = categoryTraits.length ? sum / categoryTraits.length : 0;
    });
    
    // Generate axis lines and labels
    const axisLines = categories.map((category, i) => {
      const angle = (Math.PI * 2 * i) / numCategories;
      const x2 = centerX + radius * Math.cos(angle);
      const y2 = centerY + radius * Math.sin(angle);
      
      // Position for label (slightly beyond the radar edge)
      const labelX = centerX + (radius + 20) * Math.cos(angle);
      const labelY = centerY + (radius + 20) * Math.sin(angle);
      
      return (
        <React.Fragment key={i}>
          <Line
            x1={centerX}
            y1={centerY}
            x2={x2}
            y2={y2}
            stroke="#2A2A2A"
            strokeWidth="1"
          />
          <SvgText
            x={labelX}
            y={labelY}
            fill="#E8DCC1"
            fontSize="10"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {category}
          </SvgText>
        </React.Fragment>
      );
    });
    
    // Generate concentric circles for scale
    const circles = [0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
      <Circle
        key={i}
        cx={centerX}
        cy={centerY}
        r={radius * scale}
        stroke="#2A2A2A"
        strokeWidth="1"
        fill="none"
      />
    ));
    
    return (
      <View style={styles.chartContainer}>
        <Svg height="300" width="300" viewBox="0 0 300 300">
          {/* Background circles */}
          {circles}
          
          {/* Axis lines and labels */}
          {axisLines}
          
          {/* Data polygon */}
          <Polygon
            points={generatePolygonPoints(categoryValues)}
            fill="rgba(212, 175, 55, 0.3)"
            stroke="#D4AF37"
            strokeWidth="2"
          />
        </Svg>
      </View>
    );
  };
  
  const renderTraitBars = () => {
    // Sort traits by value for better visualization
    const sortedTraits = [...traits].sort((a, b) => b.value - a.value);
    
    return (
      <ScrollView style={styles.barsContainer}>
        {sortedTraits.map((trait, index) => {
          // Normalize trait value to 0-100% for bar width
          const barWidth = `${Math.abs(trait.value) * 10}%`;
          const isPositive = trait.value >= 0;
          
          return (
            <View key={index} style={styles.traitBarItem}>
              <Text style={styles.traitBarName}>{trait.name}</Text>
              <View style={styles.traitBarContainer}>
                <View 
                  style={[
                    styles.traitBar, 
                    {
                      width: barWidth,
                      backgroundColor: isPositive ? '#4682B4' : '#8B0000',
                      alignSelf: isPositive ? 'flex-start' : 'flex-end'
                    }
                  ]}
                />
              </View>
              <Text style={styles.traitBarValue}>{trait.value.toFixed(1)}</Text>
            </View>
          );
        })}
      </ScrollView>
    );
  };
  
  const renderContradictionHeatmap = () => {
    return (
      <View style={styles.heatmapContainer}>
        {contradictions.length === 0 ? (
          <Text style={styles.emptyText}>No contradictions detected yet.</Text>
        ) : (
          <ScrollView>
            {contradictions.map((contradiction, index) => (
              <View key={index} style={styles.contradictionItem}>
                <View style={styles.contradictionHeader}>
                  <Text style={styles.contradictionTitle}>{contradiction.description}</Text>
                  <View 
                    style={[
                      styles.frequencyIndicator,
                      { backgroundColor: getHeatColor(contradiction.frequency) }
                    ]}
                  />
                </View>
                
                <Text style={styles.contradictionDate}>
                  First detected: {new Date(contradiction.firstDetected).toLocaleDateString()}
                </Text>
                
                <Text style={styles.contradictionDate}>
                  Last confirmed: {new Date(contradiction.lastConfirmed).toLocaleDateString()}
                </Text>
                
                <View style={styles.relatedTraitsContainer}>
                  {contradiction.relatedTraits.map((trait, i) => (
                    <Text key={i} style={styles.relatedTrait}>{trait}</Text>
                  ))}
                </View>
                
                <Text 
                  style={[
                    styles.statusIndicator,
                    { color: getStatusColor(contradiction.status) }
                  ]}
                >
                  {contradiction.status.toUpperCase()}
                </Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    );
  };
  
  const renderNarrativeTimeline = () => {
    return (
      <View style={styles.timelineContainer}>
        {narrativeRoles.length === 0 ? (
          <Text style={styles.emptyText}>No narrative roles detected yet.</Text>
        ) : (
          <ScrollView>
            {narrativeRoles.map((role, index) => (
              <View key={index} style={styles.roleItem}>
                <View style={styles.roleHeader}>
                  <Text style={styles.roleName}>{role.role}</Text>
                  <Text style={styles.roleFrequency}>
                    {(role.frequency * 100).toFixed(0)}%
                  </Text>
                </View>
                
                <Text style={styles.roleDate}>
                  First observed: {new Date(role.firstObserved).toLocaleDateString()}
                </Text>
                
                <Text style={styles.roleDate}>
                  Last observed: {new Date(role.lastObserved).toLocaleDateString()}
                </Text>
                
                <View style={styles.contextContainer}>
                  {role.contexts.map((context, i) => (
                    <Text key={i} style={styles.contextItem}>{context}</Text>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    );
  };
  
  // Helper functions for visualization
  const getHeatColor = (frequency) => {
    // Convert frequency to a heat color (green to red)
    if (frequency <= 1) return '#4682B4'; // Cool blue for rare
    if (frequency <= 3) return '#D4AF37'; // Gold for moderate
    return '#8B0000'; // Blood red for frequent
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#8B0000'; // Blood red
      case 'resolved': return '#4682B4'; // Cool blue
      case 'fluctuating': return '#D4AF37'; // Gold
      default: return '#E8DCC1'; // Default text color
    }
  };
  
  // Render the appropriate visualization based on active view
  const renderVisualization = () => {
    switch (activeView) {
      case 'radar': return renderRadarChart();
      case 'bars': return renderTraitBars();
      case 'heatmap': return renderContradictionHeatmap();
      case 'timeline': return renderNarrativeTimeline();
      default: return renderRadarChart();
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>The Construct</Text>
        <Text style={styles.headerSubtitle}>Your Psychological Profile</Text>
      </View>
      
      <View style={styles.viewSelector}>
        <TouchableOpacity 
          style={[styles.viewOption, activeView === 'radar' && styles.viewOptionActive]}
          onPress={() => setActiveView('radar')}
        >
          <Text 
            style={[styles.viewOptionText, activeView === 'radar' && styles.viewOptionTextActive]}
          >
            Radar
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.viewOption, activeView === 'bars' && styles.viewOptionActive]}
          onPress={() => setActiveView('bars')}
        >
          <Text 
            style={[styles.viewOptionText, activeView === 'bars' && styles.viewOptionTextActive]}
          >
            Traits
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.viewOption, activeView === 'heatmap' && styles.viewOptionActive]}
          onPress={() => setActiveView('heatmap')}
        >
          <Text 
            style={[styles.viewOptionText, activeView === 'heatmap' && styles.viewOptionTextActive]}
          >
            Contradictions
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.viewOption, activeView === 'timeline' && styles.viewOptionActive]}
          onPress={() => setActiveView('timeline')}
        >
          <Text 
            style={[styles.viewOptionText, activeView === 'timeline' && styles.viewOptionTextActive]}
          >
            Roles
          </Text>
        </TouchableOpacity>
      </View>
      
      {renderVisualization()}
      
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Psychometric Summary</Text>
        
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Moral Flexibility</Text>
            <Text style={styles.summaryValue}>{psychometricSummary.moralFlexibility.toFixed(1)}</Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Empathic Range</Text>
            <Text style={styles.summaryValue}>{psychometricSummary.empathicRange.toFixed(1)}</Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Cognitive Consistency</Text>
            <Text style={styles.summaryValue}>{psychometricSummary.cognitiveConsistency.toFixed(1)}</Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Self Awareness</Text>
            <Text style={styles.summaryValue}>{psychometricSummary.selfAwareness.toFixed(1)}</Text>
          </View>
        </View>
        
        <View style={styles.evolutionContainer}>
          <Text style={styles.evolutionTitle}>Evolution Metrics</Text>
          <Text style={styles.stabilityText}>
            Stability Index: {evolutionMetrics.stabilityIndex.toFixed(2)}
          </Text>
          <Text style={styles.growthText}>
            Growth Vector: {evolutionMetrics.growthVector}
          </Text>
        </View>
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
  viewSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    backgroundColor: '#1A1A1A',
  },
  viewOption: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
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
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    height: 300,
  },
  barsContainer: {
    padding: 16,
    maxHeight: 300,
  },
  traitBarItem: {
    marginBottom: 12,
  },
  traitBarName: {
    color: '#E8DCC1',
    fontSize: 14,
    marginBottom: 4,
  },
  traitBarContainer: {
    height: 16,
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    overflow: 'hidden',
  },
  traitBar: {
    height: '100%',
    borderRadius: 8,
  },
  traitBarValue: {
    color: '#D4AF37',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: 2,
  },
  heatmapContainer: {
    padding: 16,
    maxHeight: 300,
  },
  contradictionItem: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  contradictionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  contradictionTitle: {
    color: '#E8DCC1',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  frequencyIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  contradictionDate: {
    color: '#8b8b8b',
    fontSize: 12,
    marginBottom: 4,
  },
  relatedTraitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  relatedTrait: {
    color: '#E8DCC1',
    fontSize: 10,
    backgroundColor: '#2A2A2A',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    margin: 2,
  },
  statusIndicator: {
    alignSelf: 'flex-end',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
  },
  timelineContainer: {
    padding: 16,
    maxHeight: 300,
  },
  roleItem: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  roleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  roleName: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: 'bold',
  },
  roleFrequency: {
    color: '#E8DCC1',
    fontSize: 14,
  },
  roleDate: {
    color: '#8b8b8b',
    fontSize: 12,
    marginBottom: 4,
  },
  contextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  contextItem: {
    color: '#E8DCC1',
    fontSize: 10,
    backgroundColor: '#2A2A2A',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    margin: 2,
  },
  emptyText: {
    color: '#8b8b8b',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 40,
  },
  summaryContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  summaryTitle: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryItem: {
    width: '48%',
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  summaryLabel: {
    color: '#E8DCC1',
    fontSize: 12,
  },
  summaryValue: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  evolutionContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  evolutionTitle: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stabilityText: {
    color: '#E8DCC1',
    fontSize: 12,
    marginBottom: 4,
  },
  growthText: {
    color: '#E8DCC1',
    fontSize: 12,
  },
});

export default ConstructScreen;
