import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ReportForms } from '../../components';

const Report = () => {
  return (
    <View style={styles.container}>
      <ReportForms />
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', marginHorizontal: 20, gap: 10 }
});
