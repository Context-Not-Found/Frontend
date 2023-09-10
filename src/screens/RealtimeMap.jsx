import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';

const RealtimeMap = () => {
  const { goBack } = useNavigation();

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => goBack()} />
        <Appbar.Content title="RealTime Map" />
      </Appbar.Header>
      <Text>RealtimeMap</Text>
    </View>
  );
};

export default RealtimeMap;
