import { Heatmap } from "react-native-maps";
import { Card } from "tamagui";

import { MapWrapper, MyStack } from "../../../components";
import { useHeatmapStore } from "../../../store";

const MyHeatmap = () => {
  const { heatMap } = useHeatmapStore();

  return (
    <MyStack>
      <Card height="70%">
        <MapWrapper>
          {heatMap.length > 0 && <Heatmap points={heatMap} radius={50} />}
        </MapWrapper>
      </Card>
    </MyStack>
  );
};

export default MyHeatmap;
