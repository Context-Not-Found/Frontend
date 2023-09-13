import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { FAB, IconButton, List, Text, TouchableRipple, useTheme } from 'react-native-paper';
import { useTicketStore } from '../../store/ticketStore';

const Tickets = () => {
  const { tickets, createTicket, closeTicket, getOpenTickets } = useTicketStore();

  useEffect(() => {
    getOpenTickets();
  }, []);

  const TicketItem = ({ ticket }) => {
    const { colors } = useTheme();
    const { ticket_id } = ticket;

    return (
      <TouchableRipple onPress={() => console.log('route to ticket chat')}>
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
        onPress={() => createTicket()}
      />
    </View>
  );
};

export default Tickets;
