import {
  Box,
  Container,
  DialogTitle,
  DialogContent,
  Dialog,
  Paper,
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
import "./Chat.scss";
import { envConfig as config } from "../../Config/EnvConfig";
import { client } from "../../../ApolloClient/client";

const streamApiKey = config.streamApiKey;
const streamAppId = config.streamAppId;
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

  const logo =
    "https://st4.depositphotos.com/3265223/21282/v/600/depositphotos_212821870-stock-illustration-default-avatar-photo-placeholder-profile.jpg";

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance(streamApiKey);

      await client.connectUser(
        {
          id: user!.companyId,
          name: user!.isVendor ? vendorName : customerName,
          image: logo,
        },
        user!.chatToken
      );
      const channel = client.channel("messaging", projectBidId, {
        name: `Channel for ${customerName} & ${vendorName}`,
      });

      channel.addMembers([user!.companyId]);
      const data = await channel.watch();

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

  // Use this so we can pass props into CustomMessageInput if needed.
  const getCustomeMessageInput = () => {
    return <CustomMessageInput />;
  };

  if (!chatClient) {
    return null;
  }
  if (!chatOpen) return null;

  return (
    <Dialog
      open={chatOpen}
      onClose={() => setChatOpen(false)}
      maxWidth="xl"
      fullWidth={true}
    >
      <Box sx={{ boxShadow: "0px 1px 4px 0px rgb(168 168 168 / 75%)" }}>
        <DialogTitle>
          {`Chat with ${user!.isVendor ? customerName : vendorName}`}
        </DialogTitle>
      </Box>
      <DialogContent
        sx={{
          padding: 0,
          overflow: "hidden",
        }}
      >
        <Box sx={{ height: "500px", maxHeight: "500px" }}>
          <Chat client={chatClient} theme="messaging light">
            <Channel channel={channel} Input={getCustomeMessageInput}>
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
