import { Trash } from "@tamagui/lucide-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Stack } from "expo-router";

import { MyHeader, PopupMenuItem } from "@/components";
import { TicketParams } from "@/types";
import { closeTicket } from "@/utils/closeTicket";

interface RouteProps {
  name: string;
  params: TicketParams;
}

const TicketLayout = () => {
  const queryClient = useQueryClient();
  const closeTicketQuery = useMutation({
    mutationFn: closeTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    }
  });

  //  Custom Title for the Header
  const handleTitle = (route: RouteProps) => {
    const { name, params } = route;

    let title;
    switch (name) {
      case "index":
        title = "Tickets";
        break;
      case "Chat":
        title = `Chat ${params!.ticketId}`;
        break;
      default:
        title = name;
        break;
    }
    return title;
  };

  const handleButtons = (route: RouteProps): PopupMenuItem[] => {
    const { name, params } = route;

    if (name === "Chat") {
      return [
        {
          icon: Trash,
          title: "Delete",
          onPress: () => closeTicketQuery.mutate(params.ticketId)
        }
      ];
    }
    return [];
  };

  return (
    <Stack
      screenOptions={{
        header: (props) => (
          <MyHeader
            title={handleTitle(props.route as RouteProps)}
            popupMenu={handleButtons(props.route as RouteProps)}
          />
        ),
        animation: "fade_from_bottom"
      }}
    />
  );
};

export default TicketLayout;
