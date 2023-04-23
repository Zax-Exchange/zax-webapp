import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { validate } from "email-validator";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import useCustomSnackbar from "../../../Utils/CustomSnackbar";
import { useSendVendorSignupInvitationMutation } from "../../../gql/utils/company/company.generated";
import { LoadingButton } from "@mui/lab";

const InviteVendorToSignupModal = ({
  setInviteVendorToSignupOpen,
}: {
  setInviteVendorToSignupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const intl = useIntl();
  const [email, setEmail] = useState("");
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  const [sendInvitation, { loading, data, error }] =
    useSendVendorSignupInvitationMutation();
  useEffect(() => {
    if (data) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.success" }),
        severity: "success",
      });
      setSnackbarOpen(true);
      setInviteVendorToSignupOpen(false);
    }
  }, [data]);
  useEffect(() => {
    if (error) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [error]);

  const sendInvite = async () => {
    await sendInvitation({
      variables: {
        data: {
          email,
        },
      },
    });
  };

  return (
    <>
      <DialogContent>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box>
            <TextField
              placeholder="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ width: "20rem" }}
            />
          </Box>
          <Box sx={{ ml: 1.5 }}>
            <LoadingButton
              variant="contained"
              disabled={!validate(email)}
              onClick={sendInvite}
              loading={loading}
            >
              {intl.formatMessage({
                id: "app.customer.projectDetail.inviteVendors.invite",
              })}
            </LoadingButton>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ m: 2 }}>
        <Button
          variant="outlined"
          onClick={() => setInviteVendorToSignupOpen(false)}
        >
          {intl.formatMessage({
            id: "app.general.cancel",
          })}
        </Button>
      </DialogActions>
    </>
  );
};

export default InviteVendorToSignupModal;
