import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { useUserStore } from '../../store';

const Signup = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    phone_number: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const regex = {
    email: /^[a-zA-Z]{2}\d{4}$/,
    phone: /^[0-9]{10}$/
  };

  const { error, setError, signUpUser, isLoading, setLoading } = useUserStore();

  const { navigate } = useNavigation();

  const handleSignup = async () => {
    if (!userData.email || !userData.password || !userData.phone_number || !userData.name) {
      setError('Please fill in all the details.');
      return;
    }

    if (!regex.email.test(userData.email)) {
      setError('Invalid email format, please use your official ID.');
      return;
    }

    if (!regex.phone.test(userData.phone_number)) {
      setError('Invalid phone number format (10 digits).');
      return;
    }

    if (userData.password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (userData.password.length < 8) {
      setError('Password should be at least 8 characters.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await signUpUser({ ...userData, email: userData.email.toLowerCase() + '@srmist.edu.in' });
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
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              forceTextInputFocus={false}
            />
          }
        />
        <HelperText type="info">Password should be at least 8 characters.</HelperText>
      </View>

      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        mode="outlined"
      />
      <View>
        <TextInput
          label="Phone Number"
          value={userData.phone_number}
          onChangeText={(phone_number) => setUserData({ ...userData, phone_number })}
          mode="outlined"
          keyboardType="numeric"
        />
        <HelperText type="info">Phone Number should be of 10 Digits.</HelperText>
      </View>
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
