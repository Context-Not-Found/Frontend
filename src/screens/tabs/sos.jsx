import React from 'react';
import { Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';

const SOS = () => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="SOS" />
      </Appbar.Header>
      <Text>SOS</Text>
    </View>
  );
};

export default SOS;
