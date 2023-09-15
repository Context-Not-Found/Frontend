import 'dayjs/locale/en-in';
import { View } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import { IconButton, useTheme } from 'react-native-paper';

const ChatRoom = ({ messages, onSend, user }) => {
  const { colors } = useTheme();

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        containerStyle={{
          left: { marginBottom: 5 },
          right: { marginBottom: 5 }
        }}
        wrapperStyle={{
          left: { backgroundColor: colors.primaryContainer },
          right: { backgroundColor: colors.primary }
        }}
      />
    );
  }

  function renderSend(props) {
    return (
      <Send {...props}>
        <View>
          <IconButton icon="send" size={20} />
        </View>
      </Send>
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{ _id: user, name: `User ${user}` }}
      placeholder="Type your message here..."
      locale="en-in"
      alwaysShowSend
      scrollToBottom={true}
      alignTop
      inverted={false}
      renderBubble={renderBubble}
      renderSend={renderSend}
    />
  );
};

export default ChatRoom;
