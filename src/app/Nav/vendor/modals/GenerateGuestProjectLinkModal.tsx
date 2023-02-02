import { LoadingButton } from "@mui/lab";
import {
  Box,
  Container,
  DialogActions,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { validate } from "email-validator";
import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { AuthContext } from "../../../../context/AuthContext";
import { useCreateGuestProjectLinkMutation } from "../../../gql/create/vendor/vendor.generated";

import useCustomSnackbar from "../../../Utils/CustomSnackbar";

const GenerateGuestProjectLinkModal = ({
  setGenerateGuestProjectLinkModalOpen,
}: {
  setGenerateGuestProjectLinkModalOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}) => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [email, setEmail] = useState("");

  const [createGuestProjectLink, { loading, data, error }] =
    useCreateGuestProjectLinkMutation();

  useEffect(() => {
    if (error) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
    if (data && data.createGuestProjectLink) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.vendor.guestProject.linkSent" }),
        severity: "success",
      });
      setSnackbarOpen(true);
    }
  }, [error, data]);

  const sendGuestProjectLink = async () => {
    try {
      await createGuestProjectLink({
        variables: {
          data: {
            guestEmail: email,
            userId: user!.id,
          },
        },
      });
    } catch (error) {
    } finally {
      setGenerateGuestProjectLinkModalOpen(false);
    }
  };

  return (
    <Container>
      <Box>
        <DialogTitle sx={{ pl: 0 }}>
          {intl.formatMessage({
            id: "app.vendor.guestProject.modal.title",
          })}
        </DialogTitle>
      </Box>
      <Box>
        <TextField
          type="email"
          label={intl.formatMessage({ id: "app.project.attribute.guestEmail" })}
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            width: "100%",
            mt: 1,
          }}
          helperText={intl.formatMessage({
            id: "app.vendor.guestProject.modal.helperText",
          })}
        />
      </Box>
      <DialogActions sx={{ mt: 4 }}>
        <LoadingButton
          loading={loading}
          disabled={!validate(email)}
          onClick={sendGuestProjectLink}
          variant="contained"
        >
          {intl.formatMessage({ id: "app.general.send" })}
        </LoadingButton>
      </DialogActions>
    </Container>
  );
};

export default GenerateGuestProjectLinkModal;
