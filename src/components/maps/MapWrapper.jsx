import MapView from 'react-native-maps';

const MapWrapper = ({ children }) => {
  const topLeft = { latitude: 28.799824849803834, longitude: 77.5366675332206 };
  const bottomRight = { latitude: 28.79478538122577, longitude: 77.54283661378919 };

  const region = {
    latitude: (topLeft.latitude + bottomRight.latitude) / 2,
    longitude: (topLeft.longitude + bottomRight.longitude) / 2,
    latitudeDelta: Math.abs(topLeft.latitude - bottomRight.latitude),
    longitudeDelta: Math.abs(topLeft.longitude - bottomRight.longitude)
  };

  return (
    <MapView
      style={{
        height: '100%',
        width: '100%'
      }}
      region={region}
      mapType="satellite"
    >
      {children}
    </MapView>
  );
};

export default MapWrapper;
