import { Redirect, Stack } from "expo-router";

import { useUser } from "@/hooks/useUser";

const AppLayout = () => {
  const { user } = useUser();

  // Fetching all data from store and retring if anyone failed
  // const fetchAllData = async () => {
  //   const fetchFunctions = [];
  //
  //   for (const fetchFunction of fetchFunctions) {
  //     await fetchDataWithRetry(fetchFunction);
  //   }
  // };

  // useEffect(() => {
  //   if (!user) return;
  //
  //   fetchAllData();
  // }, [user]);

  if (!user) return <Redirect href="/Auth" />;

  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
    />
  );
};

export default AppLayout;
