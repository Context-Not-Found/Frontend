import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { TamaguiProvider, Theme } from "tamagui";

import { MySafeAreaView } from "../components/common/Custom";
import config from "../tamagui.config";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
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
    <TamaguiProvider config={config}>
      <Theme name={"dark"}>
        <Theme name={"dark_green"}>
          <MySafeAreaView>
            <Stack screenOptions={{ headerShown: false }} />
          </MySafeAreaView>
        </Theme>
      </Theme>
    </TamaguiProvider>
  );
}
