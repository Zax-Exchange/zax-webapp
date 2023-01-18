import { ChangeCircle } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { CreateProjectComponentSpecInput } from "../../../../../../../generated/graphql";
import { TranslatableAttribute } from "../../../../../../../type/common";
import { productValueToLabelMap } from "../../../../../../constants/products";
import GuidedCreateBoxStyleSelection from "../../../guided/modals/GuidedCreateBoxStyleSelection";

const BoxStyleDropdown = ({
  setComponentSpec,
  componentSpec,
}: {
  setComponentSpec: React.Dispatch<
    React.SetStateAction<CreateProjectComponentSpecInput>
  >;
  componentSpec: CreateProjectComponentSpecInput;
}) => {
  const intl = useIntl();
  const [boxStyleModalOpen, setBoxStyleModalOpen] = useState(false);

  return (
    <>
      <Box>
        {componentSpec.boxStyle ? (
          <Box>
            <Typography variant="caption">
              {intl.formatMessage({
                id: productValueToLabelMap[componentSpec.boxStyle].labelId,
              })}
            </Typography>
            <IconButton
              onClick={() => setBoxStyleModalOpen(true)}
              color="primary"
            >
              <ChangeCircle />
            </IconButton>
          </Box>
        ) : (
          <Button variant="outlined" onClick={() => setBoxStyleModalOpen(true)}>
            {intl.formatMessage({
              id: "app.customer.createProject.selectBoxStyle",
            })}
          </Button>
        )}
      </Box>
      <Dialog
        open={boxStyleModalOpen}
        onClose={() => setBoxStyleModalOpen(false)}
        maxWidth="md"
      >
        <GuidedCreateBoxStyleSelection
          productName={componentSpec.productName}
          setComponentSpec={setComponentSpec}
          setBoxStyleModalOpen={setBoxStyleModalOpen}
        />
      </Dialog>
    </>
  );
};

export default BoxStyleDropdown;
