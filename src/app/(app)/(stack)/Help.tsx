import { Link } from "expo-router";
import { Paragraph } from "tamagui";

import { MyStack } from "@/components";

const Help = () => {
  return (
    <MyStack>
      <Paragraph>Help</Paragraph>
      <Link href={"/"} style={{ color: "#fff" }}>
        Home
      </Link>
    </MyStack>
  );
};

export default Help;
