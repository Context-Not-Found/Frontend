import { H1, Paragraph, YStack } from "tamagui";

import { MyStack } from "../components/MyStack";

export default function Home() {
  return (
    <MyStack>
      <YStack space="$4" maxWidth={600}>
        <H1 textAlign="center">Welcome to Tamagui.</H1>
        <Paragraph textAlign="center">
          Here&apos;s a basic starter to show navigating from one screen to
          another.
        </Paragraph>
      </YStack>
    </MyStack>
  );
}
