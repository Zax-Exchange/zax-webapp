import { gql, useQuery } from "@apollo/client";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  Container,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Paper,
  Link,
  Stack,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableBody,
  Grid,
  styled,
  Tabs,
  Tab,
  TableHead,
  TextField,
  ClickAwayListener,
} from "@mui/material";
import ProjectBidModal from "../../Projects/vendor/ProjectBidModal";
import { useContext, useEffect, useState } from "react";
import FullScreenLoading from "../../Utils/Loading";
import CustomSnackbar from "../../Utils/CustomSnackbar";
import React from "react";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import {
  Project,
  ProjectComponent,
  ProjectComponentSpec,
} from "../../../generated/graphql";
import { useGetProjectDetailQuery } from "../../gql/get/project/project.generated";
import { SearchProjectDetailLocationState } from "./SearchProjectOverview";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiListItem from "@mui/material/ListItem";
import { VENDOR_ROUTES } from "../../constants/loggedInRoutes";
import { useCreateProjectBidMutation } from "../../gql/create/project/project.generated";
import { isValidInt } from "../../Utils/inputValidators";
import { AuthContext } from "../../../context/AuthContext";

export type QuantityPriceData = {
  quantity: number;
  price: number;
};

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
      style={{ position: "relative" }}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// const EditableTableCell = ({
//   data,
//   index,
//   setComponentsQpData,
//   componentId,
// }: {
//   data: number;
//   index: number;
//   componentId: string;
//   setComponentsQpData: React.Dispatch<
//     React.SetStateAction<Record<string, QuantityPriceData[]>>
//   >;
// }) => {
//   const [value, setValue] = useState(data);
//   const [isEditing, setIsEditing] = useState(false);

//   const qpDataOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     let val: number | string = e.target.value;

//     if (!isValidInt(val)) return;

//     val = parseInt(val, 10) || 0;

//     setComponentsQpData((prev) => {
//       const componentQpList = [...prev[componentId]];
//       const targetQp = componentQpList[index];
//       const prevPrice = targetQp.price;

//       // This makes sure user doesn't change to empty input price
//       targetQp.price = val !== "" ? (val as number) : prevPrice;
//       componentQpList.splice(index, 1, targetQp);
//       return {
//         ...prev,
//         [componentId]: componentQpList,
//       };
//     });
//     setValue(val);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       setIsEditing(false);
//     }
//   };
//   if (isEditing) {
//     return (
//       <ClickAwayListener onClickAway={() => setIsEditing(false)}>
//         <TableCell sx={{ width: "50%" }}>
//           <TextField
//             focused
//             onChange={qpDataOnChange}
//             onKeyDown={handleKeyDown}
//             value={value ? value : ""}
//             size="small"
//           />
//         </TableCell>
//       </ClickAwayListener>
//     );
//   } else {
//     return (
//       <TableCell
//         sx={{
//           width: "50%",
//           cursor: "pointer",
//           ":hover": {
//             backgroundColor: "#eee",
//           },
//           borderRadius: 1,
//         }}
//         onClick={() => setIsEditing(true)}
//       >
//         {value ? value : ""}
//       </TableCell>
//     );
//   }
// };
const ProjectListItem = styled(MuiListItem)(() => ({
  display: "flex",
  justifyContent: "space-between",
  "& .MuiTypography-root:last-child": {
    flexBasis: "65%",
    whiteSpace: "pre-wrap",
  },
}));

