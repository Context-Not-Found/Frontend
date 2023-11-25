import { Heatmap } from "react-native-maps";
import { H2, Sheet, Text } from "tamagui";

import { MapWrapper, MyStack } from "../../../components";
import { useHeatmapStore } from "../../../store";

const MyHeatmap = () => {
  const { heatMap } = useHeatmapStore();

  return (
    <>
      <MyStack>
        <MapWrapper>
          {heatMap?.length > 0 && <Heatmap points={heatMap} radius={50} />}
        </MapWrapper>
      </MyStack>
      <Sheet
        open
        snapPointsMode="mixed"
        snapPoints={["fit", 100]}
        animation="bouncy"
      >
        <Sheet.Handle />
        <Sheet.Frame p="$3">
          <H2 ta="center">HeatMap</H2>
          <Text>Help</Text>
          <Text>Help</Text>
          <Text>Help</Text>
          <Text>Help</Text>
          <Text>Help</Text>
          <Text>Help</Text>
          <Text>Help</Text>
        </Sheet.Frame>
      </Sheet>
    </>
  );
};

export default MyHeatmap;
