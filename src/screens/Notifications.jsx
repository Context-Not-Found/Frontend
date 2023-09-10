import React from 'react';
import { Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';

const Notifications = () => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Notifications" />
      </Appbar.Header>
      <Text>Notifications</Text>
    </View>
  );
};

export default Notifications;
