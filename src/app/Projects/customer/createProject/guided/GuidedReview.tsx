import {
  Box,
  Button,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { CreateProjectInput } from "../../../../../generated/graphql";
import { CUSTOMER_ROUTES } from "../../../../constants/loggedInRoutes";
import { useCreateProjectMutation } from "../../../../gql/create/project/project.generated";
import useCustomSnackbar from "../../../../Utils/CustomSnackbar";

const GuidedReview = ({
  projectData,
  setProjectData,
  activeStep,
  setActiveStep,
}: {
  projectData: CreateProjectInput;
  setProjectData: Dispatch<SetStateAction<CreateProjectInput>>;
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
}) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [createProjectMutation, { loading }] = useCreateProjectMutation();

  const handleBack = () => {
    setProjectData((prev) => {
      // If there are two components, that means user added an inside tray so we remove it if user wants to go back
      if (prev.components.length === 2) {
        const comps = [...prev.components];
        comps.pop();
        return {
          ...prev,
          components: comps,
        };
      }
      return prev;
    });
    setActiveStep((step) => step - 1);
  };

  const createProject = async () => {
    try {
      await createProjectMutation({
        variables: {
          data: {
            ...projectData,
            totalWeight: projectData.totalWeight + " g",
          },
        },
      });

      navigate(CUSTOMER_ROUTES.PROJECTS);

      setSnackbar({
        severity: "success",
        message: "Project created.",
      });
    } catch (e) {
      setSnackbar({
        severity: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setSnackbarOpen(true);
    }
  };
  return (
    <>
      <Box>
        <Typography variant="h6" textAlign="left">
          {intl.formatMessage({
            id: "app.customer.createProject.guidedCreate.review.title",
          })}
        </Typography>
      </Box>
      <Stack></Stack>
      <Box>
        <Button variant="text" onClick={handleBack} disabled={activeStep === 0}>
          {intl.formatMessage({ id: "app.general.back" })}
        </Button>
        <Button variant="text" onClick={createProject}>
          {intl.formatMessage({
            id: "app.customer.createProject.guidedCreate.finishAndCreate",
          })}
        </Button>
      </Box>
    </>
  );
};

export default GuidedReview;
