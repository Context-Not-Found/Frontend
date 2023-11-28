import { LmAlert, LmButton } from "@tamagui-extras/core";
import { LmFormRhfProvider, LmInputRhf } from "@tamagui-extras/form";
import { ChevronLeft } from "@tamagui/lucide-icons";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { Dispatch, FC, SetStateAction } from "react";
import { Button, Form, H2, XStack, YStack } from "tamagui";

import { loginUser } from "@/api/auth";
import { useUser } from "@/hooks/useUser";

import MySheet from "../common/MySheet";

interface LoginProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const LogIn: FC<LoginProps> = ({ open, setOpen }) => {
  const { updateUser } = useUser();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      // Add User to State and replace route
      updateUser(user);
      router.replace("/");
    }
  });

  return (
    <MySheet open={open} setOpen={setOpen}>
      <XStack space="$6" marginBottom="$4">
        <Button icon={ChevronLeft} onPress={() => setOpen(false)} />
        <H2 fontWeight="bold">Log In</H2>
      </XStack>
      <LmFormRhfProvider
        mode="onTouched"
        defaultValues={{
          email: "",
          password: ""
        }}
      >
        {({ control, handleSubmit }) => (
          <Form
            onSubmit={handleSubmit((data) => {
              mutate(data);
            })}
          >
            <YStack space="$4">
              <LmInputRhf
                required
                label="Email"
                name="email"
                control={control}
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
                control={control}
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
              {isError && (
                <LmAlert
                  severity="error"
                  text={error.message}
                  animation="lazy"
                />
              )}

              <Form.Trigger asChild>
                <LmButton loading={isPending}>Log In</LmButton>
              </Form.Trigger>
            </YStack>
          </Form>
        )}
      </LmFormRhfProvider>
    </MySheet>
  );
};

export default LogIn;
