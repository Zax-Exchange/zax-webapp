import { Box, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { StreamMessage, useChannelStateContext } from "stream-chat-react";
import { DefaultStreamChatGenerics } from "stream-chat-react/dist/types/types";

const Messages = () => {
  const { messages } = useChannelStateContext();
  console.log({ messages });

  return (
    <List>
      {messages && messages.map((m) => {
        return <Message message={m} key={m.id} />;
      })}
    </List>
  );
};

function Message({ message }: { message: StreamMessage<DefaultStreamChatGenerics>}) {
  return (
    <ListItem disableGutters sx={{ display: "block" }}>
      {message && <Box display="flex" sx={{ alignItems: "center" }}>
        <Typography variant="subtitle2" sx={{ marginRight: "8px" }}>
          {message!.user!.name}
        </Typography>
        <Typography variant="caption">
          {(message!.created_at! as Date).toLocaleTimeString()}
        </Typography>
      </Box>}
      {message && message.text && message.text.split("\n").map((m, index) => {
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
