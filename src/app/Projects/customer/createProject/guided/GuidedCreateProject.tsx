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
  CreateProjectComponentInput,
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
import GuidedOther from "./GuidedOther";

export enum GuidedView {
  GENERAL_SPEC = "GENERAL_SPEC",
  OUTER_BOX = "OUTER_BOX",
  INSIDE_TRAY = "INSIDE_TRAY",
  OTHER = "OTHER",
  REVIEW = "REVIEW",
}

// data container to hold component data in each guided view including outerBox, insideTray and other
export type GuidedComponentConfigViews =
  | GuidedView.OUTER_BOX
  | GuidedView.INSIDE_TRAY
  | GuidedView.OTHER;

export type GuidedCreateComponentsDataContainer = Record<
  GuidedComponentConfigViews,
  CreateProjectComponentInput | null
>;
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
      id: "app.customer.createProject.guidedCreate.step.other",
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

  const [componentsData, setComponentsData] =
    useState<GuidedCreateComponentsDataContainer>({
      [GuidedView.OUTER_BOX]: null,
      [GuidedView.INSIDE_TRAY]: null,
      [GuidedView.OTHER]: null,
    });

  useEffect(() => {
    switch (activeStep) {
      case 0:
        setCurrentView(GuidedView.GENERAL_SPEC);
        break;
      case 1:
        setCurrentView(GuidedView.OUTER_BOX);
        break;
      case 2:
        setCurrentView(GuidedView.INSIDE_TRAY);
        break;
      case 3:
        setCurrentView(GuidedView.OTHER);
        break;
      case 4:
        setCurrentView(GuidedView.REVIEW);
        break;
    }
  }, [activeStep]);

  // setComponentsData with injected view value
  const setComponentDataCallback =
    (view: GuidedComponentConfigViews) =>
    (data: CreateProjectComponentInput | null) => {
      setComponentsData((prev) => ({
        ...prev,
        [view]: data,
      }));
    };

  console.log(componentsData);
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
    if (currentView === GuidedView.OUTER_BOX) {
      return (
        <GuidedOutsideSpec
          componentData={componentsData[GuidedView.OUTER_BOX]}
          setComponentData={setComponentDataCallback(GuidedView.OUTER_BOX)}
          setActiveStep={setActiveStep}
          activeStep={activeStep}
        />
      );
    }
    if (currentView === GuidedView.INSIDE_TRAY) {
      return (
        <GuidedInsideSpec
          componentData={componentsData[GuidedView.INSIDE_TRAY]}
          setComponentData={setComponentDataCallback(GuidedView.INSIDE_TRAY)}
          setActiveStep={setActiveStep}
          activeStep={activeStep}
        />
      );
    }
    if (currentView === GuidedView.OTHER) {
      return (
        <GuidedOther
          isRequired={
            !componentsData[GuidedView.OUTER_BOX] &&
            !componentsData[GuidedView.INSIDE_TRAY]
          }
          componentData={componentsData[GuidedView.OTHER]}
          setComponentData={setComponentDataCallback(GuidedView.OTHER)}
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
