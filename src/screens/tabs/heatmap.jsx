import React from 'react';
import { View } from 'react-native';
import { Circle } from 'react-native-maps';
import { Appbar } from 'react-native-paper';
import { MapWrapper } from '../../components';

const Heatmap = () => {
  const getColorByRadius = (radius) => {
    const colorScale = [
      { radiusMax: 15, color: 'rgba(255,255,0,0.5)' },
      { radiusMax: 30, color: 'rgba(255,128,0,0.5)' },
      { radiusMax: 40, color: 'rgba(255,0,0,0.5)' }
    ];

    const matchingColor = colorScale.find((item) => radius <= item.radiusMax);

    return matchingColor ? matchingColor.color : 'rgba(255,0,0,0.5)';
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="HeatMap" />
      </Appbar.Header>
      <MapWrapper>
        {areas.map(({ center, radius }, i) => (
          <Circle
            key={i}
            center={center}
            radius={radius}
            fillColor={getColorByRadius(radius)}
            strokeColor="#00000000"
          />
        ))}
      </MapWrapper>
    </View>
  );
};

export default Heatmap;

// dummy data for testing
const areas = [
  { center: { latitude: 28.797688, longitude: 77.537946 }, radius: 15 },
  { center: { latitude: 28.796342, longitude: 77.539012 }, radius: 30 },
  { center: { latitude: 28.797675, longitude: 77.538478 }, radius: 20 },
  { center: { latitude: 28.79829, longitude: 77.538997 }, radius: 40 },
  { center: { latitude: 28.79886, longitude: 77.538997 }, radius: 40 }
];
