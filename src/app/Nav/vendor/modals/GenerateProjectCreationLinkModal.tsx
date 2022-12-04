import { Box, Container, DialogTitle, Typography } from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";

const GenerateProjectCreationLinkModal = () => {
  const intl = useIntl();

  return (
    <Box>
      <Box>
        <DialogTitle>
          {intl.formatMessage({
            id: "app.vendor.generateProjectCreationLink.title",
          })}
        </DialogTitle>
      </Box>
      <Box></Box>
    </Box>
  );
};

export default GenerateProjectCreationLinkModal;
