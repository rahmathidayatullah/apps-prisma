import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/components/navigations/AuthNavigator';
import {store} from './src/redux/store';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {stateGlobalAuth} from './src/redux/features/auth/interface';
import HomeNaviagator from './src/components/navigations/HomeNavigator';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {initAuth} from './src/redux/features/auth/actions';
import {COLORS} from './src/contants';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const RootNavigation = () => {
  const dispatch: any = useDispatch();
  const {userData} = useSelector((state: stateGlobalAuth) => state.auth);
  const [loading, setLoading] = React.useState(true);

  const init = () => {
    dispatch(initAuth());
    setLoading(false);
  };
  React.useEffect(() => {
    init();
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.bgPrimary} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {userData.access_token === '' ? <AuthNavigator /> : <HomeNaviagator />}
    </NavigationContainer>
  );
};

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
