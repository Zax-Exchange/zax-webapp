import { Box, Container, Divider, Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Thread,
  useMessageContext,
  Window,
} from "stream-chat-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const streamApiKey = process.env.REACT_APP_STREAM_API_KEY;
const streamAppId = process.env.REACT_APP_STREAM_APP_ID;
const filters = { type: "messaging", members: { $in: ["ancient-mountain-4"] } };
const sort = { last_message_at: -1 };

const CustomChannelPreview = (props) => {
  const { channel, setActiveChannel } = props;

  const { messages } = channel.state;
  const messagePreview = messages[messages.length - 1]?.text.slice(0, 30);

  return (
    <div onClick={() => setActiveChannel(channel)} style={{ margin: "12px" }}>
      <div>{channel.data.name || "Unnamed Channel"}</div>
      <div style={{ fontSize: "14px" }}>{messagePreview}</div>
    </div>
  );
};

const CustomMessage = () => {
  const { message } = useMessageContext();

  return (
    <div>
      <b style={{ marginRight: "4px" }}>{message.user.name}</b> {message.text}
    </div>
  );
};

const ProjectChat = ({
  projectBidId,
  setChatOpen,
  customerName,
  vendorName,
}) => {
  const { user } = useContext(AuthContext);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance(streamApiKey);

      await client.connectUser(
        {
          id: user.companyId,
          name: user.isVendor ? vendorName : customerName,
          // image:
          //   "https://getstream.io/random_png/?id=ancient-mountain-4&name=ancient-mountain-4",
        },
        user.chatToken
      );
      const channel = client.channel("messaging", projectBidId, {
        name: `Channel for ${customerName} & ${vendorName}`,
      });

      // Here, 'travel' will be the channel ID
      channel.addMembers([user.companyId]);
      const data = await channel.watch();
      console.log(data, channel);
      setChatClient(client);
      setChannel(channel);
    };

    initChat();
  }, []);

  useEffect(() => {
    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, [chatClient]);

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  return (
    <Chat client={chatClient} theme="messaging light">
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default ProjectChat;
