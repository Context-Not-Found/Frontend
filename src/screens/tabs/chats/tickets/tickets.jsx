import { useNavigation } from '@react-navigation/native';
import { FlatList, View } from 'react-native';
import { FAB, List, Text, TouchableRipple, useTheme } from 'react-native-paper';
import { useTicketStore } from '../../../../store';

const Tickets = () => {
  const { tickets } = useTicketStore();
  const { navigate } = useNavigation();

  const TicketItem = ({ ticket }) => {
    const { colors } = useTheme();
    const { ticket_id, user_id } = ticket;

    return (
      <TouchableRipple onPress={() => navigate('TicketChatRoom', { ticket_id, user_id })}>
        <List.Item
          titleStyle={{
            fontSize: 20
          }}
          style={{
            marginHorizontal: 10,
            marginVertical: 5,
            borderRadius: 20,
            paddingVertical: 15,
            backgroundColor: colors.primaryContainer
          }}
          title="Ticket"
          right={(props) => <List.Item {...props} title={`ID: ${ticket_id}`} />}
          left={(props) => <List.Icon {...props} icon="ticket" />}
        />
      </TouchableRipple>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={tickets}
        renderItem={({ item }) => <TicketItem ticket={item} />}
        keyExtractor={(item) => item.ticket_id}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', fontSize: 20, marginVertical: 20 }}>
            No Ticket is Generated
          </Text>
        }
      />

      <FAB
        icon="plus"
        style={{
          position: 'absolute',
          margin: 16,
          right: 16,
          bottom: 16
        }}
        onPress={() => navigate('ReportForm')}
      />
    </View>
  );
};

export default Tickets;
