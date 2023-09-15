import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Circle } from 'react-native-maps';
import { Appbar } from 'react-native-paper';
import { MapWrapper } from '../../components';
import axios from 'axios';

const Heatmap = () => {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    // Replace with your URL
    const url = 'https://womenprotection.onrender.com/areas';

    axios.get(url)
      .then(response => {
        // Set the state using the "markers" key from the response data
        setAreas(response.data.markers);
        // console.log(response.data)
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
