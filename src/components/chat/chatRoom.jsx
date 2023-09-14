import { View } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import { IconButton, useTheme } from 'react-native-paper';
import { useUserStore } from '../../store/userStore';

const ChatRoom = ({ messages, onSend }) => {
  const { colors } = useTheme();
  const {
    user: { user_id }
  } = useUserStore();

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: colors.primaryContainer
          },
          right: {
            backgroundColor: colors.primary
          }
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
      user={{ _id: user_id }}
      placeholder="Type your message here..."
      alwaysShowSend
      inverted={false}
      renderBubble={renderBubble}
      renderSend={renderSend}
    />
  );
};

export default ChatRoom;
