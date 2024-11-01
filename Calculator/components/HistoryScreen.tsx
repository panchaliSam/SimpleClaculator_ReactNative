import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const HistoryScreen: React.FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  const { history } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView>
        {history.map((item, index) => (
          <Text key={index} style={styles.historyItem}>{item}</Text>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
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
  title: {
    fontSize: 32,
    color: 'white',
    marginBottom: 20,
  },
  historyItem: {
    fontSize: 24,
    color: 'white',
    marginVertical: 5,
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FF9500',
    fontSize: 18,
  },
});

export default HistoryScreen;