const SearchProjectDetail = () => {
  const { user } = useContext(AuthContext);
  const { projectId } = useParams();
  const [currentComponentTab, setCurrentComponentTab] = useState(0);
  const [currentBidTab, setCurrentBidTab] = useState(0);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const {
    data: getProjectDetailData,
    error: getProjectDetailError,
    loading: getProjectDetailLoading,
  } = useGetProjectDetailQuery({
    variables: {
      data: {
        projectId: projectId || "",
      },
    },
  });

  const navigate = useNavigate();
  const [projectBidModalOpen, setProjectBidModalOpen] = useState(false);
  const [biddingComponent, setBiddingComponent] =
    useState<ProjectComponent | null>(null);
  const [componentsQpData, setComponentsQpData] = useState<
    Record<string, QuantityPriceData[]>
  >({});

  const [
    createProjectBid,
    { loading: createProjectBidLoading, error: createProjectBidError },
  ] = useCreateProjectBidMutation();

  // initialize componentsQpData with componentIds
  useEffect(() => {
    if (getProjectDetailData && getProjectDetailData.getProjectDetail) {
      const qpData: Record<string, QuantityPriceData[]> = {};
      const { components, orderQuantities } =
        getProjectDetailData.getProjectDetail;
      components.forEach((comp) => {
        qpData[comp.id] = orderQuantities.map((quantity) => {
          return {
            quantity,
            price: 0,
          };
        });
      });
      setComponentsQpData(qpData);
    }
  }, [getProjectDetailData]);

  useEffect(() => {
    if (getProjectDetailError) {
      setSnackbar({
        message: "Could not load project at this time. Please try again later.",
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [getProjectDetailError]);

  const qpDataOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    componentId: string,
    ind: number
  ) => {
    const val = e.target.value;
    if (!isValidInt(val)) return;

    const cur = [...componentsQpData[componentId]];
    cur[ind].price = parseInt(val, 10);
    setComponentsQpData({
      ...componentsQpData,
      [componentId]: cur,
    });
  };
  const componentTabOnChange = (
    event: React.SyntheticEvent,
    newTab: number
  ) => {
    setCurrentComponentTab(newTab);
  };

  const openModal = () => {
    setProjectBidModalOpen(true);
  };

  const afterOpenModal = () => {};

  const addBidsOnClick = (comp: ProjectComponent) => {
    setBiddingComponent(comp);
    setProjectBidModalOpen(true);
  };

  const closeModal = () => {
    setProjectBidModalOpen(false);
  };

  const bidProjectHandler = () => {
    setProjectBidModalOpen(true);
  };
  const backHandler = () => {
    navigate(-1);
  };

  const getComponentName = (id: string) => {
    if (!getProjectDetailData) return "";

    return getProjectDetailData.getProjectDetail.components.find(
      (comp) => comp.id === id
    )!.name;
  };

  const shouldDisableSubmitBidButton = () => {
    for (let id in componentsQpData) {
      // If theres at least one qp bid for any component, we let user submit
      if (componentsQpData[id].length) return false;
    }
    return true;
  };

  const submitBid = async () => {
    const components = [];
    for (let id in componentsQpData) {
      components.push({
        projectComponentId: id,
        quantityPrices: componentsQpData[id],
      });
    }

    try {
      await createProjectBid({
        variables: {
          data: {
            userId: user!.id,
            projectId: projectId!,
            comments: "",
            components,
          },
        },
      });
      setSnackbar({
        severity: "success",
        message: "Bid created.",
      });
      navigate(VENDOR_ROUTES.PROJECTS);
    } catch (error) {
      setSnackbar({
        severity: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setProjectBidModalOpen(false);
      setSnackbarOpen(true);
    }
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
    if (
      !getProjectDetailData ||
      !getProjectDetailData.getProjectDetail ||
      !Object.keys(componentsQpData).length
    )
      return null;

    const {
      name: projectName,
      companyName,
      deliveryDate,
      deliveryAddress,
      targetPrice,
      orderQuantities,
      design,
      status,
      components,
    } = getProjectDetailData.getProjectDetail as Project;

    return (
      <Box>
        <Grid container>
          <Grid item xs={7}>
            <Box display="flex" justifyContent="space-between" mb={1.5}>
              <Box>
                <Typography variant="subtitle1">Project Detail</Typography>
              </Box>
            </Box>
            <Paper style={{ padding: "12px", marginBottom: "8px" }}>
              <Stack>
                <ProjectListItem>
                  <Typography variant="subtitle2">Customer Name</Typography>
                  <Typography variant="caption" component="p">
                    {companyName}
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
                  <Typography variant="subtitle2">Order Quantities</Typography>
                  <Typography variant="caption" component="p">
                    {orderQuantities.join(", ")}
                  </Typography>
                </ProjectListItem>
                <ProjectListItem>
                  <Typography variant="subtitle2">Target Price</Typography>
                  <Typography variant="caption" component="p">
                    {targetPrice}
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

            <Box mt={2} mb={1.5} display="flex">
              <Typography variant="subtitle1">Components Detail</Typography>
            </Box>

            <Paper sx={{ mt: 1 }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={currentComponentTab}
                  onChange={componentTabOnChange}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {components.map((comp, i) => {
                    return <Tab label={comp.name} key={i} />;
                  })}
                </Tabs>
              </Box>

              {components.map((comp, i) => {
                return (
                  <TabPanel value={currentComponentTab} index={i}>
                    <Button
                      variant="outlined"
                      style={{ position: "absolute", right: 8, top: 8 }}
                      onClick={() => addBidsOnClick(comp)}
                    >
                      Add Bids
                    </Button>
                    {renderComponentSpecAccordionDetail(comp.componentSpec)}
                  </TabPanel>
                );
              })}
            </Paper>
          </Grid>

          <Grid item xs={5}>
            <Container>
              <Box display="flex" justifyContent="space-between" mb={1.5}>
                <Box>
                  <Typography variant="subtitle1" textAlign="left">
                    Bids Detail
                  </Typography>
                </Box>
                <Box>
                  <Button
                    onClick={submitBid}
                    variant="contained"
                    disabled={shouldDisableSubmitBidButton()}
                  >
                    Submit Bid
                  </Button>
                </Box>
              </Box>
              <Paper sx={{ mt: 1 }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={currentBidTab}
                    onChange={componentTabOnChange}
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    {components.map((comp, i) => {
                      return <Tab label={comp.name} key={i} />;
                    })}
                  </Tabs>
                </Box>

                {components.map((comp, i) => {
                  return (
                    <TabPanel value={currentBidTab} index={i}>
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Quantity</TableCell>
                              <TableCell>Price</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {getProjectDetailData.getProjectDetail.orderQuantities.map(
                              (quantity, i) => {
                                return (
                                  <TableRow>
                                    <TableCell>{quantity}</TableCell>
                                    <TableCell>
                                      <TextField
                                        onChange={(e) =>
                                          qpDataOnChange(e, comp.id, i)
                                        }
                                        value={
                                          componentsQpData[comp.id][i].price
                                            ? componentsQpData[comp.id][i].price
                                            : ""
                                        }
                                        size="small"
                                      />
                                    </TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </TabPanel>
                  );
                })}
              </Paper>
            </Container>
          </Grid>
        </Grid>
      </Box>
    );
  };

  if (getProjectDetailLoading) {
    return <FullScreenLoading />;
  }

  if (getProjectDetailData && getProjectDetailData.getProjectDetail) {
    return (
      <>
        {createProjectBidLoading && <FullScreenLoading />}
        <Container>
          {renderProjectDetail()}

          <Dialog open={projectBidModalOpen} onClose={closeModal} maxWidth="md">
            <ProjectBidModal
              setProjectBidModalOpen={setProjectBidModalOpen}
              orderQuantities={
                getProjectDetailData.getProjectDetail.orderQuantities
              }
              component={biddingComponent}
              setComponentsQpData={setComponentsQpData}
            />
          </Dialog>
        </Container>
      </>
    );
  }
  return null;
};

export default SearchProjectDetail;
