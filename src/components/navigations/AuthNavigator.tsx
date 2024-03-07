import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../screens/auth/Login';
import RegisterScreen from '../../screens/auth/Register';
import ForgotPasswordScreen from '../../screens/auth/ForgotPassword';
import HomeNaviagator from './HomeNavigator';
import {routeMenu} from '../../contants/routes';
const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{}} initialRouteName={routeMenu.LOGIN}>
        <Stack.Screen
          name={routeMenu.LOGIN}
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={routeMenu.REGISTER}
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={routeMenu.FORGOT_PASSWORD}
          component={ForgotPasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={routeMenu.HOME}
          component={HomeNaviagator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigator;
