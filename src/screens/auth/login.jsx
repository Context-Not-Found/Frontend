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

  const emailRegex = /^[a-zA-Z]{2}\d{4}$/;

  const handleLogin = async () => {
    if (!userData.email || !userData.password) {
      setError('Please fill in the details.');
      return;
    }
    if (!emailRegex.test(userData.email)) {
      setError('Invalid email, Please use your official email id');
      return;
    }

    if (userData.password.length < 8) {
      setError('Password should be at least 8 characters.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await loginUser({ ...userData, email: userData.email.toLowerCase() + '@srmist.edu.in' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="displaySmall" style={styles.title}>
        Welcome to the App
      </Text>
      <View>
        <TextInput
          label="Email"
          value={userData.email}
          onChangeText={(email) => setUserData({ ...userData, email })}
          mode="outlined"
          right={<TextInput.Affix text="@srmist.edu.in" />}
          keyboardType="email-address"
        />
        <HelperText type="info">
          Please use your official ID {"'"}eg: ab1234{"'"} (without @srmist.edu.in)
        </HelperText>
      </View>
      <View>
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
        <HelperText type="info">Password should be at least 8 characters.</HelperText>
      </View>

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
