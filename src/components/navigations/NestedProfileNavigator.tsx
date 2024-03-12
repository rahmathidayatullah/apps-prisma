import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {routeMenu} from '../../contants/routes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PersonalInfo from '../../screens/home/PersonalInfo';
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
        <Stack.Screen
          name={routeMenu.PERSONAL_INFO}
          component={PersonalInfo}
          options={{title: 'Informasi Pribadi'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
