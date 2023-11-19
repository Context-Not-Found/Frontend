import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { YStack, styled } from "tamagui";

// Custom styled SafeArea
const MySafeAreaView = styled(SafeAreaView, {
  name: "MySafeAreaView",
  flex: 1,
  backgroundColor: "$background"
});

// Custom Styled Ystack
const MyStack = styled(YStack, {
  name: "MyStack",
  backgroundColor: "$backgroundStrong",
  flex: 1,
  padding: "$4",
  space: "$true"
});

// Custom Top Navigator Tabs
const { Navigator } = createMaterialTopTabNavigator();

const TopTabs = withLayoutContext(Navigator);

export { MySafeAreaView, MyStack, TopTabs };
