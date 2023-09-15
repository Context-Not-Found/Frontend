import React from 'react';
import { ScrollView, View } from 'react-native';
import { ReportForms } from '../../components';

const Report = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, justifyContent: 'space-between', gap: 15, margin: 20 }}>
        <ReportForms />
      </View>
    </ScrollView>
  );
};

export default Report;
