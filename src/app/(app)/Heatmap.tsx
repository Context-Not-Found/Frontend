import { useScrollProps } from "@bacons/expo-router-top-tabs";
import { Animated } from "react-native";
import { Paragraph } from "tamagui";

import { MyStack } from "../../components";

const Heatmap = () => {
  const props = useScrollProps();

  return (
    <Animated.ScrollView {...props}>
      <MyStack>
        <Paragraph>Heatmap</Paragraph>
      </MyStack>
    </Animated.ScrollView>
  );
};

export default Heatmap;
