import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../../screens/home/Home';
import {routeMenu} from '../../contants/routes';
import ListOfSubmission from '../../screens/home/ListOfSubmission';
import ListAttendaceLog from '../../screens/home/ListAttendanceLog';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TakeSelfie from '../../screens/home/TakeSelfie';
import ViewCurrentLocation from '../../screens/home/ViewCurrentLocation';

const Stack = createNativeStackNavigator();

export default function NestedHomeNaviagator() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{}} initialRouteName={routeMenu.HOME}>
        <Stack.Screen
          name={routeMenu.HOME}
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={routeMenu.LIST_OF_SUBMISSION}
          component={ListOfSubmission}
        />
        <Stack.Screen
          name={routeMenu.LIST_ATTENDACE_LOG}
          component={ListAttendaceLog}
        />
        <Stack.Screen name={routeMenu.TAKE_SEFIE} component={TakeSelfie} />
        <Stack.Screen
          name={routeMenu.VIEW_CURRENT_LOCATION}
          component={ViewCurrentLocation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
