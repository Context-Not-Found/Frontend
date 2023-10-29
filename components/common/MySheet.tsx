import React, { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { Sheet, YStack } from "tamagui";

interface SheetProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const MySheet: FC<SheetProps> = ({ open, setOpen, children }) => {
  return (
    <Sheet
      snapPointsMode="mixed"
      open={open}
      onOpenChange={setOpen}
      animation="bouncy"
      moveOnKeyboardChange
      unmountChildrenWhenHidden={true}
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame>
        <YStack p="$5">{children}</YStack>
      </Sheet.Frame>
    </Sheet>
  );
};

export default MySheet;
