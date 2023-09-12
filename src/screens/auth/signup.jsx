import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { useAuth } from '../../context/AuthProvider';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [error, setError] = useState('');

  const { navigate } = useNavigation();
  const { signUp } = useAuth();

  const handleSignup = async () => {
    if (!email || !password || !phoneNumber || !name) {
      setError('Please fill in the details.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    await signUp({ email, password, name, phoneNumber });
    setError('');
  };

  return (
    <View style={styles.container}>
      <Text variant="displaySmall" style={styles.title}>
        Register New User
      </Text>
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
            icon={secureTextEntry ? 'eye-off' : 'eye'}
            onPress={() => setSecureTextEntry(!secureTextEntry)}
            forceTextInputFocus={false}
          />
        }
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        style={styles.input}
        mode="outlined"
        secureTextEntry={secureTextEntry}
        right={
          <TextInput.Icon
            icon={secureTextEntry ? 'eye-off' : 'eye'}
            onPress={() => setSecureTextEntry(!secureTextEntry)}
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
      <HelperText visible={error} type="error" style={styles.helperTxt}>
        {error}
      </HelperText>
      <Button mode="contained" onPress={handleSignup} style={styles.button}>
        Sign Up
      </Button>

      <Button mode="text" onPress={() => navigate('Login')}>
        Already have an account? Login here
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', marginHorizontal: 20 },
  title: { textAlign: 'center', marginBottom: 20, fontWeight: '700' },
  input: { marginBottom: 20 },
  button: { paddingVertical: 5 },
  btnContent: { fontSize: 18 },
  helperTxt: { textAlign: 'center', fontSize: 15 }
});

export default Signup;
