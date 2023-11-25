import * as Location from "expo-location";
import { useEffect, useState } from "react";

import { axios_, useUserStore } from "../store";

interface SOSHook {
  location: Location.LocationObject | null;
  isSosOn: boolean;
  handleSosBtn: () => Promise<void>;
}

const useSOS = (): SOSHook => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [isSosOn, setIsSosOn] = useState<boolean>(false);
  const { user } = useUserStore();

  useEffect(() => {
    const getLocationPermission = async () => {
      const { status } = await Location.getForegroundPermissionsAsync();

      if (status !== "granted") {
        alert("Please Turn on the location");
        return;
      }

      try {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      } catch (error) {
        console.error("Error getting location:", error);
      }
    };

    getLocationPermission();
  }, []);

  const handleSosBtn = async (): Promise<void> => {
    if (!isSosOn && location) {
      setIsSosOn(true);

      try {
        await axios_.post("/sos/create", {
          user_id: user?.user_id,
          lat: location.coords.latitude,
          long: location.coords.longitude
        });
      } catch (error) {
        console.error("Error creating SOS:", error);
      }
    } else if (isSosOn && location) {
      setIsSosOn(false);

      try {
        await axios_.patch(`/sos/close/${user?.user_id}`);
      } catch (error) {
        console.error("Error closing SOS:", error);
      }
    }
  };

  return { location, isSosOn, handleSosBtn };
};

export default useSOS;
