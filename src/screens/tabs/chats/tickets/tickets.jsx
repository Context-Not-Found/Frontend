import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { FAB, IconButton, List, Text, TouchableRipple, useTheme } from 'react-native-paper';
import { useTicketStore } from '../../../../store';

const Tickets = () => {
  const { tickets, closeTicket, getOpenTickets } = useTicketStore();
  const { navigate } = useNavigation();

  useEffect(() => {
    getOpenTickets();
  }, []);

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
            backgroundColor: colors.surface,
            borderBottomWidth: 1,
            borderBottomColor: colors.outline
          }}
          title={`Ticket Id: ${ticket_id}`}
          left={(props) => <List.Icon {...props} icon="ticket" />}
          right={(props) => (
            <IconButton {...props} icon="delete" onPress={() => closeTicket(ticket_id)} />
          )}
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
