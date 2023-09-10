import { useAuth } from '../context/AuthProvider';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

const Navigator = () => {
  const { user } = useAuth();

  return <>{user ? <HomeStack /> : <AuthStack />}</>;
};

export default Navigator;
