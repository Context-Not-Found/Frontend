import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, H1, H4, Paragraph, YStack } from "tamagui";



import { LogIn, MyStack, SignUp } from "../components";


const Home = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  const [user, setUser] = useState(false);

  useEffect(() => {
    if (user) router.replace("/(tabs)");
  }, [user]);

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
          <Button onPress={() => setUser(true)}>Log In</Button>
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

export default Home;