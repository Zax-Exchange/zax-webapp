import { Button, Container, TextField } from '@mui/material'
import React from 'react'
import {
  useMessageInputContext,
  SendButton,
  useChannelActionContext,
} from "stream-chat-react";

export default function MessageInput() {
  const { handleSubmit, text, handleChange } = useMessageInputContext()

  console.log({ text })
  return (
    <Container>
      <TextField onChange={handleChange} placeholder='Type your message' value={text} />
      <SendButton sendMessage={handleSubmit}>Send</SendButton>
    </Container>
  )
}
