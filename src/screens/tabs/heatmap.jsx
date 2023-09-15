import { View } from 'react-native';
import { Circle } from 'react-native-maps';
import { Appbar } from 'react-native-paper';
import { MapWrapper } from '../../components';
import { useHeatmapStore } from '../../store';

const Heatmap = () => {
  const { heatMap, getColorByRadius } = useHeatmapStore();

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="HeatMap" />
      </Appbar.Header>
      <MapWrapper>
        {heatMap.map(({ center, radius }, i) => (
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
