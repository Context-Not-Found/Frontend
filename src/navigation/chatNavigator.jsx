import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Community, HelpBot, Report, TicketChat, Tickets } from '../screens';

const Tab = createMaterialTopTabNavigator();

const Chat = () => {
  const { top } = useSafeAreaInsets();

  return (
    <Tab.Navigator initialRouteName="Community" style={{ paddingTop: top }}>
      <Tab.Screen name="Community" component={Community} />
      <Tab.Screen name="Tickets" component={TicketStack} options={{ title: 'Report' }} />
      <Tab.Screen name="Help" component={HelpBot} />
    </Tab.Navigator>
  );
};

export default Chat;

const TicketStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="TicketList">
      <Stack.Screen name="TicketList" component={Tickets} options={{ headerShown: false }} />
      <Stack.Screen name="ReportForm" component={Report} options={{ headerStatusBarHeight: 0 }} />
      <Stack.Screen
        name="TicketChatRoom"
        component={TicketChat}
        options={{ headerStatusBarHeight: 0 }}
      />
    </Stack.Navigator>
  );
};
