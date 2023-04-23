import { Box, List, ListItem, Typography } from "@mui/material";
import React, { createRef, useEffect, useRef, useState } from "react";
import { ChatApi, ChatData, MessageData } from "./ChatApi";

const DEFAULT_USER_PFP: string = "https://st4.depositphotos.com/3265223/21282/v/600/depositphotos_212821870-stock-illustration-default-avatar-photo-placeholder-profile.jpg";

type MessageUserData = {
  userId: string;
  userName: string;
  userImage: string | undefined;
}

type MessageDataWrapper = {
  isLoading: boolean;
  messages: MessageData[];
  numMessages: number;
}

type MessageDisplayData = {
  userId: string;
  isFromCurrentUser: boolean;
  messageId: number;
  chatId: string;
  timestampString: string;
  timestamp: number;
  message: string;
  userImage: string;
  userName: string;
}

const Messages = ({
  chat,
  userId,
  users,
}: {
  chat: ChatData;
  userId: string;
  users: Map<string,MessageUserData>;
}) => {
  var websocket: WebSocket | null;
  const [messages, setMessages] = useState<MessageDataWrapper>({
    isLoading: false,
    messages: [],
    numMessages: 0,
  });
  const messagesRef = useRef<MessageDataWrapper>();
  messagesRef.current = messages;
  const messageListRef = createRef<HTMLUListElement>();

  useEffect(() => {
    // When the component mounts and we have a projectBidId, we need to fetch the chat details
    // and open a websocket connection

    const getMessages = async (chat: ChatData) => {
      setMessages({isLoading: true, messages: [], numMessages: 0});
      const latestMessages: MessageData[] = await ChatApi.getMessages(chat.id, new Date());
      setMessages({isLoading: false, messages: latestMessages.reverse(), numMessages: latestMessages.length});
    }
    const initWebsocket = async (chat: ChatData) => {
      websocket = ChatApi.subscribeToChat(chat.id, userId,
        (messageSentEvent) => {
          const messages = messagesRef.current;
          if (messages) {
            messages.messages.push(messageSentEvent.message);
            setMessages({
              isLoading: messages.isLoading,
              messages: messages.messages,
              numMessages: messages.messages.length
            });
          }
        }, 
        (closeEvent) => {
          console.log('Socket forcibly closed. Reconnecting in 1 second.', closeEvent.reason);
          setTimeout(() => {
            initWebsocket(chat);
          }, 1000);
        });
    }
  
    if (chat != null) {
      getMessages(chat);
      initWebsocket(chat);
    }

    return () => {
      // When the component unmounts, we need to close the websocket connection
      websocket?.close();
    }
  }, [chat])


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const messageDisplayData: MessageDisplayData[] = messages.messages.map((msg) => {
    const user = users.get(msg.userId)
    const userName = (user === undefined)? "Unknown User" : user.userName;
    const userImage = (user === undefined || user.userImage === undefined)? DEFAULT_USER_PFP : user.userImage;
    return {
      chatId: msg.chatId,
      messageId: msg.messageId,
      message: msg.message,
      userId: msg.userId,
      isFromCurrentUser: msg.userId === userId,
      timestampString: msg.timestamp,
      timestamp: Date.parse(msg.timestamp),
      userImage,
      userName,
    }
  });

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  return (
    <List
      sx={{ maxHeight: "470px", overflowY: "scroll", pt: 0 }}
      ref={messageListRef}
    >
      {messageDisplayData.map((m: MessageDisplayData) => {
        return (
          <Message message={m} key={m.messageId} />
        );
      })}
    </List>
  );
};

function Message({
  message,
}: {
  message: MessageDisplayData;
}) {
  return (
    <ListItem
      disableGutters
      sx={{
        display: "block",
        ":hover": {
          backgroundColor: "#f6f6f6",
        },
        borderRadius: "4px",
      }}
    >
      <Box pl={3} pr={3} display="flex">
        {message && (
          <Box display="flex" sx={{ alignItems: "flex-start" }}>
            <Box display="flex">
              <Box pt="5px">
                <img
                  src={message.userImage==null? "" : message.userImage}
                  height={35}
                  width={35}
                  alt="logo"
                />
              </Box>
            </Box>
          </Box>
        )}
        <Box>
          {message.message && !!message.message.split("\n").length && (
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle2" sx={{ mr: 1, ml: 1 }}>
                {message.userName}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                fontSize="0.7em"
              >
                {message.timestampString}
              </Typography>
            </Box>
          )}
          {message &&
            message.message &&
            message.message.split("\n").map((m, index) => {
              const pKey = `${message.messageId}-${index}`;
              if (!m) {
                return <br key={pKey} />;
              }

              return (
                <Box pl={1}>
                  <Typography key={pKey} variant="body2">
                    {m}
                  </Typography>
                </Box>
              );
            })}
        </Box>
      </Box>
    </ListItem>
  );
}

export {
  MessageDataWrapper,
  MessageDisplayData,
  MessageUserData,
  Messages
};
