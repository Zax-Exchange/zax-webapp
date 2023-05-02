import { Box, CircularProgress, List, ListItem, Typography } from "@mui/material";
import React, { createRef, useEffect, useRef, useState, UIEvent } from "react";
import { ChatApi, ChatData, ChatUserData, MessageData } from "./ChatApi";

const DEFAULT_USER_PFP: string = "https://st4.depositphotos.com/3265223/21282/v/600/depositphotos_212821870-stock-illustration-default-avatar-photo-placeholder-profile.jpg";

type MessageDataWrapper = {
  isLoading: boolean;
  hasEarlierMessages: boolean;
  messages: MessageData[];
}

type MessageDisplayData = {
  userId: string;
  isFromCurrentUser: boolean;
  messageId: number;
  chatId: string;
  timestamp: number;
  message: string;
  userImage: string;
  userName: string;
}

const Messages = ({
  chat,
  userId,
}: {
  chat: ChatData | undefined;
  userId: string | undefined;
}) => {
  const [messages, setMessages] = useState<MessageDataWrapper>({
    isLoading: false,
    hasEarlierMessages: true,
    messages: [],
  });
  const messageRef = useRef<MessageDataWrapper>(messages)
  const websocketRef = useRef<WebSocket|null>(null);
  const messageListRef = createRef<HTMLUListElement>();

  const userMap = new Map<string,ChatUserData>();
  chat?.users.forEach((user) => {
    userMap.set(user.userId, user)
  });

  const prependMessages = (newMessages: MessageData[]) => {
    const newMessageList = newMessages.concat(messageRef.current.messages);
    const uniqueMessages = [...new Map(newMessageList.map((m) => [m.messageId, m])).values()];
    messageRef.current = {
      isLoading: messageRef.current.isLoading,
      messages: uniqueMessages,
      hasEarlierMessages: messageRef.current.hasEarlierMessages,
    }
    setMessages(messageRef.current);
  }

  const appendMessages = (newMessages: MessageData[]) => {
    const newMessageList = messageRef.current.messages.concat(newMessages);
    const uniqueMessages = [...new Map(newMessageList.map((m) => [m.messageId, m])).values()];
    messageRef.current = {
      isLoading: messageRef.current.isLoading,
      messages: uniqueMessages,
      hasEarlierMessages: messageRef.current.hasEarlierMessages,
    }
    setMessages(messageRef.current);
  }

  const setIsLoading = (isLoading: boolean) => {
    messageRef.current = {
      isLoading: isLoading,
      messages: messageRef.current.messages,
      hasEarlierMessages: messageRef.current.hasEarlierMessages
    }
    setMessages(messageRef.current);
  }

  const setHasEarlierMessages = (hasEarlierMessages: boolean) => {
    messageRef.current = {
      isLoading: messageRef.current.isLoading,
      messages: messageRef.current.messages,
      hasEarlierMessages: hasEarlierMessages
    }
    setMessages(messageRef.current);
  }
    
  const fetchEarlierMessages = async () => {
    if (chat === undefined || userId === undefined) {
      return;
    }
    const beforeDate = new Date();
    var previousFirstMessageId: number|undefined = undefined
    if (messageRef.current.messages.length > 0) {
      beforeDate.setTime(Date.parse(messageRef.current.messages[0].sentAt));
      previousFirstMessageId = messageRef.current.messages[0].messageId;
    }
    setIsLoading(true);
    const fetchedMessages = (await ChatApi.getMessages(chat.id, beforeDate)).reverse();
    prependMessages(fetchedMessages);
    setIsLoading(false);
    const currentFirstMessageId = messageRef.current.messages[0].messageId;
    setHasEarlierMessages(previousFirstMessageId != currentFirstMessageId);
  }

  useEffect(() => {
    // When the component mounts and we have a projectBidId, we need to fetch the chat details
    // and open a websocket connection
    const initWebsocket = async () => {
      if (chat === undefined || userId === undefined) {
        return;
      }
      if (websocketRef.current === null) {
        websocketRef.current = ChatApi.subscribeToChat(chat.id, userId,
          (messageSentEvent) => {
            appendMessages([messageSentEvent.message]);
            scrollToBottom();
          }, 
          (closeEvent) => {
            console.log('Socket forcibly closed. Reconnecting in 1 second.', closeEvent.reason);
            setTimeout(() => {
              initWebsocket();
            }, 1000);
          });
      }
    }
    fetchEarlierMessages();
    initWebsocket();

    return () => {
      // When the component unmounts, we need to close the websocket connection
      if (websocketRef.current !== null) {
        websocketRef.current.close();
        websocketRef.current = null;
      }
    }
  }, [chat]);

  const onScroll = (event: UIEvent<HTMLUListElement>) => {
    const scrolledToTop = messageListRef.current && messageListRef.current.scrollTop === 0;
    const shouldFetchMoreMessages = !messageRef.current.isLoading && messageRef.current.hasEarlierMessages;
    if (scrolledToTop && shouldFetchMoreMessages) {
      fetchEarlierMessages();
    } 
  }

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  const messageDisplayData: MessageDisplayData[] = messages.messages.map((msg) => {
    const user = userMap.get(msg.userId)
    const userName = (user===undefined)? "Unknown User" : user.userName;
    const userImage = (user===undefined || user===null || user.userImage===undefined || user.userImage===null)? DEFAULT_USER_PFP : user.userImage;
    return {
      chatId: msg.chatId,
      messageId: msg.messageId,
      message: msg.message,
      userId: msg.userId,
      isFromCurrentUser: msg.userId === userId,
      timestamp: Date.parse(msg.sentAt),
      userImage,
      userName,
    }
  });

  return (
    <List
      sx={{ minHeight: "400px", maxHeight: "470px", overflowY: "scroll", pt: 0 }}
      ref={messageListRef}
      onScroll={onScroll}
    >
      {
        messages.isLoading && 
          <CircularProgress sx={{height: "55px", width: "55px", padding: "10px"}}/>
      }
      {messageDisplayData.map((m: MessageDisplayData) => {
        return (
          <Message message={m} key={m.messageId}/>
        );
      })}
    </List>
  );
};

function Message({
  message,
}: {
  message: MessageDisplayData,
}) {
  const time = new Date();
  time.setTime(message.timestamp)
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
                  src={message.userImage}
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
                {time.toLocaleString()}
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
  Messages
};
