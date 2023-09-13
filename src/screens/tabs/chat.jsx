import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Community, HelpBot, Tickets } from '../../components';

const Tab = createMaterialTopTabNavigator();

const Chat = () => {
  const { top } = useSafeAreaInsets();

  return (
    <Tab.Navigator initialRouteName="Community" style={{ paddingTop: top }}>
      <Tab.Screen name="Community" component={Community} />
      <Tab.Screen name="Tickets" component={Tickets} />
      <Tab.Screen name="Help" component={HelpBot} />
    </Tab.Navigator>
  );
};

export default Chat;
