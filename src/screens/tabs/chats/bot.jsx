import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Text, HelperText } from 'react-native-paper';
import { useHelpBotStore } from '../../../store';

const HelpBot = () => {
  const { message, chatHistory, isBotTyping, setMessage, sendMessage } = useHelpBotStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HelpBot</Text>
      <ScrollView style={styles.chatContainer}>
        {chatHistory.map((chat, index) => (
          <View key={index} style={chat.type === 'user' ? styles.userMessage : styles.botMessage}>
            <Text>{chat.text}</Text>
          </View>
        ))}
      </ScrollView>
      <HelperText>{isBotTyping && 'typing....'}</HelperText>
      <TextInput
        placeholder="Type your message"
        value={message}
        onChangeText={(text) => setMessage(text)}
        right={<TextInput.Icon icon="send" onPress={() => sendMessage(message)} />}
      />
    </View>
  );
};

export default HelpBot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  chatContainer: {
    flex: 1,
    marginBottom: 10
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#e6e6e6',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#d1f7d1',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10
  }
});
