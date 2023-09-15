import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Provider as PaperProvider } from 'react-native-paper';
import axios from 'axios';

const HelpBot = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const sendMessage = async () => {
    try {
      setChatHistory([...chatHistory, { type: 'user', text: message }]);

      setMessage('');

      setIsBotTyping(true);
      const response = await axios.post('https://womenprotection.onrender.com/chatbot', {
        message: message
      });
      setIsBotTyping(false);
      const botResponse = response.data.response;
      setChatHistory([
        ...chatHistory,
        { type: 'user', text: message },
        { type: 'bot', text: botResponse }
      ]);
    } catch (error) {
      setIsBotTyping(false);
      console.error('Error sending message:', error);
      if (error.response) {
        console.error('Server Response:', error.response.data);
      }
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>HelpBot</Text>
        <ScrollView style={styles.chatContainer}>
          {chatHistory.map((chat, index) => (
            <View key={index} style={chat.type === 'user' ? styles.userMessage : styles.botMessage}>
              <Text>{chat.text}</Text>
            </View>
          ))}
        </ScrollView>

        <TextInput
          placeholder="Type your message"
          value={message}
          onChangeText={(text) => setMessage(text)}
          right={<TextInput.Icon icon={(icon = 'send')} onPress={sendMessage} />}
        />
      </View>
    </PaperProvider>
  );
};

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
  inputContainer: {
    flexDirection: 'row',
    padding: 10
  },
  input: {
    flex: 1,
    marginRight: 10
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

export default HelpBot;
