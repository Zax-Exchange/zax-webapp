import { AttachFile } from "@mui/icons-material";
import { Chip } from "@mui/material";
import React from "react";

const AttachmentButton = ({
  onClick,
  label,
  disabled = false,
}: {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}) => {
  return (
    <Chip
      disabled={disabled}
      icon={<AttachFile sx={{ fontSize: "16px" }} />}
      label={label}
      onClick={onClick}
    />
  );
};

export default AttachmentButton;
