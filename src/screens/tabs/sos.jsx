import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import { DetailsBox, SosBanner, SosButton } from '../../components';

const SOS = () => {
  const { navigate } = useNavigation();

  const [location, setLocation] = useState(null);
  const [helpText, setHelpText] = useState(null);
  const [banner, setBanner] = useState(false);
  const [isSosOn, setIsSosOn] = useState(false);

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

  const handleSosBtn = () => {
    if (!isSosOn && location) {
      setHelpText('SOS button pressed. Sending location!');
      setIsSosOn(true);
      setBanner(true);
    } else if (isSosOn && location) {
      setHelpText('Turning Off SOS!');
      setIsSosOn(false);
      setBanner(true);
    }
  };

  const handleBanner = () => setBanner(false);

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
      <SosBanner visible={banner} text={helpText} onPress={handleBanner} />
      <SosButton isSosOn={isSosOn} onPress={handleSosBtn} />
      <DetailsBox details={details} />
    </>
  );
};

export default SOS;

const details = {
  name: 'test name',
  email: 'test@gmial.com',
  number: 123456789
};
