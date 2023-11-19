import { FC } from "react";
import { Spinner, YStack } from "tamagui";

const Loader: FC = () => {
  return (
    <YStack f={1} ai="center" jc="center">
      <Spinner size="large" />
    </YStack>
  );
};

export default Loader;
