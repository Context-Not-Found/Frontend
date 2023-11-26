import { LmAlert } from "@tamagui-extras/core";
import {
  LmFormRhfProvider,
  LmInputRhf,
  LmSubmitButtonRhf
} from "@tamagui-extras/form";
import { ChevronLeft } from "@tamagui/lucide-icons";
import React, { Dispatch, FC, SetStateAction } from "react";
import { Button, H2, XStack, YStack } from "tamagui";

import { useUserStore } from "@/store";
import { User } from "@/types";

import MySheet from "../common/MySheet";

interface SignUpProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SignUp: FC<SignUpProps> = ({ open, setOpen }) => {
  const { error, isLoading, signUp } = useUserStore();

  return (
    <MySheet open={open} setOpen={setOpen}>
      <XStack space="$6">
        <Button icon={ChevronLeft} onPress={() => setOpen(false)} />
        <H2 fontWeight="bold">Sign Up</H2>
      </XStack>
      <LmFormRhfProvider mode="onTouched">
        <YStack space>
          <LmInputRhf
            required
            label="Name"
            name="name"
            textContentType="name"
            helperTextProps={{ fontSize: "$2" }}
            placeholder="John Doe"
          />
          <LmInputRhf
            required
            label="Email"
            name="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            helperTextProps={{ fontSize: "$2" }}
            placeholder="ab1234@srmist.edu.in"
            rules={{
              pattern: {
                value: /^[a-zA-Z]{2}\d{4}@srmist\.edu\.in$/,
                message: "Please use your official email"
              }
            }}
          />
          <LmInputRhf
            required
            isPassword
            label="Password"
            name="password"
            textContentType="password"
            helperTextProps={{ fontSize: "$2" }}
            placeholder="Abcd@123"
            rules={{
              minLength: {
                value: 8,
                message: "Password should be at least 8 characters."
              }
            }}
          />
          <LmInputRhf
            required
            isPassword
            label="Confirm Password"
            name="cfg_password"
            textContentType="password"
            helperTextProps={{ fontSize: "$2" }}
            placeholder="Abcd@123"
            rules={{
              validate: {
                matchPass: (value, values: User) =>
                  value === values.password || "Passwords do not match"
              }
            }}
          />
          <LmInputRhf
            required
            label="Phone Number"
            name="phone_number"
            textContentType="telephoneNumber"
            keyboardType="phone-pad"
            helperTextProps={{ fontSize: "$2" }}
            placeholder="9876543210"
            maxLength={10}
            rules={{
              pattern: {
                value: /^[6-9][0-9]{9}$/,
                message: "Please enter a valid mobile number."
              }
            }}
          />
          {error && <LmAlert severity="error" text={error} animation="lazy" />}
          <LmSubmitButtonRhf loading={isLoading} onSubmit={signUp}>
            Sign Up
          </LmSubmitButtonRhf>
        </YStack>
      </LmFormRhfProvider>
    </MySheet>
  );
};

export default SignUp;
