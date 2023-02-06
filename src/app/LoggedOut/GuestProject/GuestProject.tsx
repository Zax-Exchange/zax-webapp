import { CheckCircleOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { validate } from "email-validator";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { ProjectCreationMode, ProjectStatus } from "../../../generated/graphql";
import { useGetProjectDetailQuery } from "../../gql/get/project/project.generated";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import FullScreenLoading from "../../Utils/Loading";
import GuestAdvancedCreate from "./GuestAdvanceCreate";
import GuestEditProject from "./GuestEditProject";

const GuestProject = () => {
  const intl = useIntl();
  const { projectId } = useParams();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const {
    loading: getProjectDetailLoading,
    data: getProjectDetailData,
    error: getProjectDetailError,
  } = useGetProjectDetailQuery({
    variables: {
      data: {
        projectId: projectId || "",
      },
    },
    fetchPolicy: "no-cache",
  });

  const [creationMode, setCreationMode] = useState(
    ProjectCreationMode.Advanced
  );
  const [email, setEmail] = useState("");

  // TODO: check email before GETing project data (check both email and project exist)
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailVerifyFailed, setEmailVerifyFailed] = useState(false);

  const [projectCreated, setProjectCreated] = useState(false);
  const [projectUpdated, setProjectUpdated] = useState(false);

  useEffect(() => {
    if (getProjectDetailError) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [getProjectDetailError]);

  // TODO: should verify email before GETing the project since project data can be inspected through network tab
  const verifyEmail = () => {
    if (getProjectDetailData && getProjectDetailData.getProjectDetail) {
      if (getProjectDetailData.getProjectDetail.guestEmail === email) {
        setEmailVerified(true);
      } else {
        setEmailVerifyFailed(true);
      }
    }
  };

  const onEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      verifyEmail();
    }
  };
  const renderCreationModeDropdown = () => {
    return (
      <Box>
        <FormControl sx={{ m: 1, minWidth: 180 }}>
          <InputLabel id="guest-create-creationMode-select">
            {intl.formatMessage({
              id: "app.project.attribute.creationMode",
            })}
          </InputLabel>
          <Select
            value={creationMode}
            labelId="guest-create-creationMode-select"
            label={intl.formatMessage({
              id: "app.project.attribute.creationMode",
            })}
            onChange={(e) =>
              setCreationMode(e.target.value as ProjectCreationMode)
            }
          >
            <MenuItem value={ProjectCreationMode.Guided}>
              {intl.formatMessage({
                id: "app.customer.createProject.guidedCreate",
              })}
            </MenuItem>
            <MenuItem value={ProjectCreationMode.Advanced}>
              {intl.formatMessage({
                id: "app.customer.createProject.advancedCreate",
              })}
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  };

  if (getProjectDetailLoading) {
    return <FullScreenLoading />;
  }

  if (!emailVerified) {
    return (
      <Dialog open={true} maxWidth="sm" fullWidth>
        <DialogTitle>
          {intl.formatMessage({ id: "app.guestProject.verifyModal.title" })}
        </DialogTitle>
        <DialogContent>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            label={intl.formatMessage({ id: "app.general.email" })}
            error={!!emailVerifyFailed}
            helperText={
              emailVerifyFailed
                ? intl.formatMessage({
                    id: "app.guestProject.verifyModal.verify.error",
                  })
                : intl.formatMessage({
                    id: "app.guestProject.verifyModal.helperText",
                  })
            }
            sx={{ mt: 2, width: "100%" }}
            onKeyDown={onEnter}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={verifyEmail}
            variant="contained"
            disabled={!validate(email)}
            sx={{ mr: 2, mb: 2 }}
          >
            {intl.formatMessage({
              id: "app.guestProject.verifyModal.verify",
            })}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  let res: JSX.Element | null = null;
  if (getProjectDetailData && getProjectDetailData.getProjectDetail) {
    if (
      getProjectDetailData.getProjectDetail.status === ProjectStatus.Incomplete
    ) {
      if (creationMode === ProjectCreationMode.Advanced) {
        res = (
          <>
            {/* {renderCreationModeDropdown()} */}
            <GuestAdvancedCreate
              setProjectCreated={setProjectCreated}
              projectId={projectId!}
            />
          </>
        );
      } else {
      }
    } else {
      res = (
        <GuestEditProject
          setProjectUpdated={setProjectUpdated}
          projectId={projectId!}
        />
      );
    }
  }

  if (projectCreated) {
    return (
      <>
        <CheckCircleOutline color="success" fontSize="large" />
        <Box>
          <Typography variant="subtitle2">
            {intl.formatMessage({ id: "app.guestProject.created" })}
          </Typography>
        </Box>
      </>
    );
  }

  if (projectUpdated) {
    return (
      <>
        <CheckCircleOutline color="success" fontSize="large" />
        <Box>
          <Typography variant="subtitle2">
            {intl.formatMessage({ id: "app.guestProject.updated" })}
          </Typography>
        </Box>
      </>
    );
  }
  return res;
};

export default GuestProject;
