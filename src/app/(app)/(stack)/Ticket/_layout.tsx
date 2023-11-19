import { Trash } from "@tamagui/lucide-icons";
import { Stack } from "expo-router";

import { MyHeader, PopupMenuItem } from "../../../../components";
import { useTicketStore } from "../../../../store";

interface RouteProps {
  name: string;
  params: { id: string };
}

const TicketLayout = () => {
  const { closeTicket } = useTicketStore();

  //  Custom Title for the Header
  const handleTitle = (route: RouteProps) => {
    const { name, params } = route;

    let title;
    switch (name) {
      case "index":
        title = "Tickets";
        break;
      case "Chat":
        title = `Chat ${params!.id}`;
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
          onPress: () => closeTicket(params.id)
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
