import { StyleSheet, Text, View, TouchableOpacity, Touchable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';



const screen = Dimensions.get('window');

export default function Home() {

  const [location, setLocation] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getUsername = async () => {
      const username = await SecureStore.getItemAsync('username');
      setUsername(username);
    };
    getUsername();
  }, []);


  const getCurrentLocation = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync();
      setLocation(coords);
      console.log(coords)
    } catch (error) {
      console.log('Error getting current location', error);
    }
  };



  const sendPushNotification = async (title, text, loc) => {
    const url = 'https://app.nativenotify.com/api/notification';
    const body = {
      appId: 8184,
      appToken: '4UJR6FbtdJIDT60Z22jhEO',
      title: title,
      body: text,
      dateSent: Date.now(),
      pushData: '{ "maps": "' + loc.longitude + " " + loc.latitude + '" }'
      // bigPictureURL: 'Big picture URL as a string',
    };

    try {
      const response = await axios.post(url, body);
      console.log('Push notification sent successfully!', response.data);
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  };

  async function handleEmergency(title, body) {
    await getCurrentLocation();
    if (location) {
      await sendPushNotification(title, body, location);
    } else{
      console.log('No location found')
    }
  }


  return (
    <View style={{ justifyContent: 'center', display: 'flex' }}>
      <View style={{ position: 'absolute', top: screen.height * 0.1, width: screen.width, justifyContent: 'center' }}>
        <Image source={require('../assets/prometheuslogo.png')} style={{ width: 70, height: 70, position: 'absolute', right: screen.width * 0.09 }} />

        <Text style={{ fontSize: 22, paddingLeft: screen.width * 0.09 }}>Hey, {username}</Text>
        <View style={{ alignItems: 'center' }}>

          <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, top: screen.height * 0.05, width: screen.width * 0.9 }} />
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>


        <TouchableOpacity style={{ display: 'flex', alignItems: 'center', position: 'absolute', top: screen.height * 0.35 }} onPress={() => handleEmergency('⚠️EMERGENCY⚠️', username + 'is experiencing an emergency in this location.')}>
          <FontAwesome name="warning" size={150} color="darkred" />
          <Text style={{ fontSize: 22 }}>Emergency Button</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ display: 'flex', alignItems: 'center', position: 'absolute', top: screen.height * 0.7 }}>
          <FontAwesome5 name="car" size={80} color="black" />
          <Text style={{ fontSize: 22 }}>Car Emergency</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})