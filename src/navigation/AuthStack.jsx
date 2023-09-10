import { createStackNavigator } from '@react-navigation/stack';
import { Login, SignUp } from '../screens';

const AuthStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
