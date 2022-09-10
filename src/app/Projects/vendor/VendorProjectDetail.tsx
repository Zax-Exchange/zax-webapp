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

  const renderComponentSpecDetailTable = (spec: ProjectComponentSpec) => {
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
                  <MuiListItem sx={{ padding: 0 }}>
                    <Typography variant="caption">{process}</Typography>
                  </MuiListItem>
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
                  <MuiListItem sx={{ padding: 0 }}>
                    <Typography variant="caption">{process}</Typography>
                  </MuiListItem>
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
                  <MuiListItem sx={{ padding: 0 }}>
                    <Typography variant="caption">{process}</Typography>
                  </MuiListItem>
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

  const renderProjectDetail = () => {
    if (!getVendorProjectData || !getVendorProjectData.getVendorProject)
      return null;

    const {
      name: projectName,
      deliveryDate,
      deliveryAddress,
      budget,
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
        <Grid container className="vendor-project-info-container" spacing={2}>
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
                    sx={{ color: theme.palette.primary.dark }}
                  />
                </Tooltip>
              </IconButton>
              <Stack>
                <ProjectListItem>
                  <Typography variant="subtitle2">Customer Name</Typography>
                  <Typography variant="caption" component="p">
                    {customerName}
                  </Typography>
                </ProjectListItem>
                <ProjectListItem>
                  <Typography variant="subtitle2">Project Name</Typography>
                  <Typography variant="caption" component="p">
                    {projectName}
                  </Typography>
                </ProjectListItem>
                <ProjectListItem>
                  <Typography variant="subtitle2">Delivery Date</Typography>
                  <Typography variant="caption" component="p">
                    {deliveryDate}
                  </Typography>
                </ProjectListItem>
                <ProjectListItem>
                  <Typography variant="subtitle2">Delivery Address</Typography>
                  <Typography variant="caption" component="p">
                    {deliveryAddress}
                  </Typography>
                </ProjectListItem>
                <ProjectListItem>
                  <Typography variant="subtitle2">Budget</Typography>
                  <Typography variant="caption" component="p">
                    {budget}
                  </Typography>
                </ProjectListItem>

                {design && (
                  <ProjectListItem>
                    <Typography variant="subtitle2">Design File</Typography>
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
                              Component Detail
                            </Typography>
                          </Box>
                          {renderComponentSpecDetailTable(comp.componentSpec)}
                        </Box>

                        <Box mt={3}>
                          <Box>
                            <Typography variant="subtitle1" textAlign="left">
                              Bid Detail
                            </Typography>
                          </Box>
                          <TableContainer>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Quantity</TableCell>
                                  <TableCell>Price</TableCell>
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
                // <>
                //   <Paper>
                //     <List>
                //       <ListItem>
                //         <Typography>name: {comp.name}</Typography>
                //       </ListItem>
                //       <ListItem>
                //         <Typography>
                //           product: {comp.componentSpec.productName}
                //         </Typography>
                //       </ListItem>
                //       <ListItem>
                //         <Typography>
                //           dimension: {comp.componentSpec.dimension}
                //         </Typography>
                //       </ListItem>
                //       <ListItem>
                //         <Typography>Bids</Typography>
                //       </ListItem>
                //     </List>
                //     {bids[comp.id].map((qp, i) => {
                //       return (
                //         <List className="quantity-price-container">
                //           <ListItem>
                //             <Typography className="quantity">
                //               Quantity: {qp.quantity}
                //             </Typography>
                //           </ListItem>
                //           <ListItem>
                //             <Typography className="price">
                //               Price: {qp.price}
                //             </Typography>
                //           </ListItem>
                //         </List>
                //       );
                //     })}
                //   </Paper>
                // </>
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
