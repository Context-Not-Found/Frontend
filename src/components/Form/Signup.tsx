import { LmAlert, LmButton } from "@tamagui-extras/core";
import { LmFormRhfProvider, LmInputRhf } from "@tamagui-extras/form";
import { ChevronLeft } from "@tamagui/lucide-icons";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { Dispatch, FC, SetStateAction } from "react";
import { Button, Form, H2, XStack, YStack } from "tamagui";

import { useUser } from "@/hooks/useUser";
import { User } from "@/types";
import { signUp } from "@/utils/signUpUser";

import MySheet from "../common/MySheet";

interface SignUpProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SignUp: FC<SignUpProps> = ({ open, setOpen }) => {
  const { updateUser } = useUser();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: signUp,
    onSuccess: (user) => {
      // Add User to State and replace route
      updateUser(user);
      router.replace("/");
    }
  });

  return (
    <MySheet open={open} setOpen={setOpen}>
      <XStack space="$6">
        <Button icon={ChevronLeft} onPress={() => setOpen(false)} />
        <H2 fontWeight="bold">Sign Up</H2>
      </XStack>
      <LmFormRhfProvider
        mode="onTouched"
        defaultValues={{
          name: "",
          email: "",
          password: "",
          cfg_password: "",
          phone_number: ""
        }}
      >
        {({ control, handleSubmit }) => (
          <Form
            onSubmit={handleSubmit((data) => {
              mutate(data);
            })}
          >
            <YStack space>
              <LmInputRhf
                required
                label="Name"
                name="name"
                control={control}
                textContentType="name"
                helperTextProps={{ fontSize: "$2" }}
                placeholder="John Doe"
              />
              <LmInputRhf
                required
                label="Email"
                name="email"
                control={control}
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
                control={control}
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
                control={control}
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
                control={control}
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
              {isError && (
                <LmAlert
                  severity="error"
                  text={error.message}
                  animation="lazy"
                />
              )}
              <Form.Trigger asChild>
                <LmButton loading={isPending}>Sign Up</LmButton>
              </Form.Trigger>
            </YStack>
          </Form>
        )}
      </LmFormRhfProvider>
    </MySheet>
  );
};

export default SignUp;
