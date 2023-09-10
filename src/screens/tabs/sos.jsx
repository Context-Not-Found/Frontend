import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';

const SOS = () => {
  const { navigate } = useNavigation();

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="SOS" />

        <Appbar.Action
          icon="bell"
          onPress={() => {
            navigate('Notifications');
          }}
        />
      </Appbar.Header>

      <Text>SOS</Text>
    </View>
  );
};

export default SOS;
