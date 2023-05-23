import { StyleSheet, Text, View, TouchableOpacity, Touchable, Image } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const screen = Dimensions.get('window');

export default function Home() {
  return (
    <View style={{ justifyContent: 'center', display: 'flex' }}>
      <View style={{ position: 'absolute', top: screen.height * 0.1, width: screen.width, justifyContent: 'center' }}>
        <Image source={require('../assets/prometheuslogo.png')} style={{ width: 70, height: 70, position: 'absolute', right: screen.width * 0.09 }} />

        <Text style={{ fontSize: 22, paddingLeft: screen.width * 0.09 }}>Hey, (username)</Text>
        <View style={{ alignItems: 'center' }}>

          <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, top: screen.height * 0.05, width: screen.width * 0.9 }} />
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>


        <TouchableOpacity style={{ display: 'flex', alignItems: 'center', position: 'absolute', top: screen.height * 0.35 }}>
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