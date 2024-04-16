import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    fetch('http://10.12.117.19:8080/PHP/login.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        if (data === "Login successful") {
          // If login is successful, navigate to the Home screen
          navigation.navigate('Home');
        } else {
          // If login fails, display an error message
          alert('Invalid email or password');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleNewUserClick = () => {
    // Navigate to the RegisterScreen when "New User?" is clicked
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginHeading}>Login</Text>
      <Text style={styles.welcomeText}>Hello, welcome back</Text>
      <Text style={styles.descriptionText}>Happy to see you again, please login here</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.newUser} onPress={handleNewUserClick}>
        <Text>New User?</Text>
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
  loginHeading: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
    marginVertical: -80,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 8,
    marginRight:95 ,
    color: 'darkslateblue',
    fontWeight: 'bold',
    marginVertical: 30,
  },
  descriptionText: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 16,
    marginRight: 25,
  },
  inputContainer: {
    marginBottom: 16,
    width: '90%',
  },
  inputLabel: {
    marginBottom: 4,
    marginVertical: 30
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    width: '100%',
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 4,
    width: '90%',
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#fff',
  },
  forgotPassword: {
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  newUser: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 4,
    width: '90%',
    backgroundColor: '#90ee90',
  },
});

export default LoginScreen;
