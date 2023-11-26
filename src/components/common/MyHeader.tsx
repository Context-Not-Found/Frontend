import { ChevronLeft } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { FC } from "react";
import { Button, H2, XGroup, XStack } from "tamagui";

import PopupMenu, { PopupMenuItem } from "./PopupMenu";

const MyHeader: FC<HeaderProps> = ({ title, popupMenu }) => {
  return (
    <XStack
      p="$4"
      bg="$background"
      jc="space-between"
      ai="center"
      elevation="$5"
    >
      <XGroup gap="$4">
        <Button scaleIcon={1.5} icon={ChevronLeft} onPress={router.back} />
        <H2 fontWeight="bold">{title}</H2>
      </XGroup>

      {popupMenu && popupMenu.length > 0 && (
        <PopupMenu popupMenuItem={popupMenu} />
      )}
    </XStack>
  );
};
export default MyHeader;

// Types
interface HeaderProps {
  title: string;
  popupMenu?: PopupMenuItem[];
}
