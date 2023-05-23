import registerNNPushToken, { getPushDataObject } from 'native-notify';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Login from './screens/Login';
import * as Location from 'expo-location';
import { Linking } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';

const Stack = createStackNavigator();

export default function App() {

  const [initialRouteName, setInitialRouteName] = useState('Login');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Request permission to send push notifications
    Notifications.requestPermissionsAsync()
      .then(statusObj => {
        console.log('Permission status:', statusObj);

        // Generate a push notification token
        return Notifications.getExpoPushTokenAsync();
      })
      .then(token => {
        console.log('Push notification token:', token);
      })
      .catch(err => console.error('Error getting permissions/token:', err));
  }, []);

  registerNNPushToken(8184, '4UJR6FbtdJIDT60Z22jhEO');
  let pushDataObject = getPushDataObject();

  useEffect(() => {
    console.log(pushDataObject);
    if (pushDataObject && pushDataObject.maps) {
      const [longitude, latitude] = pushDataObject.maps.split(' ');
      console.log(longitude, latitude);
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      Linking.openURL(mapsUrl).catch((error) =>
        console.error('Failed to open Google Maps:', error)
      );
    }
  }, [pushDataObject]);

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
  };

  useEffect(() => {
    getLocationPermission();
    const getUsername = async () => {
      const username = await SecureStore.getItemAsync('username');
      console.log(username);
      if (username) {
        setInitialRouteName('Home')
      }
      console.log(username);
      setLoading(false);
    };
    getUsername();
  }, []);

  if(loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    )
  }


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName= {initialRouteName}
        screenOptions={
          { headerShown: false }
        }>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
