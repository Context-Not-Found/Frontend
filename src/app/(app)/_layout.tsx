import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";

import { fetchDataWithRetry } from "../../helper";
import {
  useChatStore,
  useHeatmapStore,
  useNotificationStore,
  useTicketStore,
  useUserStore
} from "../../store";

const AppLayout = () => {
  const { user } = useUserStore();

  const { fetchAreas } = useHeatmapStore();
  const { fetchMessages } = useChatStore();
  const { fetchTickets } = useTicketStore();
  const { fetchNotifications } = useNotificationStore();

  // Fetching all data from store and retring if anyone failed
  const fetchAllData = async () => {
    const fetchFunctions = [
      fetchTickets,
      fetchMessages,
      fetchAreas,
      fetchNotifications
    ];

    for (const fetchFunction of fetchFunctions) {
      await fetchDataWithRetry(fetchFunction);
    }
  };

  useEffect(() => {
    if (!user) return;

    fetchAllData();
  }, [user]);

  if (!user) return <Redirect href="/Auth" />;

  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
    />
  );
};

export default AppLayout;
