import { greenDark, radius, whiteA } from "@tamagui/themes";
import { type FC } from "react";
import {
  Bubble,
  BubbleProps,
  Composer,
  GiftedChat,
  type IMessage,
  InputToolbar,
  InputToolbarProps,
  Send
} from "react-native-gifted-chat";
import { Spinner, View } from "tamagui";

import { useUserStore } from "../../store";

interface ChatRoomProps {
  messages: IMessage[];
  onSend: (messages: IMessage[]) => void;
}

const ChatRoom: FC<ChatRoomProps> = ({ messages, onSend }) => {
  const { user } = useUserStore();

  const renderBubble = (props: BubbleProps<IMessage>) => {
    return (
      <Bubble
        {...props}
        usernameStyle={{ color: greenDark.green12 }}
        textStyle={{
          left: { color: whiteA.whiteA12 }
        }}
        wrapperStyle={{
          left: { backgroundColor: greenDark.green6 },
          right: { backgroundColor: greenDark.green10 }
        }}
        renderUsernameOnMessage
      />
    );
  };

  const renderInputToolBar = (props: InputToolbarProps<IMessage>) => {
    return (
      <InputToolbar
        {...props}
        accessoryStyle={{}}
        containerStyle={{
          marginHorizontal: 10,
          paddingHorizontal: 10,
          borderRadius: radius[10],
          backgroundColor: greenDark.green6
        }}
        renderComposer={(props) => (
          <Composer {...props} textInputStyle={{ color: whiteA.whiteA12 }} />
        )}
        renderSend={(props) => (
          <Send
            {...props}
            onSend={onSend}
            containerStyle={{}}
            textStyle={{ color: greenDark.green12, padding: 0, margin: 0 }}
          />
        )}
      />
    );
  };

  const renderLoading = () => {
    return <Spinner size="large" />;
  };

  return (
    <View f={1} mt="$12" pt="$2" backgroundColor={"$backgroundStrong"}>
      <GiftedChat
        messages={messages}
        user={{ _id: user!.user_id!, name: user!.name }}
        renderBubble={renderBubble}
        renderLoading={renderLoading}
        renderInputToolbar={renderInputToolBar}
        scrollToBottom={true}
        inverted={false}
        isTyping={true}
        renderAvatarOnTop
        alignTop
      />
    </View>
  );
};

export default ChatRoom;
