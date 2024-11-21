import React, { useEffect } from 'react';
import { StyleSheet, StatusBar, View, Platform } from 'react-native';
import { registerRootComponent } from 'expo';
import AppNavigator from '../components/navigation/AppNavigator';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
LogBox.ignoreAllLogs(true);

const App: React.FC = () => {
  useEffect(() => {
    // Set status bar style when app mounts
    StatusBar.setBarStyle('light-content'); // or 'dark-content'
    //StatusBar.setBackgroundColor(Platform.OS === 'ios' ? 'transparent' : '#1E1E1E');
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content" // Set desired style
        backgroundColor={Platform.OS === 'ios' ? '#1E1E1E' : '#1E1E1E'}
      />
      <AppNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

registerRootComponent(App);

export default App;
