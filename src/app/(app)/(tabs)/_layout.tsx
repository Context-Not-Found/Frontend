import { Bell, HelpCircle, LogOut, Ticket } from "@tamagui/lucide-icons";
import { greenDark, whiteA } from "@tamagui/themes";
import { router, usePathname } from "expo-router";
import { Button, H3, XGroup, XStack } from "tamagui";

import { PopupMenu, TopTabs } from "@/components";
import { useUserStore } from "@/store";

export default function TabLayout() {
  const pathname = usePathname();

  const { logout } = useUserStore();

  return (
    <>
      {/* Fixed Header For Tabs  */}
      <XStack bg="$background" px="$4" ai="center" jc="space-between">
        <H3 pointerEvents="none">SafeHer</H3>
        <XGroup ai="center">
          {pathname.match("/Chat") && (
            <Button
              mx={"$2"}
              circular
              chromeless
              icon={Ticket}
              scaleIcon={1.4}
              onPress={() => router.push("/Ticket")}
            />
          )}
          <PopupMenu
            popupMenuItem={[
              {
                icon: Bell,
                title: "Notifications",
                onPress: () => router.push("/Notification")
              },
              {
                icon: HelpCircle,
                title: "Help",
                onPress: () => router.push("/Help")
              },
              {
                icon: LogOut,
                title: "LogOut",
                onPress: logout
              }
            ]}
          />
        </XGroup>
      </XStack>
      {/* Tabs */}
      <TopTabs
        screenOptions={{
          animationEnabled: true,
          tabBarStyle: { backgroundColor: greenDark.green2, elevation: 2 },
          tabBarIndicatorStyle: { backgroundColor: greenDark.green10 },
          tabBarActiveTintColor: greenDark.green10,
          tabBarInactiveTintColor: whiteA.whiteA11
        }}
      >
        <TopTabs.Screen name="index" options={{ title: "Shield" }} />
        <TopTabs.Screen name="Chat" options={{ title: "Chat" }} />
        <TopTabs.Screen name="Heatmap" options={{ title: "Heatmap" }} />
      </TopTabs>
    </>
  );
}
