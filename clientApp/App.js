// In App.js in a new project

import * as React from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainStack from './navigation/stacks/MainStack';

import { Provider } from 'react-redux';
import store from './store';
const Stack = createNativeStackNavigator();

function App() {
  return (

    <Provider store={store}>
      <NavigationContainer >
        <MainStack />
      </NavigationContainer>
    </Provider>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    width: '100%',
    backgroundColor: "#fff",
  },
  primaryColor: {
   backgroundColor: "#f2f2f2"
  }
})
export default App;