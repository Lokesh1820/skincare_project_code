import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
  
    fetch('http://10.12.117.19:8080/PHP/register.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      // If registration is successful, navigate to the Home screen
      navigation.navigate('Home');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  

  const handleAlreadyHaveAccountClick = () => {
    // Navigate back to the LoginScreen when "Already have an account? Login" is clicked
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.welcomeText}>Welcome To Skincare+</Text>
      <Text style={styles.descriptionText}>Please Register from here</Text>
      <Text style={styles.inputLabel}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setUsername(text)}
      />
      <Text style={styles.inputLabel1}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <Text style={styles.inputLabel1}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.existingUser} onPress={handleAlreadyHaveAccountClick}>
        <Text>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
    marginVertical: -80,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 8,
    marginRight: 80,
    color: 'darkslateblue',
    fontWeight: 'bold',
    marginTop: 30,
  },
  descriptionText: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 16,
    marginRight: 140,
  },
  inputLabel: {
    marginBottom: 4,
    marginRight: 265,
    marginTop: 40,
  },
  inputLabel1: {
    marginBottom: 4,
    marginRight: 265,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '90%',
    justifyContent: 'center', // Align text vertically
    borderRadius: 5,
  },
  registerButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 4,
    width: '90%',
    alignItems: 'center',
    marginBottom: 15,
  },
  registerButtonText: {
    color: '#fff',
  },
  existingUser: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 4,
    width: '90%',
    backgroundColor: '#90ee90',
  },
});

export default RegisterScreen;