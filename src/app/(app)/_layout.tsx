import { QueryFunction, QueryKey, useQueryClient } from "@tanstack/react-query";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";

import { areasKeys, fetchAreas } from "@/api/areas";
import { chatKeys, fetchMessages } from "@/api/chat";
import { fetchNotifications, sosKeys } from "@/api/sos";
import { fetchTickets, ticketKeys } from "@/api/ticket";
import { useUser } from "@/hooks/useUser";

const AppLayout = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const preFetchAllData = async () => {
    // Can't be bothered to add types for this.
    const fetchFunctionswithKeys: [QueryKey, QueryFunction<any, any>][] = [
      [chatKeys.community_chat, fetchMessages],
      [areasKeys.heatmap, fetchAreas],
      [
        ticketKeys.tickets(user?.user_id!),
        async () => await fetchTickets(user!.user_id!)
      ],
      [sosKeys.sos(user?.user_id!), fetchNotifications]
    ];

    for (const [key, fetchFunction] of fetchFunctionswithKeys) {
      queryClient.prefetchQuery({ queryKey: key, queryFn: fetchFunction });
    }
  };

  useEffect(() => {
    if (!user) return;

    preFetchAllData();
  }, [user]);

  if (!user) return <Redirect href="/Auth" />;

  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
    />
  );
};

export default AppLayout;
