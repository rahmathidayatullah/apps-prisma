import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/components/navigations/AuthNavigator';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
