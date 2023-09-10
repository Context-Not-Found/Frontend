import React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Heat } from '../../components';

const Heatmap = () => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="HeatMap" />
      </Appbar.Header>
      <Heat />
    </View>
  );
};

export default Heatmap;
