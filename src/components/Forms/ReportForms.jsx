import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, SegmentedButtons, TextInput } from 'react-native-paper';
import { useTicketStore } from '../../store';
import MapWrapper from '../maps/MapWrapper';

const ReportForms = () => {
  const { navigate } = useNavigation();
  const { createTicket } = useTicketStore();

  const [formData, setFormData] = useState({
    type: 0,
    message: null
  });

  return (
    <>
      <SegmentedButtons
        value={formData.type}
        onValueChange={(type) => setFormData({ ...formData, type })}
        buttons={[
          {
            value: 0,
            label: 'Non Anonymous',
            showSelectedCheck: true
          },
          {
            value: 1,
            label: 'Anonymous',
            showSelectedCheck: true
          }
        ]}
      />
      <View style={{ height: '50%' }}>
        <MapWrapper></MapWrapper>
      </View>
      <TextInput
        label="Report your incident here"
        multiline
        mode="outlined"
        numberOfLines={4}
        outlineStyle={{ borderRadius: 10 }}
        value={formData.message}
        onChangeText={(message) => setFormData({ ...formData, message })}
      />
      <Button
        mode="contained"
        onPress={() => {
          createTicket();
          navigate('TicketList');
        }}
      >
        Submit
      </Button>
    </>
  );
};

export default ReportForms;
