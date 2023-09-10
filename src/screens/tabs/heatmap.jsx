import React from 'react';
import { View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';

const Heatmap = () => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="HeatMap" />
      </Appbar.Header>
      <Text>Heatmap</Text>
    </View>
  );
};

export default Heatmap;
