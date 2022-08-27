import { Box, List, ListItem, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { StreamMessage, useChannelStateContext } from "stream-chat-react";
import { DefaultStreamChatGenerics } from "stream-chat-react/dist/types/types";

const Messages = ({
  messagesRef,
}: {
  messagesRef: React.MutableRefObject<HTMLUListElement | null>;
}) => {
  const { messages } = useChannelStateContext();

  useEffect(() => {
    scrollToBottom();
  }, [messagesRef.current]);

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };
  return (
    <List sx={{ maxHeight: "400px", overflowY: "scroll" }} ref={messagesRef}>
      {messages &&
        messages.map((m) => {
          return (
            <Message message={m} key={m.id} scrollToBottom={scrollToBottom} />
          );
        })}
    </List>
  );
};

function Message({
  message,
  scrollToBottom,
}: {
  message: StreamMessage<DefaultStreamChatGenerics>;
  scrollToBottom: () => void;
}) {
  return (
    <ListItem disableGutters sx={{ display: "block" }}>
      {message && (
        <Box display="flex" sx={{ alignItems: "center" }}>
          <Typography variant="subtitle2" sx={{ marginRight: "8px" }}>
            {message!.user!.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" fontSize="0.7em">
            {(message!.created_at! as Date).toLocaleTimeString()}
          </Typography>
        </Box>
      )}
      {message &&
        message.text &&
        message.text.split("\n").map((m, index) => {
          const pKey = `${message.id}-${index}`;
          if (!m) {
            return <br key={pKey} />;
          }

          return (
            <Typography key={pKey} variant="body2">
              {m}
            </Typography>
          );
        })}
    </ListItem>
  );
}

export default Messages;
