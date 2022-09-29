import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  ListItem,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { AuthContext } from "../../../../../context/AuthContext";
import {
  CreateProjectInput,
  ProjectCreationMode,
} from "../../../../../generated/graphql";
import { useCreateProjectMutation } from "../../../../gql/create/project/project.generated";
import useCustomSnackbar from "../../../../Utils/CustomSnackbar";
import {
  isValidAlphanumeric,
  isValidInt,
} from "../../../../Utils/inputValidators";
import { CUSTOMER_ROUTES } from "../../../../constants/loggedInRoutes";
import { useNavigate } from "react-router-dom";
import GuidedGeneralSpec from "./GuidedGeneralSpec";
import GuidedOutsideSpec from "./GuidedOutsideSpec";
import GuidedInsideSpec from "./GuidedInsideSpec";
import GuidedReview from "./GuidedReview";

enum GuidedView {
  GENERAL_SPEC = "GENERAL_SPEC",
  OUTSIDE_SPEC = "OUTSIDE_SPEC",
  INSIDE_SPEC = "INSIDE_SPEC",
  REVIEW = "REVIEW",
}

export default function GuidedCreateProject() {
  const intl = useIntl();
  const GUIDED_CREATE_PROJECT_STEPS = [
    intl.formatMessage({
      id: "app.customer.createProject.guidedCreate.step.generalSpec",
    }),
    intl.formatMessage({
      id: "app.customer.createProject.guidedCreate.step.outsideSpec",
    }),
    intl.formatMessage({
      id: "app.customer.createProject.guidedCreate.step.insideSpec",
    }),
    intl.formatMessage({
      id: "app.customer.createProject.guidedCreate.step.review",
    }),
  ];
  const { user } = useContext(AuthContext);
  const [activeStep, setActiveStep] = useState(0);
  const [currentView, setCurrentView] = useState(GuidedView.GENERAL_SPEC);

  const [projectData, setProjectData] = useState<CreateProjectInput>({
    userId: user!.id,
    creationMode: ProjectCreationMode.Guided,
    name: "",
    deliveryAddress: "",
    category: "",
    totalWeight: "",
    deliveryDate: new Date().toISOString().split("T")[0],
    targetPrice: 0,
    orderQuantities: [],
    designId: "",
    comments: "",
    components: [],
  });

  useEffect(() => {
    switch (activeStep) {
      case 0:
        setCurrentView(GuidedView.GENERAL_SPEC);
        break;
      case 1:
        setCurrentView(GuidedView.OUTSIDE_SPEC);
        break;
      case 2:
        setCurrentView(GuidedView.INSIDE_SPEC);
        break;
      case 3:
        setCurrentView(GuidedView.REVIEW);
        break;
    }
  }, [activeStep]);

  const renderCurrentView = () => {
    if (currentView === GuidedView.GENERAL_SPEC) {
      return (
        <GuidedGeneralSpec
          setProjectData={setProjectData}
          projectData={projectData}
          setActiveStep={setActiveStep}
          activeStep={activeStep}
        />
      );
    }
    if (currentView === GuidedView.OUTSIDE_SPEC) {
      return (
        <GuidedOutsideSpec
          setProjectData={setProjectData}
          projectData={projectData}
          setActiveStep={setActiveStep}
          activeStep={activeStep}
        />
      );
    }
    if (currentView === GuidedView.INSIDE_SPEC) {
      return (
        <GuidedInsideSpec
          setProjectData={setProjectData}
          projectData={projectData}
          setActiveStep={setActiveStep}
          activeStep={activeStep}
        />
      );
    }
    if (currentView === GuidedView.REVIEW) {
      return (
        <GuidedReview
          setProjectData={setProjectData}
          projectData={projectData}
          setActiveStep={setActiveStep}
          activeStep={activeStep}
        />
      );
    }
  };
  return (
    <Container maxWidth="md">
      <Stepper activeStep={activeStep}>
        {GUIDED_CREATE_PROJECT_STEPS.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box mt={3}>
        <Paper sx={{ padding: 8, pb: 4 }}>
          <Container maxWidth="md">{renderCurrentView()}</Container>
        </Paper>
      </Box>
    </Container>
  );
}
