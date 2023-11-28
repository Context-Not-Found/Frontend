import { Bell, BellOff } from "@tamagui/lucide-icons";
import { useQuery } from "@tanstack/react-query";
import { H6, ListItem, ScrollView } from "tamagui";

import { fetchNotifications, sosKeys } from "@/api/sos";
import { MyStack } from "@/components";
import { useUser } from "@/hooks/useUser";
import { SOS } from "@/types";

const Notifications = () => {
  const { user } = useUser();
  const {
    data: notifications,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: sosKeys.sos(user?.user_id!),
    queryFn: fetchNotifications
  });
  return (
    <ScrollView bg="$backgroundStrong">
      <MyStack>
        {isLoading ? (
          <H6>Loading...</H6>
        ) : isError ? (
          <H6>Error... {error.message}</H6>
        ) : (
          notifications!.map((notification) => (
            <NotificationItem key={notification.sos_id} {...notification} />
          ))
        )}
      </MyStack>
    </ScrollView>
  );
};

export default Notifications;

const NotificationItem = (props: SOS) => (
  <ListItem
    scaleIcon={1.5}
    icon={props.is_open ? Bell : BellOff}
    title={`SOS alert from User ${props.user_id}`}
    borderRadius="$5"
    pressTheme
    bordered
  />
);
