import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignup = () => {
    console.log(`${name} ${email} ${password} ${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Signup</Title>
      <TextInput
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        mode="outlined"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        mode="outlined"
        secureTextEntry={secureTextEntry}
        right={
          <TextInput.Icon
            name={secureTextEntry ? 'eye-off' : 'eye'}
            onPress={toggleSecureEntry}
            forceTextInputFocus={false}
          />
        }
      />
      <TextInput
        label="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
      />
      <Button mode="contained" onPress={handleSignup} style={styles.button}>
        Signup
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  title: { textAlign: 'center', marginBottom: 20 },
  input: { marginBottom: 20 },
  button: {
    marginTop: 10
  }
});

export default Signup;
