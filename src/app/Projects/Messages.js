import { Box, List, ListItem, Typography } from '@mui/material';
import React from 'react'
import {
  useChannelStateContext,
} from "stream-chat-react";

const Messages = () => {
  const { messages } = useChannelStateContext();

  return (
    <List>
      {messages.map(m => {
        return <Message message={m} />
      })}
    </List>
  );
};

function Message({ message }) {
  return (
    <ListItem sx={{ display: 'block' }}>
      <Box display="flex" sx={{ alignItems: 'center' }}>
        <Typography variant='subtitle2' sx={{ marginRight: '8px' }}>{message.user.name}</Typography>
        <Typography variant='caption'>{message.created_at.toLocaleTimeString()}</Typography>
      </Box>
      <div>{message.text}</div>
    </ListItem>
  )
}

export default Messages
