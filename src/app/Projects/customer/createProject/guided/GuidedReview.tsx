import styled from "@emotion/styled";
import {
  Box,
  Button,
  IconButton,
  Link,
  List,
  ListItem,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { TypographyProps } from "@mui/system";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import {
  CreateProjectComponentInput,
  CreateProjectInput,
  ProjectDesign,
} from "../../../../../generated/graphql";
import { CUSTOMER_ROUTES } from "../../../../constants/loggedInRoutes";
import { useCreateProjectMutation } from "../../../../gql/create/project/project.generated";
import useCustomSnackbar from "../../../../Utils/CustomSnackbar";
import FullScreenLoading from "../../../../Utils/Loading";
import ComponentSpecDetail from "../../../common/ComponentSpecDetail";
import { ProjectOverviewListItem } from "../../CustomerProjectOverviewCard";
import {
  GuidedComponentConfigView,
  GuidedCreateComponentsDataContainer,
} from "./GuidedCreateProject";

type TypographyVariant =
  | "button"
  | "caption"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "inherit"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "overline";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`component-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ProjectDetailListItem = styled(ProjectOverviewListItem)(() => ({
  flexDirection: "column",
  alignItems: "flex-start",
}));

const GuidedReview = ({
  setProjectData,
  setActiveStep,
  componentsData,
  projectData,
  componentsDesigns,
  activeStep,
}: {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setProjectData: Dispatch<SetStateAction<CreateProjectInput>>;
  componentsData: GuidedCreateComponentsDataContainer;
  projectData: CreateProjectInput;
  componentsDesigns: Record<GuidedComponentConfigView, ProjectDesign[] | null>;
  activeStep: number;
}) => {
  console.log(componentsData);
  const intl = useIntl();
  const navigate = useNavigate();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [
    createProjectMutation,
    { loading: createProjectLoading, error: createProjectError },
  ] = useCreateProjectMutation();

  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    if (createProjectError) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [createProjectError]);

  const componentTabOnChange = (
    event: React.SyntheticEvent,
    newTab: number
  ) => {
    setCurrentTab(newTab);
  };

  const handleBack = () => {
    setActiveStep((step) => step - 1);
  };

  const extractComponentsData = () => {
    return Object.values(componentsData).filter(
      (data) => !!data
    ) as CreateProjectComponentInput[];
  };

  const createProject = async () => {
    try {
      await createProjectMutation({
        variables: {
          data: {
            ...projectData,
            totalWeight: projectData.totalWeight + " g",
            components: extractComponentsData(),
          },
        },
      });

      navigate(CUSTOMER_ROUTES.PROJECTS);

      setSnackbar({
        severity: "success",
        message: intl.formatMessage({
          id: "app.customer.createProject.create.success",
        }),
      });
    } catch (e) {
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({ id: "app.general.network.error" }),
      });
    } finally {
      setSnackbarOpen(true);
    }
  };

  const renderTypography = (
    value: string | number | number[],
    props: TypographyProps & { variant: TypographyVariant }
  ) => {
    if (Array.isArray(value)) {
      return <Typography {...props}>{value.join(", ")}</Typography>;
    }
    return <Typography {...props}>{value}</Typography>;
  };

  const renderProjectDetail = () => {
    return (
      <>
        <Box>
          <Box mt={5}>
            {renderTypography(
              intl.formatMessage({
                id: "app.customer.createProject.guidedCreate.step.generalSpec",
              }),
              { variant: "h6", textAlign: "left" }
            )}
          </Box>
          <List>
            <ProjectDetailListItem>
              {renderTypography(
                intl.formatMessage({ id: "app.project.attribute.name" }),
                { variant: "subtitle2" }
              )}
              {renderTypography(projectData.name, { variant: "caption" })}
            </ProjectDetailListItem>

            <ProjectDetailListItem>
              {renderTypography(
                intl.formatMessage({ id: "app.project.attribute.category" }),
                { variant: "subtitle2" }
              )}
              {renderTypography(projectData.category, { variant: "caption" })}
            </ProjectDetailListItem>

            <ProjectDetailListItem>
              {renderTypography(
                intl.formatMessage({ id: "app.project.attribute.totalWeight" }),
                { variant: "subtitle2" }
              )}
              {renderTypography(projectData.totalWeight, {
                variant: "caption",
              })}
            </ProjectDetailListItem>

            <ProjectDetailListItem>
              {renderTypography(
                intl.formatMessage({
                  id: "app.project.attribute.deliveryDate",
                }),
                { variant: "subtitle2" }
              )}
              {renderTypography(projectData.deliveryDate, {
                variant: "caption",
              })}
            </ProjectDetailListItem>
            <ProjectDetailListItem>
              {renderTypography(
                intl.formatMessage({
                  id: "app.project.attribute.deliveryAddress",
                }),
                { variant: "subtitle2" }
              )}
              {renderTypography(projectData.deliveryAddress, {
                variant: "caption",
              })}
            </ProjectDetailListItem>

            <ProjectDetailListItem>
              {renderTypography(
                intl.formatMessage({ id: "app.project.attribute.targetPrice" }),
                { variant: "subtitle2" }
              )}
              {renderTypography(projectData.targetPrice, {
                variant: "caption",
              })}
            </ProjectDetailListItem>
            <ProjectDetailListItem>
              {renderTypography(
                intl.formatMessage({
                  id: "app.project.attribute.orderQuantities",
                }),
                { variant: "subtitle2" }
              )}
              {renderTypography(projectData.orderQuantities, {
                variant: "caption",
              })}
            </ProjectDetailListItem>

            <ProjectDetailListItem>
              {renderTypography(
                intl.formatMessage({
                  id: "app.project.attribute.comments",
                }),
                { variant: "subtitle2" }
              )}
              {renderTypography(projectData.comments, {
                variant: "caption",
              })}
            </ProjectDetailListItem>
          </List>
        </Box>

        {/* COMPONENTS SECTION */}
        <Box mt={5}>
          <Typography variant="h6" textAlign="left">
            {intl.formatMessage({
              id: "app.customer.projects.componentsDetail",
            })}
          </Typography>
        </Box>
        <Box>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={currentTab} onChange={componentTabOnChange}>
              {Object.values(componentsData)
                .filter((comp) => !!comp)
                .map((comp, i) => {
                  return <Tab label={comp!.name} key={i} />;
                })}
            </Tabs>
          </Box>
          {Object.entries(componentsData)
            .filter((comp) => !!comp[1])
            .map(([view, comp], i) => {
              return (
                <TabPanel value={currentTab} index={i}>
                  <ComponentSpecDetail
                    spec={comp!.componentSpec}
                    designs={
                      componentsDesigns[view as GuidedComponentConfigView]
                    }
                  />
                </TabPanel>
              );
            })}
        </Box>
      </>
    );
  };

  return (
    <>
      {createProjectLoading && <FullScreenLoading />}
      <Box>
        <Typography variant="h6" textAlign="left">
          {intl.formatMessage({
            id: "app.customer.createProject.guidedCreate.review.title",
          })}
        </Typography>
      </Box>
      <Box>{renderProjectDetail()}</Box>
      <Box mt={3}>
        <Button variant="text" onClick={handleBack} disabled={activeStep === 0}>
          {intl.formatMessage({ id: "app.general.back" })}
        </Button>
        <Button variant="contained" onClick={createProject}>
          {intl.formatMessage({
            id: "app.customer.createProject.guidedCreate.finishAndCreate",
          })}
        </Button>
      </Box>
    </>
  );
};

export default GuidedReview;
