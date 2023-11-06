import { ArrowDown } from "@tamagui/lucide-icons";
import { cyan, greenA, greenDark, radius, whiteA } from "@tamagui/themes";
import { type FC } from "react";
import {
  Avatar,
  AvatarProps,
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

  const renderAvatar = (props: AvatarProps<IMessage>) => {
    return <Avatar {...props} renderAvatarOnTop />;
  };

  const renderLoading = () => {
    return <Spinner size="large" />;
  };

  const parsePattern = () => {
    return [
      { type: "phone", style: { color: cyan.cyan8 } },
      { type: "url", style: { color: cyan.cyan8 } }
    ];
  };

  return (
    <View f={1} mt="$12" pt="$2" bc="$backgroundStrong">
      <GiftedChat
        messages={messages}
        user={{ _id: user!.user_id!, name: user!.name }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolBar}
        renderAvatar={renderAvatar}
        parsePatterns={parsePattern}
        renderLoading={renderLoading}
        scrollToBottomStyle={{ backgroundColor: greenA.greenA4 }}
        scrollToBottomComponent={() => <ArrowDown />}
        scrollToBottom={true}
        inverted={false}
        isTyping={true}
        alignTop
      />
    </View>
  );
};

export default ChatRoom;
