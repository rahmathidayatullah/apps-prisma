import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/components/navigations/AuthNavigator';

function App() {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}

export default App;
