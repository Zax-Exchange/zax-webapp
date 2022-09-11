import {
  Grid,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  IconButton,
  Button,
  Link,
  TableRow,
  TableCell,
  Stack,
  TableContainer,
  Table,
  TableBody,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import VendorBidOverview from "./VendorBidOverview";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import FullScreenLoading from "../../Utils/Loading";
import { ProjectOverviewListItem } from "./CustomerProjectOverview";
import styled from "@emotion/styled";
import {
  CreateProjectComponentSpecInput,
  ProjectBid,
  ProjectComponent,
  ProjectComponentSpec,
} from "../../../generated/graphql";
import React from "react";
import { CUSTOMER_ROUTES } from "../../constants/loggedInRoutes";
import { useGetCustomerProjectQuery } from "../../gql/get/customer/customer.generated";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

const CustomerProjectDetail = () => {
  const { projectId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [currentTab, setCurrentTab] = useState(0);
  const { data, loading, error, refetch } = useGetCustomerProjectQuery({
    variables: {
      data: {
        projectId: projectId || "",
        userId: user!.id,
      },
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (error) {
      setSnackbar({
        message: "Could not load your project. Please try again later.",
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [error]);

  const componentTabOnChange = (
    event: React.SyntheticEvent,
    newTab: number
  ) => {
    setCurrentTab(newTab);
  };
  const getComponentName = (
    componentId: string,
    components: ProjectComponent[]
  ) => {
    const comp = components.find((comp) => comp.id === componentId);
    if (comp) return comp.name;
  };

  const convertToDate = (timestamp: string) => {
    return new Date(parseInt(timestamp, 10)).toISOString().slice(0, 10);
  };

  const backButtonHandler = () => {
    navigate(CUSTOMER_ROUTES.PROJECTS);
  };

  const renderComponentSpecAccordionDetail = (spec: ProjectComponentSpec) => {
    const {
      productName,
      dimension,
      thickness,
      flute,
      color,
      manufacturingProcess,
      material,
      materialSource,
      postProcess,
      finish,
      outsideMaterial,
      outsideMaterialSource,
      outsidePostProcess,
      outsideFinish,
      outsideColor,
      insideMaterial,
      insideMaterialSource,
      insidePostProcess,
      insideFinish,
      insideColor,
    } = spec;

    const res: JSX.Element[] = [];

    // for (let key in spec) {

    if (productName) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Product</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="caption">{productName}</Typography>
          </TableCell>
        </TableRow>
      );
    }
    if (dimension) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Dimension</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="caption">{dimension}</Typography>
          </TableCell>
        </TableRow>
      );
    }
    if (thickness) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Thickness</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{thickness}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (flute) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Flute</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{flute}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (color) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Color</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{color}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (manufacturingProcess) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Manufacturing Process</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{manufacturingProcess}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (material) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Material</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{material}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (materialSource) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Material Source</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{materialSource}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (postProcess && postProcess.length) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Post Process</Typography>
          </TableCell>

          <TableCell>
            <Stack>
              {postProcess.map((process) => {
                return (
                  <ListItem sx={{ padding: 0 }}>
                    <Typography variant="caption">{process}</Typography>
                  </ListItem>
                );
              })}
            </Stack>
          </TableCell>
        </TableRow>
      );
    }

    if (finish) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Finish</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{finish}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (outsideMaterial) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Outside Material</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{outsideMaterial}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (outsideMaterialSource) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Outside Material Source</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{outsideMaterialSource}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (outsidePostProcess && outsidePostProcess.length) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Outside Post Process</Typography>
          </TableCell>

          <TableCell>
            <Stack>
              {outsidePostProcess.map((process) => {
                return (
                  <ListItem sx={{ padding: 0 }}>
                    <Typography variant="caption">{process}</Typography>
                  </ListItem>
                );
              })}
            </Stack>
          </TableCell>
        </TableRow>
      );
    }

    if (outsideFinish) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Outside Finish</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{outsideFinish}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (outsideColor) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Outside Color</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{outsideColor}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (insideMaterial) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Inside Material</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{insideMaterial}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (insideMaterialSource) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Inside Material Source</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{insideMaterialSource}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (insidePostProcess && insidePostProcess.length) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Inside Post Process</Typography>
          </TableCell>

          <TableCell>
            <Stack>
              {insidePostProcess.map((process) => {
                return (
                  <ListItem sx={{ padding: 0 }}>
                    <Typography variant="caption">{process}</Typography>
                  </ListItem>
                );
              })}
            </Stack>
          </TableCell>
        </TableRow>
      );
    }

    if (insideFinish) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Inside Finish</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{insideFinish}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (insideColor) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Inside Color</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{insideColor}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    return (
      <TableContainer>
        <Table size="small">
          <TableBody>{res}</TableBody>
        </Table>
      </TableContainer>
    );
  };

  if (loading) {
    return <FullScreenLoading />;
  }

  if (error) {
    return (
      <Container>
        <Typography variant="subtitle2">
          Cannot load your project at this time.
        </Typography>
      </Container>
    );
  }

  const projectData = data?.getCustomerProject;
  const bids = projectData?.bids;

  if (projectData) {
    return (
      <Container>
        <Container disableGutters style={{ textAlign: "left" }}>
          <IconButton onClick={backButtonHandler}>
            <KeyboardBackspaceIcon />
          </IconButton>
        </Container>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box>
              <Typography variant="h6" textAlign="left">
                Vendor Bids
              </Typography>
            </Box>
            <List sx={{ maxHeight: 500, overflow: "scroll" }}>
              {bids &&
                bids.map((bid) => {
                  return (
                    <>
                      <ListItem>
                        <VendorBidOverview
                          bid={bid as ProjectBid}
                          projectComponents={
                            projectData.components as ProjectComponent[]
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <VendorBidOverview
                          bid={bid as ProjectBid}
                          projectComponents={
                            projectData.components as ProjectComponent[]
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <VendorBidOverview
                          bid={bid as ProjectBid}
                          projectComponents={
                            projectData.components as ProjectComponent[]
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <VendorBidOverview
                          bid={bid as ProjectBid}
                          projectComponents={
                            projectData.components as ProjectComponent[]
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <VendorBidOverview
                          bid={bid as ProjectBid}
                          projectComponents={
                            projectData.components as ProjectComponent[]
                          }
                        />
                      </ListItem>
                    </>
                  );
                })}
            </List>
          </Grid>
          <Grid item xs={8}>
            <Box>
              <Typography variant="h6" textAlign="left">
                Project Detail
              </Typography>
            </Box>
            <Paper sx={{ padding: 3 }} elevation={1}>
              <List>
                <ProjectDetailListItem>
                  <Typography variant="subtitle2">Project Name</Typography>
                  <Typography variant="caption">{projectData.name}</Typography>
                </ProjectDetailListItem>
                {/* <ProjectDetailListItem>
                  <Typography variant="subtitle2">Posted By</Typography>
                  <Typography variant="caption">{projectData.userId}</Typography>
                </ProjectDetailListItem> */}
                <ProjectDetailListItem>
                  <Typography variant="subtitle2">Delivery Date</Typography>
                  <Typography variant="caption">
                    {projectData.deliveryDate}
                  </Typography>
                </ProjectDetailListItem>
                <ProjectDetailListItem>
                  <Typography variant="subtitle2">Delivery Address</Typography>
                  <Typography variant="caption">
                    {projectData.deliveryAddress}
                  </Typography>
                </ProjectDetailListItem>

                {projectData.design && (
                  <ProjectDetailListItem>
                    <Typography variant="subtitle2">Design</Typography>

                    <Link
                      href={projectData.design.url}
                      target="_blank"
                      rel="noopener"
                    >
                      {projectData.design.fileName}
                    </Link>
                  </ProjectDetailListItem>
                )}
                <ProjectDetailListItem>
                  <Typography variant="subtitle2">Target Price</Typography>
                  <Typography variant="caption">
                    {projectData.targetPrice}
                  </Typography>
                </ProjectDetailListItem>
                <ProjectDetailListItem>
                  <Typography variant="subtitle2">Order Quantities</Typography>
                  <Typography variant="caption">
                    {projectData.orderQuantities.join(", ")}
                  </Typography>
                </ProjectDetailListItem>
                <ProjectDetailListItem>
                  <Typography variant="subtitle2">Posted on</Typography>
                  <Typography variant="caption">
                    {convertToDate(projectData.createdAt)}
                  </Typography>
                </ProjectDetailListItem>
              </List>
            </Paper>

            <Box mt={5}>
              <Typography variant="h6" textAlign="left">
                Components Detail
              </Typography>
            </Box>
            <Paper sx={{ mt: 1 }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={currentTab} onChange={componentTabOnChange}>
                  {projectData.components.map((comp, i) => {
                    return <Tab label={comp.name} key={i} />;
                  })}
                </Tabs>
              </Box>
              {projectData.components.map((comp, i) => {
                return (
                  <TabPanel value={currentTab} index={i}>
                    {renderComponentSpecAccordionDetail(comp.componentSpec)}
                  </TabPanel>
                );
              })}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
  return null;
};

export default CustomerProjectDetail;

// <Stack sx={{ marginTop: 4 }}>
//   {projectData.components.map((comp, i) => {
//     return (
//       <ListItem sx={{ padding: 0, mb: 2 }} key={i}>
//         <Accordion sx={{ flexGrow: 2 }}>
//           <AccordionSummary
//             key={i}
//             expandIcon={<ExpandMoreIcon />}
//             id={`component-summary-${i}`}
//           >
//             <Typography variant="subtitle2">
//               {comp.name}
//             </Typography>
//           </AccordionSummary>

//           <AccordionDetails>
//             {renderComponentSpecAccordionDetail(
//               comp.componentSpec
//             )}
//           </AccordionDetails>
//         </Accordion>
//       </ListItem>
//     );
//   })}
// </Stack>
