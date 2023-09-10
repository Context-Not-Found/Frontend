import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { useAuth } from '../../context/AuthProvider';

const Login = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { navigate } = useNavigation();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in the details.');
      return;
    }
    await login({ email, password });
    setError('');
  };

  return (
    <View style={styles.container}>
      <Text variant="displaySmall" style={styles.title}>
        Welcome to the App
      </Text>
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
            forceTextInputFocus={false}
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          />
        }
      />
      <HelperText visible={error} type="error" style={styles.helperTxt}>
        {error}
      </HelperText>
      <Button
        mode="contained"
        labelStyle={styles.btnContent}
        onPress={handleLogin}
        style={styles.button}
      >
        Login
      </Button>

      <Button mode="text" onPress={() => navigate('SignUp')}>
        New Student? Register
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', marginHorizontal: 20 },
  title: { textAlign: 'center', marginBottom: 20, fontWeight: '700' },
  input: { marginBottom: 20 },
  button: {
    marginTop: 10,
    paddingVertical: 5
  },
  btnContent: {
    fontSize: 18
  },
  helperTxt: { textAlign: 'center', fontSize: 15 }
});

export default Login;
