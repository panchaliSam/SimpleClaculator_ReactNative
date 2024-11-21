import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Calculator from '../Calculator';
import HistoryScreen from '../HistoryScreen';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Calculator">
        <Stack.Screen
          name="Calculator"
          component={Calculator}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ title: 'History', headerStyle: { backgroundColor: '#1E1E1E' }, headerTintColor: 'white' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
