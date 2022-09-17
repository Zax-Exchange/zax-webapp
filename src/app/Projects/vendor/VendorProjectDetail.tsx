import {
  Stack,
  Container,
  Typography,
  Button,
  Paper,
  List,
  DialogActions,
  Grid,
  IconButton,
  Dialog,
  DialogContent,
  Link,
  Box,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableBody,
  Tabs,
  Tab,
  TableHead,
  useTheme,
  Tooltip,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FullScreenLoading from "../../Utils/Loading";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useState } from "react";
import ProjectChat from "../chat/ProjectChat";
import React from "react";
import {
  ProjectBidComponent,
  ProjectComponentSpec,
  QuantityPrice,
} from "../../../generated/graphql";
import { useGetVendorProjectQuery } from "../../gql/get/vendor/vendor.generated";
import { useGetCompanyDetailQuery } from "../../gql/get/company/company.generated";
import MuiListItem from "@mui/material/ListItem";
import styled from "@emotion/styled";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useIntl } from "react-intl";
import ComponentSpecDetail from "../common/ComponentSpecDetail";

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

const ProjectListItem = styled(MuiListItem)(() => ({
  display: "flex",
  justifyContent: "space-between",
  "& .MuiTypography-root:last-child": {
    flexBasis: "65%",
    whiteSpace: "pre-wrap",
  },
}));

