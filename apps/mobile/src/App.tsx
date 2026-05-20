import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import { store } from '../redux/store';
import HomeStackNavigator from './navigation/HomeStackNavigator';

export default function MobileApp() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <HomeStackNavigator />
      </NavigationContainer>
      <StatusBar style="dark" />
    </Provider>
  );
}
