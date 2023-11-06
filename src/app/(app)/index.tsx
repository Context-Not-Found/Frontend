import { useScrollProps } from "@bacons/expo-router-top-tabs";
import { useEffect } from "react";
import { Animated } from "react-native";
import { Paragraph } from "tamagui";

import { MyStack } from "../../components";
import { useChatStore } from "../../store";

const Shield = () => {
  const props = useScrollProps();

  const { fetchMessages } = useChatStore();

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <Animated.ScrollView {...props}>
      <MyStack>
        <Paragraph>Shield</Paragraph>
      </MyStack>
    </Animated.ScrollView>
  );
};

export default Shield;
