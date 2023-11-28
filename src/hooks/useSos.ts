import { useMutation } from "@tanstack/react-query";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

import { useUser } from "@/hooks/useUser";
import { closeSOS } from "@/utils/closeSOS";
import { createSOS } from "@/utils/createSOS";

interface SOSHook {
  location: Location.LocationObject | null;
  isSosOn: boolean;
  handleSosBtn: () => Promise<void>;
}

export const useSOS = (): SOSHook => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [isSosOn, setIsSosOn] = useState<boolean>(false);
  const { user } = useUser();

  const { mutate: createSOSMutation, isError: creationError } = useMutation({
    mutationFn: createSOS
  });
  const { mutate: closeSOSMutation, isError: closingError } = useMutation({
    mutationFn: closeSOS
  });

  useEffect(() => {
    // SOS is still off. There was a error while creating SOS
    if (creationError) setIsSosOn(false);
    // SOS is still on. There was a error while closing SOS
    if (closingError) setIsSosOn(true);
  }, [creationError, closingError]);

  useEffect(() => {
    const getLocationPermission = async () => {
      const { status } = await Location.getForegroundPermissionsAsync();

      if (status !== "granted") {
        // alert("Please Turn on the location");
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
      console.log("Setting SOS ON");
      setIsSosOn(true);
      createSOSMutation({ user_id: user?.user_id!, location: location });
    } else if (isSosOn && location) {
      console.log("Setting SOS OFF");
      setIsSosOn(false);
      closeSOSMutation(user?.user_id!);
    }
  };

  return { location, isSosOn, handleSosBtn };
};
