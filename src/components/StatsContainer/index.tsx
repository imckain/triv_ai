/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

export const StatsContainer: React.FC = () => {

  return (
    <View style={styles.statRow}>
      <View style={styles.statCol}>
        <Text style={styles.statText}>10</Text>
        <Text style={styles.statDescription}>PLAYED</Text>
      </View>
      <View style={styles.statCol}>
        <Text style={styles.statText}>50</Text>
        <Text style={styles.statDescription}>WIN %</Text>
      </View>
      <View style={styles.statCol}>
        <Text style={styles.statText}>14</Text>
        <Text style={styles.statDescription}>STREAK</Text>
      </View>
      <View style={styles.statCol}>
        <Text style={styles.statText}>38</Text>
        <Text style={styles.statDescription}>ALL-TIME</Text>
        <Text style={styles.statDescription}>STREAK</Text>
      </View>
    </View>
  );
};
