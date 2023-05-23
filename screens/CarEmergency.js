import React from 'react';
import { View, Modal, TouchableOpacity, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react'
import axios from 'axios';
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';

const CarEmergency = ({ modalVisible, setModalVisible }) => {

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
      Alert.alert('Emergency Sent', 'Your emergency has been sent to your teammates.')
    } else {
      console.log('No location found')
      Alert.alert('Try Again', 'We had trouble accessing your location.')
    }
  }

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, alignItems: 'center' }}>
            <TouchableOpacity onPress={() => handleEmergency('⚠️LOW BATTERY!⚠️', 'Click to open the location.')} style={{alignItems: 'center', paddingBottom: 50}}>
              <Ionicons name="battery-full" size={60} color="black" />
              <Text>Low Battery</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleEmergency('⚠️WE HAVE CRASHED!⚠️', 'Click to open the location.')} style={{alignItems: 'center', paddingBottom: 50}}>
              <Ionicons name="ios-car" size={60} color="black" />
              <Text>Car Accident</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleEmergency('⚠️DRIVER NEEDS HELP!⚠️', 'Click to open the location.')} style={{alignItems: 'center', paddingBottom: 50}}>
              <Ionicons name="md-person" size={60} color="black" />
              <Text>Driver Accident</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{fontSize: 25, fontWeight: 'bold'}}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CarEmergency;
