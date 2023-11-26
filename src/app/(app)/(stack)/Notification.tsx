import { Bell, BellOff } from "@tamagui/lucide-icons";
import { ListItem, ScrollView } from "tamagui";

import { MyStack } from "@/components";
import { useNotificationStore } from "@/store";
import { SOS } from "@/types";

const Notifications = () => {
  const { notifications } = useNotificationStore();
  return (
    <ScrollView bg="$backgroundStrong">
      <MyStack>
        {notifications.map((notification) => (
          <NotificationItem key={notification.sos_id} {...notification} />
        ))}
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
