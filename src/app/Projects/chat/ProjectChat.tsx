import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import { Messages } from "./Messages";
import React from "react";
import "./Chat.scss";
import { ChatData, ChatApi } from "./ChatApi";
import { AuthContext } from "../../../context/AuthContext";

const ProjectChat = ({
  projectBidId,
}: {
  projectBidId: string;
}) => {
  const { user } = useContext(AuthContext);
  const [chat, setChat] = useState<ChatData|null>(null)

  // fetch chat and set chat
  useEffect(() => {
    const init = async () => {
      if (user!=null) {
        var chat = await ChatApi.createOrGetChatByProjectBidId(projectBidId);
        chat = await ChatApi.addUserToChat(chat.id, user.id, user.name);
        setChat(chat);
      }
    };
    init();
  }, [user]);

  return (
    <Box>
      <Messages chat={chat==null? undefined: chat} userId={user?.id}/>
      <MessageInput chatId={chat?.id} userId={user?.id}/>
    </Box>
  );
};

export default ProjectChat;
