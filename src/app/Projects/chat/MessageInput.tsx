import { Box, Button, Container, TextField, IconButton } from "@mui/material";
import { Send } from "@mui/icons-material";
import React from "react";
import { useMessageInputContext } from "stream-chat-react";
import { Theme, useTheme } from "@emotion/react";

export default function MessageInput() {
  const theme: any = useTheme();

  const { handleSubmit, text, handleChange, setText } =
    useMessageInputContext();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" && (e.shiftKey || e.metaKey)) {
      setText(`${text}\n`);
      e.preventDefault();
    } else if (e.key === "Enter") {
      handleSubmit(e);
      e.preventDefault();
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
      }}
    >
      <TextField
        multiline
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message"
        value={text}
        sx={{ width: "100%", marginRight: 1 }}
      />
      <IconButton disabled={submitDisabled} onClick={handleSubmit}>
        <Send />
      </IconButton>
    </Box>
  );
}
