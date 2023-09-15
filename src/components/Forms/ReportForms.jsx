import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, SegmentedButtons, Snackbar, TextInput } from 'react-native-paper';
import { useTicketStore } from '../../store';
import MapWrapper from '../maps/MapWrapper';

const ReportForms = () => {
  const { navigate } = useNavigation();
  const { createTicket } = useTicketStore();
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    rating: 0,
    for: 0,
    type: 0,
    message: null
  });

  const onDismissSnackBar = () => setVisible(false);

  return (
    <>
      <SegmentedButtons
        value={formData.for}
        onValueChange={(data) => {
          setFormData({ ...formData, for: data });

          if (data === 1) {
            setVisible(true);
          } else {
            setVisible(false);
          }
        }}
        buttons={[
          {
            value: 0,
            label: 'Self',
            showSelectedCheck: true
          },
          {
            value: 1,
            label: 'Other',
            showSelectedCheck: true
          }
        ]}
      />

      {!formData.for && (
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
      )}
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo'
        }}
      >
        You will be reporting as Non-Anonymous
      </Snackbar>
      <View style={{ height: '50%' }}>
        <MapWrapper></MapWrapper>
      </View>
      <SegmentedButtons
        value={formData.rating}
        onValueChange={(rating) => {
          setFormData({ ...formData, rating });
        }}
        buttons={[
          {
            value: 0,
            label: 'Mild'
          },
          { value: 1, label: 'Moderate' },
          {
            value: 2,
            label: 'Urgent'
          }
        ]}
      />
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

const styles = StyleSheet.create({
  title: {
    textAlign: 'center'
  }
});

export default ReportForms;
