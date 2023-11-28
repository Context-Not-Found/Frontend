import { Plus, Ticket } from "@tamagui/lucide-icons";
import { useQuery } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import React from "react";
import { Button, H6, ListItem, ScrollView } from "tamagui";

import { MyStack } from "@/components";
import { useUser } from "@/hooks/useUser";
import { TicketParams } from "@/types";
import { fetchTickets } from "@/utils/fetchTickets";

const TicketList = () => {
  const { user } = useUser();
  const {
    data: tickets,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: async () => await fetchTickets(user!.user_id!)
  });

  return (
    <>
      <ScrollView bg="$backgroundStrong">
        <MyStack>
          {isLoading ? (
            <H6>Loading Tickets...</H6>
          ) : isError ? (
            <H6>
              Error... {error.message} {error.cause} {error.stack}
            </H6>
          ) : tickets!.length ? (
            tickets!.map(({ ticket_id, user_id }) => (
              <TickitItem
                key={ticket_id}
                ticketId={ticket_id.toString()}
                userId={user_id.toString()}
              />
            ))
          ) : (
            <H6 ta="center">No open tickets found</H6>
          )}
        </MyStack>
      </ScrollView>
      <FloatingBtn />
    </>
  );
};

export default TicketList;

const TickitItem = ({ ticketId, userId }: TicketParams) => (
  <Link
    href={{ pathname: "/Ticket/Chat", params: { ticketId, userId } }}
    asChild
  >
    <ListItem
      scaleIcon={2}
      icon={Ticket}
      title="Ticket"
      subTitle={`ID: ${ticketId}`}
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
