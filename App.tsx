import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/components/navigations/AuthNavigator';
import {store} from './src/redux/store';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {stateGlobalAuth} from './src/redux/features/auth/interface';
import HomeNaviagator from './src/components/navigations/HomeNavigator';
import {ActivityIndicator, Platform, StatusBar, View} from 'react-native';
import {initAuth} from './src/redux/features/auth/actions';
import {COLORS} from './src/contants';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import notifee, {
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import SplashScreen from 'react-native-splash-screen'
import moment from 'moment';

const RootNavigation = () => {
  const dispatch: any = useDispatch();
  const {userData} = useSelector((state: stateGlobalAuth) => state.auth);
  const [loading, setLoading] = React.useState(true);

  const init = () => {
    dispatch(initAuth());
    setLoading(false);
  };

  async function onDisplayNotification1805() {
    const timeStart = new Date(Date.now());
    timeStart.setHours(18);
    timeStart.setMinutes(5);

    // Mon Apr 01 2024 18:05:59 GMT+0700 convert to 18:05

    const inputDate = moment(timeStart, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
    const formattedTime = inputDate.format("HH:mm");

    // Create a time-based trigger
    // const trigger: TimestampTrigger = {
    //   type: TriggerType.TIMESTAMP,
    //   timestamp: timeStart.getTime(),
    // };

    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.createTriggerNotification(
      {
        title: 'Pengingat',
        body: `Segera absen sudah jam ${formattedTime}`,
        android: {
          channelId,
          // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: 'default',
            launchActivity: 'default',
          },
          vibrationPattern: [300, 500],
          // pressAction: {
          //   id: 'default',
          // },
        },
        ios: {
          critical: true,
          criticalVolume: 1,
        },
      },
      {
        type: TriggerType.TIMESTAMP,
        timestamp: timeStart.getTime(),
        repeatFrequency: RepeatFrequency.DAILY,
        alarmManager: {
          allowWhileIdle: true,
        },
      },
    );
  }
  async function onDisplayNotification0750() {
    const timeStart = new Date(Date.now());
    timeStart.setHours(7);
    timeStart.setMinutes(50);

    const inputDate = moment(timeStart, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
    const formattedTime = inputDate.format("HH:mm");

    // Create a time-based trigger
    // const trigger: TimestampTrigger = {
    //   type: TriggerType.TIMESTAMP,
    //   timestamp: timeStart.getTime(),
    // };

    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.createTriggerNotification(
      {
        title: 'Pengingat',
        body: `Segera absen sudah jam ${formattedTime}`,
        android: {
          channelId,
          // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: 'default',
            launchActivity: 'default',
          },
          vibrationPattern: [300, 500],
          // pressAction: {
          //   id: 'default',
          // },
        },
        ios: {
          critical: true,
          criticalVolume: 1,
        },
      },
      {
        type: TriggerType.TIMESTAMP,
        timestamp: timeStart.getTime(),
        repeatFrequency: RepeatFrequency.DAILY,
        alarmManager: {
          allowWhileIdle: true,
        },
      },
    );
  }

  React.useEffect(() => {
    init();
    onDisplayNotification1805();
    onDisplayNotification0750();
    if(Platform.OS === 'android') SplashScreen.hide();
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
