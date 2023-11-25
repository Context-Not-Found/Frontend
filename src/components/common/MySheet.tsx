import React, { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { Sheet } from "tamagui";

interface SheetProps {
  open: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const MySheet: FC<SheetProps> = ({ open, setOpen, children }) => {
  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
      snapPointsMode="fit"
      animation="bouncy"
      moveOnKeyboardChange
      unmountChildrenWhenHidden
      disableDrag
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame p="$5">{children}</Sheet.Frame>
    </Sheet>
  );
};

export default MySheet;
