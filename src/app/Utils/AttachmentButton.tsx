import { AttachFile } from "@mui/icons-material";
import { Chip } from "@mui/material";
import React from "react";

const AttachmentButton = ({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) => {
  return (
    <Chip
      icon={<AttachFile sx={{ fontSize: "16px" }} />}
      label={label}
      onClick={onClick}
    />
  );
};

export default AttachmentButton;
