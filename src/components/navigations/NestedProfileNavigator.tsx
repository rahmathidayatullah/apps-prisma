import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../../screens/home/Home';
import {routeMenu} from '../../contants/routes';
import ListOfSubmission from '../../screens/home/ListOfSubmission';
import ListAttendaceLog from '../../screens/home/ListAttendanceLog';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TakeSelfie from '../../screens/home/TakeSelfie';
import ViewCurrentLocation from '../../screens/home/ViewCurrentLocation';
import PersonalInfo from '../../screens/home/PersonalInfo';
import LoginScreen from '../../screens/auth/Login';
import ProfileScreen from '../../screens/home/Profile';

const Stack = createNativeStackNavigator();

export default function NestedProfileNaviagator() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{}} initialRouteName={routeMenu.PROFILE}>
        <Stack.Screen
          name={routeMenu.PROFILE}
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name={routeMenu.PERSONAL_INFO} component={PersonalInfo} />
        {/* <Stack.Screen name={routeMenu.LOGIN} component={LoginScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
