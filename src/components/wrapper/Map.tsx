import { FC, ReactNode } from "react";
import MapView, { LatLng } from "react-native-maps";

interface MapsProps {
  children: ReactNode;
  zoom?: boolean;
}
const MapWrapper: FC<MapsProps> = ({ children, zoom = true }) => {
  // Define Coordinate of College
  const topLeft: LatLng = {
    latitude: 28.799824849803834,
    longitude: 77.5366675332206
  };
  const bottomRight: LatLng = {
    latitude: 28.79478538122577,
    longitude: 77.54283661378919
  };

  // Calculate the region based on these coordinates
  const region = {
    latitude: (topLeft.latitude + bottomRight.latitude) / 2,
    longitude: (topLeft.longitude + bottomRight.longitude) / 2,
    latitudeDelta: Math.abs(topLeft.latitude - bottomRight.latitude),
    longitudeDelta: Math.abs(topLeft.longitude - bottomRight.longitude)
  };

  return (
    <MapView
      provider="google"
      mapType="satellite"
      region={region}
      pitchEnabled={false}
      moveOnMarkerPress={false}
      zoomEnabled={zoom}
      style={{ height: "100%", width: "100%" }}
    >
      {children}
    </MapView>
  );
};

export default MapWrapper;
