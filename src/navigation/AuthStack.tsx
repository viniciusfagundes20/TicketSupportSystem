import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Auth/Login';

const Stack = createStackNavigator();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
