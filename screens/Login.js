import { StyleSheet, Text, View, TextInput, Pressable, Image, ImageBackground, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import logo from '../assets/prometheuslogo.png'
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

export default function Login() {

    const navigation = useNavigation();
    const [username, setUsername] = useState('');

    const handleLogin = async () => {
        console.log('pressed login')
        await SecureStore.setItemAsync('username', username);

        navigation.navigate('Home')

    }

    return (
        <>

            <StatusBar translucent backgroundColor="black" />
            <View style={styles.container}>

                <Image source={logo} style={{ width: 200, height: 200, alignSelf: 'center', marginBottom: 30, }} />
                <View style={{ marginBottom: 70, alignItems: 'center' }}>
                    <TextInput style={styles.textinput} placeholder='Username' onChangeText={setUsername} />
                    <Pressable style={styles.button} title='Login' onPress={handleLogin} disabled={!username}>
                        <Text style={{ color: 'white' }}>Login</Text>
                    </Pressable>
                </View>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center',

    },
    textinput: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        padding: 7,
        marginBottom: 10,
        borderRadius: 15,
        width: 300,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: 'black',
        width: 150,
        marginTop: 50,
    }

})