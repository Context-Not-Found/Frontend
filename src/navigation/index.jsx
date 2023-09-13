import { useUserStore } from '../store';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

const Navigator = () => {
  const { user } = useUserStore();

  return <>{user ? <HomeStack /> : <AuthStack />}</>;
};

export default Navigator;
