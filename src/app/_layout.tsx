import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { TamaguiProvider, Theme } from "tamagui";

import config from "../../tamagui.config";
import { MySafeAreaView } from "../components/common/Custom";

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
    <TamaguiProvider config={config}>
      <Theme name={"dark"}>
        <Theme name={"dark_green"}>
          <MySafeAreaView>
            <Slot />
          </MySafeAreaView>
        </Theme>
      </Theme>
    </TamaguiProvider>
  );
}
