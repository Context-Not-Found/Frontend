import { MoreVertical } from "@tamagui/lucide-icons";
import { greenDark, radius } from "@tamagui/themes";
import { FC, useState } from "react";
import { GestureResponderEvent } from "react-native";
import Popover from "react-native-popover-view";
import { Button, ListItem, Separator, YGroup } from "tamagui";

import { IconProp } from "@/types";

export interface PopupMenuItem {
  icon: IconProp | undefined;
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
}

const PopupMenu: FC<{ popupMenuItem: PopupMenuItem[] }> = ({
  popupMenuItem
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover
      isVisible={open}
      backgroundStyle={{ opacity: 0 }}
      popoverStyle={{
        borderWidth: 1,
        borderRadius: radius[4],
        borderColor: greenDark.green10,
        backgroundColor: greenDark.green2
      }}
      arrowSize={{ height: 0, width: 0 }}
      offset={-40}
      onRequestClose={() => setOpen(false)}
      from={
        <Button
          circular
          chromeless
          scaleIcon={1.5}
          icon={MoreVertical}
          onPress={() => setOpen(true)}
        />
      }
    >
      <YGroup
        elevate
        size="$5"
        bg="$background"
        borderColor="$borderColor"
        separator={<Separator />}
      >
        {popupMenuItem.map(({ icon, title, onPress }) => {
          const handleItem = (event: GestureResponderEvent) => {
            onPress!(event);
            setOpen(false);
          };
          return (
            <ListItem
              key={title}
              pressTheme
              icon={icon}
              title={title}
              onPress={handleItem}
            />
          );
        })}
      </YGroup>
    </Popover>
  );
};

export default PopupMenu;
