import { ArrowDown } from "@tamagui/lucide-icons";
import { cyan, greenA, greenDark, radius, whiteA } from "@tamagui/themes";
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
import { H6, SizableText, View } from "tamagui";

import Loader from "@/components/common/Loader";
import { useUser } from "@/hooks/useUser";

interface ChatRoomProps {
  messages: IMessage[];
  onSend: (message: IMessage[]) => void;
  isHelp?: boolean;
  isTyping?: boolean;
}

const ChatRoom: FC<ChatRoomProps> = ({
  messages,
  onSend,
  isHelp = false,
  isTyping = false
}) => {
  const { user } = useUser();

  // Chat Bubble
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

  // Bottom Toolbar
  const renderInputToolBar = (props: InputToolbarProps<IMessage>) => {
    return (
      <InputToolbar
        {...props}
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
            containerStyle={{}}
            textStyle={{ color: greenDark.green12, padding: 0, margin: 0 }}
          />
        )}
      />
    );
  };

  const renderChatEmpty = () => {
    return (
      <View m="$5" transform={[{ scale: -1 }]}>
        <H6 ta="center">
          {isHelp
            ? "Need assistance or have questions?"
            : "Silence can be a good sign"}
        </H6>
        <SizableText ta="center">
          {isHelp ? "Ask me anything! I'm here to help" : "No messages found"}
        </SizableText>
      </View>
    );
  };

  // Style Links & Phone Number
  const parsePattern = () => {
    return [
      { type: "phone", style: { color: cyan.cyan8 } },
      { type: "url", style: { color: cyan.cyan8 } }
    ];
  };

  // Chat Sceeen
  return (
    <View f={1} py="$2" bc="$backgroundStrong">
      <GiftedChat
        messages={messages}
        user={{ _id: user!.user_id!.toString(), name: user!.name! }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolBar}
        parsePatterns={parsePattern}
        renderLoading={() => <Loader />}
        renderChatEmpty={renderChatEmpty}
        scrollToBottomStyle={{ backgroundColor: greenA.greenA4 }}
        scrollToBottomComponent={() => <ArrowDown />}
        scrollToBottom={true}
        inverted={!messages.length}
        isTyping={isTyping}
        onSend={onSend}
        renderAvatarOnTop
        alignTop
      />
    </View>
  );
};

export default ChatRoom;
