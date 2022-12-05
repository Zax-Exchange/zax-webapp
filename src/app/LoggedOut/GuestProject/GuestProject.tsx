import { CheckCircleOutline } from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { ProjectCreationMode, ProjectStatus } from "../../../generated/graphql";
import { useGetProjectDetailQuery } from "../../gql/get/project/project.generated";
import EditProject from "../../Projects/customer/editProject/EditProject";
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

  let res: JSX.Element | null = null;
  if (getProjectDetailData && getProjectDetailData.getProjectDetail) {
    if (
      getProjectDetailData.getProjectDetail.status === ProjectStatus.Incomplete
    ) {
      if (creationMode === ProjectCreationMode.Advanced) {
        res = (
          <>
            {renderCreationModeDropdown()}
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
