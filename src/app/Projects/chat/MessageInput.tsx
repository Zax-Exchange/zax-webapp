import { Box, TextField, IconButton } from "@mui/material";
import { Send } from "@mui/icons-material";
import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import { ChatApi } from "./ChatApi";

export default function MessageInput({
  chatId,
  userId,
} : {
  chatId: string | undefined
  userId: string | undefined
}) {
  const theme: any = useTheme();
  const [text, setText] = useState('')

  const sendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (chatId === undefined || userId === undefined) {
      console.log(`could not send message chatId=${chatId} userId=${userId}`)
      return;
    }
    if (text.trim() === "") {
      alert("Enter valid message");
      return;
    }
    await ChatApi.sendMessage(chatId, userId, text);
    setText("");
  }

  const handleTextChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setText(e.target.value);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      if (!e.shiftKey && !e.metaKey) {
        e.preventDefault();
        sendMessage(e);
      }
    }
  };

  const submitDisabled = !Boolean(text);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        paddingTop: 2,
        borderTop: `1px solid ${theme.palette.grey[300]}`,
        position: "sticky",
        bottom: 0,
        backgroundColor: theme.palette.background.default,
        paddingBottom: 3,
        pl: 1,
        pr: 1,
        borderRadius: "4px",
      }}
    >
      <TextField
        multiline
        onKeyDown={handleKeyDown}
        placeholder="Type your message"
        onChange={handleTextChange}
        value={text}
        sx={{ width: "100%", marginRight: 1 }}
      />
      <IconButton disabled={submitDisabled} onClick={sendMessage}>
        <Send />
      </IconButton>
    </Box>
  );
}
