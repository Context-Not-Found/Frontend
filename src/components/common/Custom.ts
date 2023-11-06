import { SafeAreaView } from "react-native-safe-area-context";
import { YStack, styled } from "tamagui";

export const MySafeAreaView = styled(SafeAreaView, {
  name: "MySafeAreaView",
  flex: 1,
  backgroundColor: "$background"
});

export const MyStack = styled(YStack, {
  name: "MyStack",
  backgroundColor: "$backgroundStrong",
  flex: 1,
  padding: "$4",
  space: "$true"
});
