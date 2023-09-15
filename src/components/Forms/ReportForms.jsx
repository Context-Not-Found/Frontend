import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { Button, SegmentedButtons, Snackbar, Text, TextInput } from 'react-native-paper';
import { useTicketStore } from '../../store';
import MapWrapper from '../maps/MapWrapper';

const ReportForms = () => {
  const { navigate } = useNavigation();
  const { createTicket } = useTicketStore();
  const [visible, setVisible] = useState(false);
  const [reportFor, setReportFor] = useState(false);

  const [formData, setFormData] = useState({
    rating: 0,
    is_anonymous: 0,
    report_content: null,
    lat: 28.797305115514803,
    long: 77.5397520735049
  });
  const { width } = Dimensions.get('window');

  return (
    <>
      <View>
        <Text style={styles.label}>Report For</Text>
        <SegmentedButtons
          value={reportFor}
          onValueChange={(reportFor) => {
            setReportFor(reportFor);

            if (reportFor) {
              setVisible(true);

              setTimeout(() => {
                setVisible(false);
              }, 5000);
            }
          }}
          buttons={[
            {
              value: false,
              label: 'Self',
              showSelectedCheck: true
            },
            {
              value: true,
              label: 'Other',
              showSelectedCheck: true
            }
          ]}
        />
      </View>

      {!reportFor && (
        <View>
          <Text style={styles.label}>Report As</Text>
          <SegmentedButtons
            value={formData.is_anonymous}
            onValueChange={(is_anonymous) => setFormData({ ...formData, is_anonymous })}
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
        <Text style={styles.label}>
          Location <Text> (Hold the marker to set location)</Text>
        </Text>
        <View style={{ width: width - 40, aspectRatio: 1 }}>
          <MapWrapper>
            <Marker
              draggable
              coordinate={{ latitude: formData.lat, longitude: formData.long }}
              onDragEnd={(e) =>
                setFormData({
                  ...formData,
                  lat: e.nativeEvent.coordinate.latitude,
                  long: e.nativeEvent.coordinate.longitude
                })
              }
            />
          </MapWrapper>
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
        <Text style={styles.label}>Report</Text>
        <TextInput
          label="Report your incident here"
          multiline
          mode="outlined"
          numberOfLines={4}
          outlineStyle={{ borderRadius: 10 }}
          value={formData.report_content}
          onChangeText={(report_content) => setFormData({ ...formData, report_content })}
        />
      </View>

      <Button
        mode="contained"
        onPress={async () => {
          try {
            await createTicket(formData);
            console.log(formData);
          } finally {
            navigate('TicketList');
          }
        }}
      >
        Submit
      </Button>
      <Snackbar visible={visible} wrapperStyle={{ position: 'absolute', top: 0 }}>
        You will be reporting your incident as Non-Anonymous.
      </Snackbar>
    </>
  );
};

export default ReportForms;

const styles = StyleSheet.create({
  label: { fontSize: 15, fontWeight: '700', marginBottom: 5 }
});
