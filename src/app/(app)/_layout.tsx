import { TopTabs } from "@bacons/expo-router-top-tabs";
import { MoreVertical } from "@tamagui/lucide-icons";
import { greenDark, whiteA } from "@tamagui/themes";
import { Redirect } from "expo-router";
import { Button, H3, XStack } from "tamagui";

import { useUserStore } from "../../store";

export default function TabLayout() {
  const { user } = useUserStore();
  if (!user) return <Redirect href="/auth" />;

  return (
    <TopTabs
      screenOptions={{
        animationEnabled: true,
        tabBarStyle: { backgroundColor: greenDark.green2 },
        tabBarIndicatorStyle: { backgroundColor: greenDark.green10 },
        tabBarActiveTintColor: greenDark.green10,
        tabBarInactiveTintColor: whiteA.whiteA11
      }}
    >
      <TopTabs.Header>
        <XStack bg="$background" px="$4" ai="center" jc="space-between">
          <H3 pointerEvents="none">SafeHer</H3>
          <Button p="$-0.5" icon={<MoreVertical size="$1" />} chromeless />
        </XStack>
      </TopTabs.Header>
      <TopTabs.Screen name="index" options={{ title: "Shield" }} />
      <TopTabs.Screen name="Chat" options={{ title: "Chat" }} />
      <TopTabs.Screen name="Heatmap" options={{ title: "Heatmap" }} />
    </TopTabs>
  );
}
