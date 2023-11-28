import { useQuery } from "@tanstack/react-query";
import { Heatmap } from "react-native-maps";
import { H2, H6, Sheet, Text } from "tamagui";

import { MapWrapper, MyStack } from "@/components";
import { fetchAreas } from "@/utils/fetchAreas";

const MyHeatmap = () => {
  const query = useQuery({ queryKey: ["heatMap"], queryFn: fetchAreas });

  return (
    <>
      <>
        <MyStack>
          {query.isError ? (
            <H6>Error... {query.error.message}</H6>
          ) : query.isLoading ? (
            <H6>Loading HeatMap...</H6>
          ) : (
            <MapWrapper>
              {query.data?.length! > 0 && (
                <Heatmap points={query.data} radius={50} />
              )}
            </MapWrapper>
          )}
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
    </>
  );
};

export default MyHeatmap;
