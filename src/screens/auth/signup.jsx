import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { useUserStore } from '../../store';

const Signup = () => {
  const [userData, setUserData] = useState({
    name: null,
    email: null,
    password: null,
    phone_number: null
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const { error, setError, signUpUser, isLoading, setLoading } = useUserStore();

  const { navigate } = useNavigation();

  const handleSignup = async () => {
    if (!userData.email || !userData.password || !userData.phone_number || !userData.name) {
      setError('Please fill in the details.');
      return;
    }

    if (userData.password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await signUpUser(userData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="displaySmall" style={styles.title}>
        Register New User
      </Text>
      <TextInput
        label="Name"
        value={userData.name}
        onChangeText={(name) => setUserData({ ...userData, name })}
        mode="outlined"
      />
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
            onPress={() => setSecureTextEntry(!secureTextEntry)}
            forceTextInputFocus={false}
          />
        }
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        mode="outlined"
      />
      <TextInput
        label="Phone Number"
        value={userData.phone_number}
        onChangeText={(phone_number) => setUserData({ ...userData, phone_number })}
        mode="outlined"
        keyboardType="numeric"
      />
      <HelperText visible={error} type="error" style={styles.helperTxt}>
        {error}
      </HelperText>
      <Button mode="contained" loading={isLoading} onPress={handleSignup} style={styles.button}>
        {isLoading ? '' : 'Sign Up'}
      </Button>

      <Button mode="text" onPress={() => navigate('Login')}>
        Already have an account? Login here
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

export default Signup;
