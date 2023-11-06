import { LmAlert } from "@tamagui-extras/core";
import {
  LmFormRhfProvider,
  LmInputRhf,
  LmSubmitButtonRhf
} from "@tamagui-extras/form";
import { ChevronLeft } from "@tamagui/lucide-icons";
import React, { Dispatch, FC, SetStateAction } from "react";
import { Button, H2, XStack, YStack } from "tamagui";

import { useUserStore } from "../../store";
import MySheet from "../common/MySheet";

interface LoginProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const LogIn: FC<LoginProps> = ({ open, setOpen }) => {
  const { error, isLoading, login } = useUserStore();

  return (
    <MySheet open={open} setOpen={setOpen}>
      <XStack space="$6" marginBottom="$4">
        <Button icon={ChevronLeft} onPress={() => setOpen(false)} />
        <H2 fontWeight="bold">Log In</H2>
      </XStack>
      <LmFormRhfProvider mode="onTouched">
        <YStack space="$4">
          <LmInputRhf
            required
            label="Email"
            name="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            placeholder="ab1234@srmist.edu.in"
            helperTextProps={{ fontSize: "$2" }}
            rules={{
              pattern: {
                value: /^[a-zA-Z]{2}\d{4}@srmist\.edu\.in$/,
                message: "Please use your official email"
              }
            }}
          />
          <LmInputRhf
            required
            label="Password"
            name="password"
            textContentType="password"
            placeholder="Abcd@123"
            helperTextProps={{ fontSize: "$2" }}
            isPassword
            rules={{
              minLength: {
                value: 8,
                message: "Password should be at least 8 characters."
              }
            }}
          />
          {error && <LmAlert severity="error" text={error} animation="lazy" />}
          <LmSubmitButtonRhf loading={isLoading} onSubmit={login}>
            Log In
          </LmSubmitButtonRhf>
        </YStack>
      </LmFormRhfProvider>
    </MySheet>
  );
};

export default LogIn;
