import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Live = () => {
  const topLeft = { latitude: 28.799824849803834, longitude: 77.5366675332206 };
  const bottomRight = { latitude: 28.79478538122577, longitude: 77.54283661378919 };

  const region = {
    latitude: (topLeft.latitude + bottomRight.latitude) / 2,
    longitude: (topLeft.longitude + bottomRight.longitude) / 2,
    latitudeDelta: Math.abs(topLeft.latitude - bottomRight.latitude),
    longitudeDelta: Math.abs(topLeft.longitude - bottomRight.longitude)
  };

  return (
    <View>
      <MapView style={styles.map} region={region} mapType="satellite">
        <Marker coordinate={topLeft} title="Top Left" />
        <Marker coordinate={bottomRight} title="Bottom Right" />
      </MapView>
    </View>
  );
};

export default Live;
