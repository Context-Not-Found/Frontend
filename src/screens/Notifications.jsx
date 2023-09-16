import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Appbar, Divider, List } from 'react-native-paper';
import { useNotificationStore } from '../store';

const NotificationItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item)}>
    <View style={itemStyles.container}>
      <List.Item
        title="Assistance Required"
        description="Check Community Chat"
        left={(props) => <List.Icon {...props} icon="bell" />}
      />
      <Divider />
    </View>
  </TouchableOpacity>
);

const NotificationScreen = () => {
  const { navigate, goBack } = useNavigation();

  const { notifications, fetchNotifications } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <View style={{ flex: 1 }}>
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
              navigate('Chat');
            }}
          />
        )}
        keyExtractor={(item) => item.sos_id}
      />
    </View>
  );
};

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
