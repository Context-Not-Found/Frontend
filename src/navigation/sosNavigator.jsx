import { createStackNavigator } from '@react-navigation/stack';
import { Notifications, SOS } from '../screens';

const Stack = createStackNavigator();

const SOSNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="sos" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sos" component={SOS} />
      <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  );
};

export default SOSNavigator;
