import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, SegmentedButtons, TextInput } from 'react-native-paper';

const ReportForms = () => {
  const [segmentedValue, setSetsegmentedValue] = useState('');
  const [textInputedValue, setTextInput] = useState('');

  const handleSegmentedValueChange = (newValue) => {
    setSetsegmentedValue(newValue);
    console.log(newValue);
  };

  const handleTextInputValue = (newText) => {
    setTextInput(newText);
  };

  const handleSubmit = () => {
    console.log(segmentedValue);
    console.log(textInputedValue);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.segmentedContainer}>
        <SegmentedButtons
          style={styles.segmented}
          value={segmentedValue}
          onValueChange={handleSegmentedValueChange}
          onPress={() => console.log(value)}
          buttons={[
            {
              value: 'anon',
              label: 'Anonymous'
            },
            {
              value: 'non_anon',
              label: 'Non_Anonymous'
            }
          ]}
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          label="Report your incident here"
          style={styles.textInput}
          multiline={true}
          text={textInputedValue}
          onChangeText={handleTextInputValue}
        />
      </View>
      <View>
        <Button mode="contained" onPress={handleSubmit}>
          Submit
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16
  },
  segmentedContainer: {
    marginBottom: 20
  },
  textInputContainer: {
    marginBottom: 20
  },
  textInput: {
    backgroundColor: 'white'
  }
});

export default ReportForms;
