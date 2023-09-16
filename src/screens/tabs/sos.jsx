import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import { DetailsBox, SosBanner, SosButton } from '../../components';
import { useCommunityStore, useHeatmapStore, useTicketStore, useUserStore } from '../../store';
import { axios_ } from '../../store/axios';

const SOS = () => {
  const { navigate } = useNavigation();
  const { user } = useUserStore();

  const [location, setLocation] = useState(null);
  const [helpText, setHelpText] = useState(null);
  const [banner, setBanner] = useState(false);
  const [isSosOn, setIsSosOn] = useState(false);
  const { fetchMessages } = useCommunityStore();
  const { fetchAreas } = useHeatmapStore();
  const { getOpenTickets } = useTicketStore();

  // prefetching data of app
  useEffect(() => {
    fetchMessages();
    fetchAreas();
    getOpenTickets();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.getForegroundPermissionsAsync();

      if (status !== 'granted') {
        setHelpText('Please allow the location permissions.');
        setBanner(true);
        return;
      }

      setLocation(await Location.getCurrentPositionAsync({}));
    })();
  }, []);

  const handleSosBtn = async () => {
    if (!isSosOn && location) {
      setHelpText('SOS button pressed. Sending location!');
      setIsSosOn(true);
      setBanner(true);

      try {
        await axios_.post('/sos/create', {
          user_id: user.user_id,
          lat: location.coords.latitude,
          long: location.coords.longitude
        });
      } catch (error) {
        setHelpText('Error Sending the location');
      }
    } else if (isSosOn && location) {
      setHelpText('Turning Off SOS!');
      setIsSosOn(false);
      setBanner(true);
      try {
        await axios_.patch(`/sos/close/${user.user_id}`);
      } catch (error) {
        setHelpText('Error Closing The live location');
      }
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="SOS" />
        <Appbar.Action
          icon="bell"
          onPress={() => {
            navigate('Notifications');
          }}
        />
      </Appbar.Header>
      <SosBanner visible={banner} text={helpText} onPress={() => setBanner(false)} />
      <SosButton isSosOn={isSosOn} onPress={handleSosBtn} />
      <DetailsBox details={user} />
    </>
  );
};

export default SOS;
