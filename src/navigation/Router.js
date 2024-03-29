import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/Home';
import TabNavigator from './TabNavigator';
import AddContactScreen from '../screens/AddContact';

const Stack = createStackNavigator();

const Router = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'Home'}
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name={'Go To Contacts!'} component={TabNavigator}/>
        <Stack.Screen name={'Add Contacts'} component={AddContactScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;