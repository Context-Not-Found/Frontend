import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

const Heat = () => {
  const topLeft = { latitude: 28.799824849803834, longitude: 77.5366675332206 };
  const bottomRight = { latitude: 28.79478538122577, longitude: 77.54283661378919 };

  const region = {
    latitude: (topLeft.latitude + bottomRight.latitude) / 2,
    longitude: (topLeft.longitude + bottomRight.longitude) / 2,
    latitudeDelta: Math.abs(topLeft.latitude - bottomRight.latitude),
    longitudeDelta: Math.abs(topLeft.longitude - bottomRight.longitude)
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region} // Set the confined region
        mapType="satellite"
      >
        {/* Add markers or other map elements here */}
        {/* <Marker coordinate={topLeft} title="Top Left" />
        <Marker coordinate={bottomRight} title="Bottom Right" /> */}
      </MapView>
    </View>
  );
};

export default Heat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    width: '94',
    height: '100'
  }
});
