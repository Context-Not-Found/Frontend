import { useNavigation } from '@react-navigation/native';
import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('cc');
  const { navigate } = useNavigation();
  const login = async (userDetails) => {
    console.log(userDetails);

    setTimeout(() => navigate('Home'), 2000);
  };

  const signUp = async (userDetails) => {
    console.log(userDetails);

    setTimeout(() => navigate('Login'), 2000);
  };

  const logout = async () => {
    console.log('logged out');

    setTimeout(() => navigate('Login'), 2000);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signUp,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
