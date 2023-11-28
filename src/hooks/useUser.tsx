import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

import { User } from "@/types";

interface UserContextType {
  user: User | null;
  updateUser: (newUser: User) => Promise<void>;
  logOutUser: () => Promise<void>;
}
const UserContext = createContext<UserContextType>({
  user: null,
  updateUser: async () => {},
  logOutUser: async () => {}
});

// Custom hook to access the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch (error) {
        console.error("Error fetching user from AsyncStorage:", error);
      }
    };
    fetchUser();
  }, []);

  // Define a function to update the user value
  const updateUser = async (newUser: User) => {
    try {
      setUser(newUser);
      // Save the updated user to AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(newUser));
    } catch (error) {
      console.error("Error updating user in AsyncStorage:", error);
    }
  };

  const logOutUser = async () => {
    try {
      console.log("Removing User");
      // Clear Local Storage
      await AsyncStorage.removeItem("user");
      // Replace route to /Auth
      router.replace("/Auth");
    } catch (error) {
      console.error("Error removing user in AsyncStorage:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logOutUser }}>
      {children}
    </UserContext.Provider>
  );
};
