import { Map, MessageCircle, ShieldAlert } from "@tamagui/lucide-icons";
import { Redirect, Tabs } from "expo-router";

import { useUserStore } from "../../store/User";

export default function TabLayout() {
  const { user } = useUserStore();
  if (!user) return <Redirect href="/authentication" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "$backgroundStrong"
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Shield",
          tabBarIcon: () => <ShieldAlert />
        }}
      />
      <Tabs.Screen
        name="Chat"
        options={{
          title: "Chat",
          tabBarIcon: () => <MessageCircle />
        }}
      />
      <Tabs.Screen
        name="Heatmap"
        options={{
          title: "Heatmap",
          headerShown: false,
          tabBarIcon: () => <Map />
        }}
      />
    </Tabs>
  );
}
