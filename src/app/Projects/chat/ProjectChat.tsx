import {
  Box,
  Container,
  DialogTitle,
  DialogContent,
  Dialog,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  LoadingIndicator,
  MessageList,
  Thread,
  useMessageContext,
  Window,
  useChannelStateContext,
  VirtualizedMessageList,
  MessageInput,
} from "stream-chat-react";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import Messages from "./Messages";
import CustomMessageInput from "./MessageInput";
import React from "react";

const streamApiKey = process.env.REACT_APP_STREAM_API_KEY!;
const streamAppId = process.env.REACT_APP_STREAM_APP_ID!;
const filters = { type: "messaging", members: { $in: ["ancient-mountain-4"] } };
const sort = { last_message_at: -1 };

const CustomChannelPreview = (props: any) => {
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

const ProjectChat = ({
  projectBidId,
  setChatOpen,
  customerName,
  vendorName,
  chatOpen,
}: {
  projectBidId: string;
  setChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
  customerName: string;
  vendorName: string;
  chatOpen: boolean;
}) => {
  const { user } = useContext(AuthContext);
  const [chatClient, setChatClient] = useState(null as any);
  const [channel, setChannel] = useState(null as any);
  const messagesRef = useRef<HTMLUListElement | null>(null);
  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance(streamApiKey);

      await client.connectUser(
        {
          id: user!.companyId,
          name: user!.isVendor ? vendorName : customerName,
          // image:
          //   "https://getstream.io/random_png/?id=ancient-mountain-4&name=ancient-mountain-4",
        },
        user!.chatToken
      );
      const channel = client.channel("messaging", projectBidId, {
        name: `Channel for ${customerName} & ${vendorName}`,
      });

      // Here, 'travel' will be the channel ID
      channel.addMembers([user!.companyId]);
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
  if (!chatOpen) return null;

  return (
    <Dialog
      open={chatOpen}
      onClose={() => setChatOpen(false)}
      maxWidth="xl"
      fullWidth={true}
    >
      <DialogTitle sx={{ borderBottom: "1px solid black" }}>{`Chat with ${
        user!.isVendor ? customerName : vendorName
      }`}</DialogTitle>
      <DialogContent
        sx={{
          paddingBottom: 0,
          overflow: "hidden",
        }}
      >
        <Box sx={{ height: "500px", maxHeight: "500px" }}>
          <Chat client={chatClient} theme="messaging light">
            <Channel channel={channel} Input={CustomMessageInput}>
              <Window>
                <Messages messagesRef={messagesRef} />
              </Window>
              <Thread />
              <MessageInput />
            </Channel>
          </Chat>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectChat;
