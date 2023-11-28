import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { TamaguiProvider, Theme } from "tamagui";

import { MySafeAreaView } from "@/components";
import { UserProvider } from "@/hooks/useUser";
import { asyncStoragePersister, queryClient } from "@/utils/queryClient";

import config from "../../tamagui.config";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf")
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      <TamaguiProvider config={config}>
        <Theme name={"dark"}>
          <Theme name={"dark_green"}>
            <UserProvider>
              <MySafeAreaView>
                <Slot />
              </MySafeAreaView>
            </UserProvider>
          </Theme>
        </Theme>
      </TamaguiProvider>
    </PersistQueryClientProvider>
  );
}
