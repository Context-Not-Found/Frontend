import { Link } from "expo-router";
import { Paragraph } from "tamagui";

import { MyStack } from "@/components";

const Notifications = () => {
  return (
    <MyStack>
      <Paragraph>Notifications</Paragraph>
      <Link href={"/"} style={{ color: "#fff" }}>
        Chats
      </Link>
    </MyStack>
  );
};

export default Notifications;
