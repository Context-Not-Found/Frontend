import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Chat, Heatmap } from '../screens';
import SOSNavigator from './sosNavigator';

const Tab = createMaterialBottomTabNavigator();

export default Navigator = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <Tab.Navigator initialRouteName="Home" labeled={true} safeAreaInsets={{ bottom }}>
      <Tab.Screen
        name="Home"
        component={Chat}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icons
              name={focused ? 'account-group' : 'account-group-outline'}
              size={25}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="SOSNavigator"
        component={SOSNavigator}
        options={{
          title: 'SOS',
          tabBarIcon: ({ focused, color }) => (
            <Icons
              name={focused ? 'alert-octagram' : 'alert-octagram-outline'}
              size={25}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="Heatmap"
        component={Heatmap}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icons
              name={focused ? 'map-marker-multiple' : 'map-marker-multiple-outline'}
              size={25}
              color={color}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
};
