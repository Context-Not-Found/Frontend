import { createStackNavigator } from '@react-navigation/stack';
import { Notifications, RealtimeMap, SOS } from '../screens';

const Stack = createStackNavigator();

const SOSNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SOS" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SOS" component={SOS} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="RealtimeMap" component={RealtimeMap} />
    </Stack.Navigator>
  );
};

export default SOSNavigator;
