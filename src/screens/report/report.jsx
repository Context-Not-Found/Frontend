import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { ReportForms } from '../../components';

const Report = () => {
  return (
    <ScrollView>
      <View style={{ flex: 1, gap: 15, margin: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: '800', textAlign: 'center' }}>
          Report Incident
        </Text>

        <ReportForms />
      </View>
    </ScrollView>
  );
};

export default Report;
