import React, { useEffect } from 'react';
import { StyleSheet, StatusBar, SafeAreaView, Platform } from 'react-native';
import { registerRootComponent } from 'expo';
import AppNavigator from '../components/navigation/AppNavigator';

const App: React.FC = () => {
  useEffect(() => {
    // Set status bar style when app mounts
    StatusBar.setBarStyle('light-content'); // or 'dark-content'
    StatusBar.setBackgroundColor(Platform.OS === 'ios' ? 'transparent' : '#1E1E1E');
  }, []);

  return (
    <>
      <StatusBar
        barStyle="light-content" // Set desired style
        backgroundColor={Platform.OS === 'ios' ? 'transparent' : '#1E1E1E'}
      />
      <AppNavigator />
    </>
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
