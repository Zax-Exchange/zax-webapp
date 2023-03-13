import { Box, DialogTitle, DialogContent, Dialog } from "@mui/material";
import { StreamChat } from "stream-chat";
import { Chat, Channel, Thread, Window, MessageInput } from "stream-chat-react";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import Messages from "./Messages";
import CustomMessageInput from "./MessageInput";
import React from "react";
import "./Chat.scss";
import { envConfig as config } from "../../Config/EnvConfig";

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
  customerName,
  vendorName,
}: {
  projectBidId: string;
  customerName: string;
  vendorName: string;
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

      if (!chatClient) {
        await client.connectUser(
          {
            id: user!.companyId,
            name: user!.isVendor ? vendorName : customerName,
            image: logo,
          },
          user!.chatToken
        );
        setChatClient(client);
      }

      const channel = client.channel("messaging", projectBidId, {
        name: `Channel for ${customerName} & ${vendorName}`,
      });

      channel.addMembers([user!.companyId]);
      await channel.watch();
      setChannel(channel);
    };

    initChat();
  }, [projectBidId]);

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

  return (
    <Box>
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
  );
};

export default ProjectChat;
