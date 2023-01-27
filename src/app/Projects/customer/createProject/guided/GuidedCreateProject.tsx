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
  ProjectDesign,
} from "../../../../../generated/graphql";
import { useCreateProjectMutation } from "../../../../gql/create/project/project.generated";
import useCustomSnackbar from "../../../../Utils/CustomSnackbar";
import {
  isValidAlphanumeric,
  isValidInt,
} from "../../../../Utils/inputValidators";
import {
  CUSTOMER_ROUTES,
  GENERAL_ROUTES,
} from "../../../../constants/loggedInRoutes";
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

export type GuidedComponentConfigView =
  | GuidedView.OUTER_BOX
  | GuidedView.INSIDE_TRAY;

// data container to hold component data in each guided view including outerBox, insideTray and other
export type GuidedCreateComponentsDataContainer = Record<
  GuidedComponentConfigView,
  CreateProjectComponentInput | null
>;

export type SetComponentDataArg =
  | CreateProjectComponentInput
  | ((
      prev: CreateProjectComponentInput | null
    ) => CreateProjectComponentInput | null)
  | null;
export type GuidedCreateSetComponentData = (arg: SetComponentDataArg) => void;

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
  const navigate = useNavigate();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [activeStep, setActiveStep] = useState(0);
  const [currentView, setCurrentView] = useState(GuidedView.GENERAL_SPEC);
  const [projectCreated, setProjectCreated] = useState(false);
  const [startingTime, setStartingTime] = useState(performance.now());

  const [projectData, setProjectData] = useState<CreateProjectInput>({
    userId: user!.id,
    creationMode: ProjectCreationMode.Guided,
    name: "",
    deliveryAddress: "",
    country: "",
    category: "",
    totalWeight: "",
    deliveryDate: new Date().toISOString().split("T")[0],
    targetPrice: "",
    orderQuantities: [],
    components: [],
  });

  const [componentsData, setComponentsData] =
    useState<GuidedCreateComponentsDataContainer>({
      [GuidedView.OUTER_BOX]: null,
      [GuidedView.INSIDE_TRAY]: null,
    });

  // useEffect(() => {
  //   if (projectCreated) {
  //     navigate(GENERAL_ROUTES.PROJECTS);
  //     setSnackbar({
  //       severity: "success",
  //       message: intl.formatMessage({
  //         id: "app.customer.createProject.create.success",
  //       }),
  //     });
  //     setSnackbarOpen(true);
  //   }
  //   return () => {
  //     console.log(projectCreated);
  //   };
  // }, [projectCreated]);

  // Storing uploaded designs/artworks locally before creating project so we can still display
  // if user navigates back and forth
  const [componentsDesigns, setComponentsDesigns] = useState<
    Record<GuidedComponentConfigView, ProjectDesign[] | null>
  >({
    [GuidedView.OUTER_BOX]: null,
    [GuidedView.INSIDE_TRAY]: null,
  });

  const [additionalComponents, setAdditionalComponents] = useState<
    CreateProjectComponentInput[]
  >([]);

  const [additionalComponentsDesigns, setAdditionalComponentsDesigns] =
    useState<ProjectDesign[][]>([]);

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

  const deleteAdditionalComponentsDesigns = (
    componentInd: number,
    designInd: number
  ) => {
    const compDesigns = [...additionalComponentsDesigns[componentInd]];
    compDesigns.splice(designInd, 1);
    const allAdditionalDesigns = [...additionalComponentsDesigns];
    allAdditionalDesigns.splice(componentInd, 1, compDesigns);

    setAdditionalComponentsDesigns(allAdditionalDesigns);
  };

  // setComponentsData with injected view value also mimics react setState so caller can use callback and have
  // access to component data's previous state
  const withViewSetComponentData =
    (view: GuidedComponentConfigView) => (arg: SetComponentDataArg) => {
      if (typeof arg === "function") {
        setComponentsData((prev) => ({
          ...prev,
          [view]: arg(prev[view]),
        }));
      } else {
        setComponentsData((prev) => ({
          ...prev,
          [view]: arg,
        }));
      }
    };

  const withViewSetCompoentDesigns =
    (view: GuidedComponentConfigView) => (data: ProjectDesign | null) => {
      setComponentsDesigns((prev) => {
        if (data === null) {
          return {
            ...prev,
            [view]: null,
          };
        }
        const previousFiles = prev[view] ? prev[view] : [];

        return {
          ...prev,
          [view]: [...previousFiles!, data],
        };
      });
    };

  const withViewDeleteComponentDesign =
    (view: GuidedComponentConfigView) => (ind: number) => {
      setComponentsDesigns((prev) => {
        let designs: ProjectDesign[] | null = [...prev[view]!];
        designs.splice(ind, 1);
        if (!designs.length) designs = null;

        return {
          ...prev,
          [view]: designs,
        };
      });
    };

  const renderCurrentView = () => {
    if (currentView === GuidedView.GENERAL_SPEC) {
      return (
        <GuidedGeneralSpec
          setProjectData={setProjectData}
          setActiveStep={setActiveStep}
          projectData={projectData}
          activeStep={activeStep}
        />
      );
    }
    if (currentView === GuidedView.OUTER_BOX) {
      return (
        <GuidedOutsideSpec
          setComponentData={withViewSetComponentData(GuidedView.OUTER_BOX)}
          setProjectData={setProjectData}
          setComponentDesigns={withViewSetCompoentDesigns(GuidedView.OUTER_BOX)}
          deleteComponentDesign={withViewDeleteComponentDesign(
            GuidedView.OUTER_BOX
          )}
          setActiveStep={setActiveStep}
          componentData={componentsData[GuidedView.OUTER_BOX]}
          componentDesigns={componentsDesigns[GuidedView.OUTER_BOX]}
          activeStep={activeStep}
        />
      );
    }
    if (currentView === GuidedView.INSIDE_TRAY) {
      return (
        <GuidedInsideSpec
          setProjectData={setProjectData}
          setComponentData={withViewSetComponentData(GuidedView.INSIDE_TRAY)}
          setComponentDesigns={withViewSetCompoentDesigns(
            GuidedView.INSIDE_TRAY
          )}
          deleteComponentDesign={withViewDeleteComponentDesign(
            GuidedView.INSIDE_TRAY
          )}
          componentDesigns={componentsDesigns[GuidedView.INSIDE_TRAY]}
          componentData={componentsData[GuidedView.INSIDE_TRAY]}
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
          additionalComponents={additionalComponents}
          setAdditionalComponents={setAdditionalComponents}
          additionalComponentsDesigns={additionalComponentsDesigns}
          setAdditionalComponentsDesigns={setAdditionalComponentsDesigns}
          deleteAdditionalComponentsDesigns={deleteAdditionalComponentsDesigns}
          setActiveStep={setActiveStep}
          activeStep={activeStep}
        />
      );
    }
    if (currentView === GuidedView.REVIEW) {
      return (
        <GuidedReview
          setProjectData={setProjectData}
          setActiveStep={setActiveStep}
          setProjectCreated={setProjectCreated}
          activeStep={activeStep}
          projectData={projectData}
          componentsDesigns={componentsDesigns}
          componentsData={componentsData}
          additionalComponents={additionalComponents}
          additionalComponentsDesigns={additionalComponentsDesigns}
          startingTime={startingTime}
        />
      );
    }
  };
  return (
    <Container maxWidth="md">
      <Stepper activeStep={activeStep}>
        {GUIDED_CREATE_PROJECT_STEPS.map((label, index) => {
          return (
            <Step key={index}>
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