const VendorProjectDetail = () => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const theme = useTheme();
  const location = useLocation();
  const { projectId } = useParams();
  const [currentTab, setCurrentTab] = useState(0);
  const navigate = useNavigate();

  const {
    data: getVendorProjectData,
    error: getVendorProjectError,
    loading: getVendorProjectLoading,
    refetch: getVendorProjectRefetch,
  } = useGetVendorProjectQuery({
    variables: {
      data: {
        projectId: projectId!,
        userId: user!.id,
      },
    },
    fetchPolicy: "no-cache",
  });

  const {
    data: getCompanyDetailData,
    error: getCompanyDetailError,
    loading: getCompanyDetailLoading,
  } = useGetCompanyDetailQuery({
    variables: {
      data: {
        companyId: user!.companyId,
      },
    },
  });

  const [chatOpen, setChatOpen] = useState(false);

  const componentTabOnChange = (
    event: React.SyntheticEvent,
    newTab: number
  ) => {
    setCurrentTab(newTab);
  };

  const renderProjectAttributeTitle = (value: string) => {
    return <Typography variant="subtitle2">{value}</Typography>;
  };
  const renderProjectDetail = () => {
    if (!getVendorProjectData || !getVendorProjectData.getVendorProject)
      return null;

    const {
      name: projectName,
      deliveryDate,
      deliveryAddress,
      targetPrice,
      orderQuantities,
      design,
      status,
      components,
      companyId,
      companyName: customerName,
      bidInfo,
    } = getVendorProjectData.getVendorProject;

    const bids: Record<string, QuantityPrice[]> = {};

    bidInfo.components.forEach((comp) => {
      bids[comp.projectComponentId] = comp.quantityPrices;
    });

    if (getVendorProjectLoading || getCompanyDetailLoading) {
      return <FullScreenLoading />;
    }

    if (getVendorProjectError || getCompanyDetailError) {
      return <Typography>Error</Typography>;
    }

    return (
      <>
        <ProjectChat
          setChatOpen={setChatOpen}
          projectBidId={bidInfo.id}
          customerName={customerName}
          vendorName={getCompanyDetailData!.getCompanyDetail!.name}
          chatOpen={chatOpen}
        />
        <Grid container spacing={2}>
          <Grid item xs={5.5}>
            <Paper
              style={{
                padding: "12px",
                marginBottom: "8px",
                position: "relative",
              }}
            >
              <IconButton
                onClick={() => setChatOpen(true)}
                sx={{ position: "absolute", top: 6, right: 6, zIndex: 9 }}
              >
                <Tooltip title="Message Customer" arrow placement="top">
                  <QuestionAnswerIcon
                    sx={{ color: theme.palette.primary.light }}
                  />
                </Tooltip>
              </IconButton>
              <Stack>
                <ProjectListItem>
                  {renderProjectAttributeTitle(
                    intl.formatMessage({
                      id: "app.vendor.project.attribute.customerName",
                    })
                  )}

                  <Typography variant="caption" component="p">
                    {customerName}
                  </Typography>
                </ProjectListItem>
                <ProjectListItem>
                  {renderProjectAttributeTitle(
                    intl.formatMessage({
                      id: "app.project.attribute.name",
                    })
                  )}
                  <Typography variant="caption" component="p">
                    {projectName}
                  </Typography>
                </ProjectListItem>
                <ProjectListItem>
                  {renderProjectAttributeTitle(
                    intl.formatMessage({
                      id: "app.project.attribute.deliveryDate",
                    })
                  )}
                  <Typography variant="caption" component="p">
                    {deliveryDate}
                  </Typography>
                </ProjectListItem>
                <ProjectListItem>
                  {renderProjectAttributeTitle(
                    intl.formatMessage({
                      id: "app.project.attribute.deliveryAddress",
                    })
                  )}
                  <Typography variant="caption" component="p">
                    {deliveryAddress}
                  </Typography>
                </ProjectListItem>
                <ProjectListItem>
                  {renderProjectAttributeTitle(
                    intl.formatMessage({
                      id: "app.project.attribute.orderQuantities",
                    })
                  )}
                  <Typography variant="caption" component="p">
                    {orderQuantities.join(", ")}
                  </Typography>
                </ProjectListItem>
                <ProjectListItem>
                  {renderProjectAttributeTitle(
                    intl.formatMessage({
                      id: "app.project.attribute.targetPrice",
                    })
                  )}
                  <Typography variant="caption" component="p">
                    {targetPrice}
                  </Typography>
                </ProjectListItem>

                {design && (
                  <ProjectListItem>
                    {renderProjectAttributeTitle(
                      intl.formatMessage({
                        id: "app.project.attribute.design",
                      })
                    )}
                    <Typography variant="caption" component="p">
                      <Link href={design.url} target="_blank" rel="noopener">
                        {design.fileName}
                      </Link>
                    </Typography>
                  </ProjectListItem>
                )}
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={6.5}>
            {components.map((comp, i) => {
              if (!bids[comp.id]) return null;
              return (
                <Paper>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={currentTab}
                      onChange={componentTabOnChange}
                      variant="scrollable"
                      scrollButtons="auto"
                    >
                      {components.map((comp, i) => {
                        if (!bids[comp.id]) return null;
                        return <Tab label={comp.name} key={i} />;
                      })}
                    </Tabs>
                  </Box>

                  {components.map((comp, i) => {
                    if (!bids[comp.id]) return null;
                    return (
                      <TabPanel value={currentTab} index={i}>
                        <Box>
                          <Box>
                            <Typography variant="subtitle1" textAlign="left">
                              {intl.formatMessage({
                                id: "app.vendor.projectDetail.componentsDetail",
                              })}
                            </Typography>
                          </Box>
                          <ComponentSpecDetail spec={comp.componentSpec} />
                        </Box>

                        <Box mt={3}>
                          <Box>
                            <Typography variant="subtitle1" textAlign="left">
                              {intl.formatMessage({
                                id: "app.vendor.projectDetail.bidDetail",
                              })}
                            </Typography>
                          </Box>
                          <TableContainer>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>
                                    {intl.formatMessage({
                                      id: "app.bid.attribute.quantity",
                                    })}
                                  </TableCell>
                                  <TableCell>
                                    {intl.formatMessage({
                                      id: "app.bid.attribute.price",
                                    })}
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {bids[comp.id].map((qp, i) => {
                                  return (
                                    <TableRow>
                                      <TableCell>{qp.quantity}</TableCell>
                                      <TableCell>{qp.price}</TableCell>
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                      </TabPanel>
                    );
                  })}
                </Paper>
              );
            })}
          </Grid>
        </Grid>
      </>
    );
  };

  if (getVendorProjectLoading) {
    return <FullScreenLoading />;
  }

  if (getVendorProjectError) {
    return (
      <Container>
        <Button onClick={() => getVendorProjectRefetch()}>try again</Button>
      </Container>
    );
  }
  return (
    <Container>
      <Box textAlign="left">
        <IconButton onClick={() => navigate(-1)}>
          <KeyboardBackspaceIcon style={{ color: "rgb(43, 52, 89)" }} />
        </IconButton>
      </Box>
      {renderProjectDetail()}
    </Container>
  );
};

export default VendorProjectDetail;
