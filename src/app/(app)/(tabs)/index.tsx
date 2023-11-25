import { ShieldAlert, ShieldClose } from "@tamagui/lucide-icons";
import { Button, H6, Spacer } from "tamagui";

import { MyStack } from "../../../components";
import useSOS from "../../../hooks/useSos";

const Shield = () => {
  return (
    <MyStack ai="center" jc="center">
      <SOS />
      <Spacer />
      <H6>Long press for SOS</H6>
    </MyStack>
  );
};

export default Shield;

// SOS btn
function SOS() {
  const { handleSosBtn, isSosOn } = useSOS();
  return (
    <Button
      size={"$16"}
      onLongPress={handleSosBtn}
      pressStyle={{ scale: 1.25 }}
      icon={isSosOn ? ShieldClose : ShieldAlert}
      animation="bouncy"
      circular
    />
  );
}
