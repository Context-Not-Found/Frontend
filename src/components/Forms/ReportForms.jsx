import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, SegmentedButtons, Snackbar, Text, TextInput } from 'react-native-paper';
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
  const { width } = Dimensions.get('window');

  return (
    <>
      <View>
        <Text style={styles.label}>Report For</Text>
        <SegmentedButtons
          value={formData.for}
          onValueChange={(data) => {
            setFormData({ ...formData, for: data });

            if (data === 1) {
              setVisible(true);

              setTimeout(() => {
                setVisible(false);
              }, 5000);
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
      </View>

      {!formData.for && (
        <View>
          <Text style={styles.label}>Report As</Text>
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
        </View>
      )}

      <View>
        <Text style={styles.label}>Location</Text>
        <View style={{ width: width - 40, aspectRatio: 1 }}>
          <MapWrapper></MapWrapper>
        </View>
      </View>

      <View>
        <Text style={styles.label}>Urgency</Text>
        <SegmentedButtons
          value={formData.rating}
          onValueChange={(rating) => {
            setFormData({ ...formData, rating });
          }}
          buttons={[
            { value: 0, label: 'Low' },
            { value: 1, label: 'Medium' },
            { value: 2, label: 'High' }
          ]}
        />
      </View>

      <View>
        <Text style={styles.label}>Label</Text>
        <TextInput
          label="Report your incident here"
          multiline
          mode="outlined"
          numberOfLines={4}
          outlineStyle={{ borderRadius: 10 }}
          value={formData.message}
          onChangeText={(message) => setFormData({ ...formData, message })}
        />
      </View>

      <Button
        mode="contained"
        onPress={async () => {
          try {
            await createTicket();
          } finally {
            navigate('TicketList');
          }
        }}
      >
        Submit
      </Button>
      <Snackbar visible={visible}>
        By selecting &quot;Other,&quot; you will be reporting your incident as Non-Anonymous.
      </Snackbar>
    </>
  );
};

export default ReportForms;

const styles = StyleSheet.create({
  label: { fontSize: 15, fontWeight: '700', marginBottom: 5 }
});
