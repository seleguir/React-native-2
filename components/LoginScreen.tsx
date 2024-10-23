import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const LoginScreen = () => {
  const [username, setUsername] = useState<string>(''); 
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Manejo del login 
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost/api/login', { 
        username, 
        email,
        password,
      });

      if (response.data.success) {
        Alert.alert('Éxito', 'Inicio de sesión exitoso');
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un problema al iniciar sesión');
    }
  };

  // Manejo del inicio de sesión con Google
  const handleGoogleSuccess = (response: any) => {
    console.log('Google Login Success:', response);
    Alert.alert('Éxito', 'Inicio de sesión con Google exitoso');
  };
    
   function handleGoogleError(): void {
    console.log('Google Login Failed:');
    Alert.alert('Error', 'Inicio de sesión con Google fallido');
  };


  // Campos de usuario, email y password: 
  return (
    <GoogleOAuthProvider clientId="638579218713-i6spaqc3lkd6ggo7oel2s6k92anfshh7.apps.googleusercontent.com">
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de Usuario"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          width="250"
        />
      </View>
    </GoogleOAuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: 250,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: 250,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LoginScreen;