import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Marker } from 'react-native-maps';
import { Appbar, Button, Card, Text } from 'react-native-paper';
import { MapWrapper } from '../components';

const RealtimeMap = () => {
  const { goBack } = useNavigation();

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => goBack()} />
        <Appbar.Content title="RealTime Map" />
      </Appbar.Header>
      <View style={{ height: '80%' }}>
        <MapWrapper>
          <Marker coordinate={markers} />
        </MapWrapper>
      </View>

      <Card
        mode="contained"
        style={{
          marginHorizontal: 10,
          position: 'absolute',
          bottom: -40,
          left: 0,
          right: 0
        }}
      >
        <Card.Content>
          <Text variant="titleLarge">Name: Test</Text>
          <Text variant="bodyLarge">Phone Number: 1234567989</Text>
        </Card.Content>
        <Card.Actions>
          <Button>Call</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default RealtimeMap;

// dummy data for testing
const markers = { latitude: 28.797688, longitude: 77.537946 };
