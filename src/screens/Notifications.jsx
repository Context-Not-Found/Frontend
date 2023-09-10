import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Appbar, Divider, List } from 'react-native-paper';

// Sample data
const notifications = [
  {
    id: '1',
    title: 'New message',
    description: 'John sent you a new message.',
    timestamp: '2 mins ago'
  },
  {
    id: '2',
    title: 'App update',
    description: 'A new update is available.',
    timestamp: '1 hour ago'
  }
];

const NotificationItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item)}>
    <View style={itemStyles.container}>
      <List.Item
        title={item.title}
        description={item.description}
        left={(props) => <List.Icon {...props} icon="bell" />}
        right={() => <Text style={itemStyles.timestamp}>{item.timestamp}</Text>}
      />
      <Divider />
    </View>
  </TouchableOpacity>
);

const NotificationScreen = () => {
  const { navigate, goBack } = useNavigation();

  return (
    <View style={screenStyles.container}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            goBack();
          }}
        />
        <Appbar.Content title="Notifications" />
      </Appbar.Header>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <NotificationItem
            item={item}
            onPress={() => {
              navigate('RealtimeMap');
            }}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const screenStyles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const itemStyles = StyleSheet.create({
  timestamp: {
    alignSelf: 'center',
    marginRight: 12,
    color: '#888',
    fontSize: 12
  },
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  }
});

export default NotificationScreen;
