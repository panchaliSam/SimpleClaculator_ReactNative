import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

const HistoryScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { history, clearHistory } = route.params;

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all history?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: clearHistory },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {history.length > 0 ? (
          history.map((item: string, index: number) => (
            <Text key={index} style={styles.historyItem}>
              {item}
            </Text>
          ))
        ) : (
          <Text style={styles.noHistoryText}>No history available.</Text>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.clearButton} onPress={handleClearHistory}>
        <Text style={styles.clearButtonText}>Clear History</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1E1E1E',
  },
  historyItem: {
    fontSize: 24,
    color: 'white',
    marginVertical: 5,
  },
  noHistoryText: {
    fontSize: 20,
    color: '#FF9500',
    textAlign: 'center',
    marginTop: 50,
  },
  clearButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#FF9500',
    fontSize: 18,
  },
});

export default HistoryScreen;
