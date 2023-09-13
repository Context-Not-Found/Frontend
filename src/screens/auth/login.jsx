import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { useUserStore } from '../../store';

const Login = () => {
  const { navigate } = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [userData, setUserData] = useState({ email: null, password: null });
  const { error, setError, loginUser, setLoading, isLoading } = useUserStore();

  const handleLogin = async () => {
    if (!userData.email || !userData.password) {
      setError('Please fill in the details.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await loginUser(userData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="displaySmall" style={styles.title}>
        Welcome to the App
      </Text>
      <TextInput
        label="Email"
        value={userData.email}
        onChangeText={(email) => setUserData({ ...userData, email })}
        mode="outlined"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        value={userData.password}
        onChangeText={(password) => setUserData({ ...userData, password })}
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
        loading={isLoading}
        labelStyle={styles.btnContent}
        onPress={handleLogin}
        style={styles.button}
      >
        {isLoading ? '' : 'Login'}
      </Button>
      <Button mode="text" onPress={() => navigate('SignUp')}>
        Dont have an account? Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', marginHorizontal: 20, gap: 10 },
  title: { textAlign: 'center', marginBottom: 20, fontWeight: '700' },
  button: { paddingVertical: 5 },
  btnContent: { fontSize: 18 },
  helperTxt: { textAlign: 'center', fontSize: 15 }
});

export default Login;
