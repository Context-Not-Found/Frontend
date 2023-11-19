import { Plus, Ticket } from "@tamagui/lucide-icons";
import { Link, router } from "expo-router";
import React from "react";
import { Button, ListItem, ScrollView } from "tamagui";

import { MyStack } from "../../../../components";
import { useTicketStore } from "../../../../store";

const TicketList = () => {
  const { tickets } = useTicketStore();

  return (
    <>
      <ScrollView bg="$backgroundStrong">
        <MyStack>
          {tickets.map(({ ticket_id: id }) => (
            <TickitItem key={id} id={id} />
          ))}
        </MyStack>
      </ScrollView>
      <FloatingBtn />
    </>
  );
};

export default TicketList;

const TickitItem = ({ id }: { id: number }) => (
  <Link href={{ pathname: "/Ticket/Chat", params: { id } }} asChild>
    <ListItem
      scaleIcon={2}
      icon={Ticket}
      title="Ticket"
      subTitle={`ID: ${id}`}
      borderRadius="$5"
      pressTheme
      bordered
    />
  </Link>
);

// Custom Floating Btn
const FloatingBtn = () => (
  <Button
    pos="absolute"
    b="$0"
    r="$0"
    m="$6"
    icon={Plus}
    size="$6"
    scaleIcon={1.5}
    circular
    onPress={() => router.push("/Ticket/Form")}
  />
);
