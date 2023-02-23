import styled from "@emotion/styled";
import { Box, Button, List, Tab, Tabs, Typography } from "@mui/material";
import { TypographyProps } from "@mui/system";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import {
  EVENT_ACTION,
  EVENT_CATEGORY,
  EVENT_LABEL,
} from "../../../../../analytics/constants";
import {
  CreateProjectComponentInput,
  CreateProjectInput,
  ProjectDesign,
  ProjectVisibility,
} from "../../../../../generated/graphql";
import { GENERAL_ROUTES } from "../../../../constants/loggedInRoutes";
import { useCreateProjectMutation } from "../../../../gql/create/project/project.generated";
import useCustomSnackbar from "../../../../Utils/CustomSnackbar";
import FullScreenLoading from "../../../../Utils/Loading";
import ComponentSpecDetail from "../../../common/ComponentSpecDetail";
import { ProjectOverviewListItem } from "../../CustomerProjectOverviewCard";
import {
  GuidedComponentConfigView,
  GuidedCreateComponentsDataContainer,
} from "./GuidedCreateProject";
import ReactGA from "react-ga4";

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
  setProjectCreated,
  additionalComponents,
  additionalComponentsDesigns,
  componentsData,
  projectData,
  componentsDesigns,
  activeStep,
  startingTime,
}: {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setProjectData: Dispatch<SetStateAction<CreateProjectInput>>;
  setProjectCreated: Dispatch<SetStateAction<boolean>>;
  additionalComponents: CreateProjectComponentInput[];
  additionalComponentsDesigns: ProjectDesign[][];
  componentsData: GuidedCreateComponentsDataContainer;
  projectData: CreateProjectInput;
  componentsDesigns: Record<GuidedComponentConfigView, ProjectDesign[] | null>;
  activeStep: number;
  startingTime: number;
}) => {
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
    return (
      Object.values(componentsData).filter(
        (data) => !!data
      ) as CreateProjectComponentInput[]
    ).concat(additionalComponents);
  };

  const createProject = async () => {
    try {
      ReactGA.event({
        action: EVENT_ACTION.CLICK,
        category: EVENT_CATEGORY.PROJECT,
        label: EVENT_LABEL.GUIDED_PROJECT_CREATION_TIME_ELAPSED,
        value: Math.round((performance.now() - startingTime) / 1000),
      });
      await createProjectMutation({
        variables: {
          data: {
            ...projectData,
            name: projectData.name.replace(/\s+/g, " ").trim(),
            components: extractComponentsData(),
          },
        },
      });
      // setProjectCreated(() => true);
      navigate(GENERAL_ROUTES.PROJECTS, { replace: true });

      setSnackbar({
        severity: "success",
        message: intl.formatMessage({
          id: "app.customer.createProject.create.success",
        }),
      });
      setSnackbarOpen(true);
    } catch (e) {
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({ id: "app.general.network.error" }),
      });
      setSnackbarOpen(true);
    }
  };

  const getVisibilityText = (visibility: ProjectVisibility) => {
    switch (visibility) {
      case ProjectVisibility.Private:
        return intl.formatMessage({
          id: "app.project.attribute.visibility.private",
        });
      case ProjectVisibility.Public:
        return intl.formatMessage({
          id: "app.project.attribute.visibility.public",
        });
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
    let compInd = 0;

    const tabs: JSX.Element[] = [];
    const tabPanels: JSX.Element[] = [];

    for (let [view, comp] of Object.entries(componentsData)) {
      if (!comp) continue;

      tabs.push(<Tab label={comp.name} key={compInd} />);
      tabPanels.push(
        <TabPanel value={currentTab} index={compInd}>
          <ComponentSpecDetail
            spec={comp!.componentSpec}
            designs={componentsDesigns[view as GuidedComponentConfigView]}
          />
        </TabPanel>
      );
      compInd++;
    }

    additionalComponents.forEach((comp, i) => {
      tabs.push(<Tab label={comp!.name} key={compInd} />);
      tabPanels.push(
        <TabPanel value={currentTab} index={compInd}>
          <ComponentSpecDetail
            spec={comp!.componentSpec}
            designs={additionalComponentsDesigns[i]}
          />
        </TabPanel>
      );
      compInd++;
    });

    return (
      <>
        <Box>
          <Box mt={5}>
            {renderTypography(
              intl.formatMessage({
                id: "app.customer.projects.projectDetail",
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
                  id: "app.project.attribute.visibility",
                }),
                { variant: "subtitle2" }
              )}
              {renderTypography(getVisibilityText(projectData.visibility), {
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
              {tabs}
            </Tabs>
          </Box>
          {tabPanels}
        </Box>
        <Box display="flex">
          <Typography variant="caption">
            <i>
              *
              {intl.formatMessage({
                id: "app.customer.createProject.guidedCreate.review.componentDetail.helperText",
              })}
            </i>
          </Typography>
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
        <Button variant="text" onClick={handleBack} sx={{ mr: 2 }}>
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
