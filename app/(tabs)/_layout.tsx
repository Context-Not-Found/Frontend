import { Map, MessageCircle, ShieldAlert } from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
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
