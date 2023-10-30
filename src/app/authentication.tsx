import { useState } from "react";
import { Button, H1, H4, Paragraph, YStack } from "tamagui";

import { LogIn, MyStack, SignUp } from "../components";

const Auth = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  return (
    <>
      <MyStack>
        <YStack space="$4">
          <YStack>
            <H1 scale="$0.75" textAlign="center">
              Safe Her
            </H1>
            <H4 textAlign="center">Amplifying Security Together</H4>
          </YStack>
          <Paragraph textAlign="center">
            Empowerment through Safety, One Tap at a Time - Where Security Meets
            Convenience
          </Paragraph>
        </YStack>

        <YStack space="$2.5">
          <Button onPress={() => setOpenLogin(true)}>Log In</Button>
          <Button variant="outlined" onPress={() => setOpenSignUp(true)}>
            Sign Up
          </Button>
        </YStack>
      </MyStack>
      <LogIn open={openLogin} setOpen={setOpenLogin} />
      <SignUp open={openSignUp} setOpen={setOpenSignUp} />
    </>
  );
};

export default Auth;
