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
  ClickAwayListener,
  ListItem,
  InputAdornment,
} from "@mui/material";
import ProjectBidModal from "../../Projects/vendor/ProjectBidModal";
import { useContext, useEffect, useState } from "react";
import FullScreenLoading from "../../Utils/Loading";
import CustomSnackbar from "../../Utils/CustomSnackbar";
import React from "react";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import {
  CreateProjectBidComponentInput,
  CreateProjectBidInput,
  Project,
  ProjectBid,
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
import { useIntl } from "react-intl";
import { useGetProjectBidLazyQuery } from "../../gql/get/bid/bid.generated";
import ComponentSpecDetail from "../../Projects/common/ComponentSpecDetail";
import MuiTextField, { TextFieldProps } from "@mui/material/TextField";

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

const ProjectListItem = styled(MuiListItem)(() => ({
  display: "flex",
  justifyContent: "space-between",
  "& .MuiTypography-root:last-child": {
    flexBasis: "65%",
    whiteSpace: "pre-wrap",
  },
}));

const BidInputPriceTextField = styled((props: TextFieldProps) => {
  return (
    <MuiTextField
      {...props}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
            sx={{
              "& .MuiTypography-root": {
                fontSize: "16px",
              },
            }}
          >
            $
          </InputAdornment>
        ),
      }}
      sx={{
        "& .MuiInputBase-root": {
          pl: 1,
        },
      }}
    />
  );
})(() => ({}));

const SearchProjectDetail = () => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const { projectId } = useParams();
  const [currentComponentTab, setCurrentComponentTab] = useState(0);
  const [currentBidTab, setCurrentBidTab] = useState(0);
  const [existingBid, setExistingBid] = useState<ProjectBid | null>(null);
  const [currentExistingBidTab, setCurrentExistingBidTab] = useState(0);
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

  const [bidInput, setBidInput] = useState<CreateProjectBidInput>({
    userId: user!.id,
    projectId: projectId ? projectId : "",
    comments: "",
    components: [],
  });

  const [
    getProjectBid,
    {
      data: getProjectBidData,
      loading: getProjectBidLoading,
      error: getProjectBidError,
    },
  ] = useGetProjectBidLazyQuery();

  const [
    createProjectBid,
    { loading: createProjectBidLoading, error: createProjectBidError },
  ] = useCreateProjectBidMutation();

  // initialize componentsQpData with componentIds
  useEffect(() => {
    if (getProjectDetailData && getProjectDetailData.getProjectDetail) {
      const { components, orderQuantities } =
        getProjectDetailData.getProjectDetail;

      setBidInput((prev) => ({
        ...prev,
        components: components.map((comp) => ({
          projectComponentId: comp.id,
          quantityPrices: orderQuantities.map((quantity) => {
            return {
              quantity,
              price: 0,
            };
          }),
          samplingFee: 0,
        })),
      }));

      getProjectBid({
        variables: {
          data: {
            companyId: user!.companyId,
            projectId: getProjectDetailData.getProjectDetail.id,
          },
        },
      });
    }
  }, [getProjectDetailData]);

  // If user's company has bid for this project already
  useEffect(() => {
    if (getProjectBidData && getProjectBidData.getProjectBid) {
      setExistingBid(getProjectBidData.getProjectBid);
    }
  }, [getProjectBidData]);

  useEffect(() => {
    if (getProjectDetailError || getProjectBidError) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [getProjectDetailError, getProjectBidError]);

  const qpDataOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    componentInd: number,
    componentQpInd: number
  ) => {
    const val = e.target.value;
    if (!isValidInt(val)) return;
    const components = [...bidInput.components];
    const curComponent = bidInput.components[componentInd];
    console.log(curComponent, componentInd);
    const curQp = curComponent.quantityPrices[componentQpInd];
    curQp.price = parseInt(val, 10);
    components.splice(componentInd, 1, curComponent);

    setBidInput((prev) => ({
      ...prev,
      components,
    }));
  };

  const componentSamplingFeeOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    componentInd: number
  ) => {
    const val = e.target.value;
    if (!isValidInt(val)) return;
    const components = [...bidInput.components];
    const curComponent = bidInput.components[componentInd];
    curComponent.samplingFee = parseInt(val, 10);
    components.splice(componentInd, 1, curComponent);

    setBidInput((prev) => ({
      ...prev,
      components,
    }));
  };

  const componentTabOnChange = (
    event: React.SyntheticEvent,
    newTab: number
  ) => {
    setCurrentComponentTab(newTab);
  };

  const bidsTabOnChange = (event: React.SyntheticEvent, newTab: number) => {
    setCurrentBidTab(newTab);
  };

  const isValidComponentBid = (comp: CreateProjectBidComponentInput) => {
    // If any of the qp price is invalid, the component bid is invalid
    for (let qp of comp.quantityPrices) {
      if (!qp.price) return false;
    }
    // If qp prices are all valid and there is a samplingFee present, the component bid is valid
    if (comp.samplingFee) return true;

    return false;
  };
  const shouldDisableSubmitBidButton = () => {
    for (let comp of bidInput.components) {
      if (isValidComponentBid(comp)) return false;
    }
    return true;
  };

  const filterBids = () => {
    const { components } = bidInput;
    const res: CreateProjectBidComponentInput[] = [];
    components.forEach((comp) => {
      if (isValidComponentBid(comp)) res.push(comp);
    });

    return res;
  };

  const submitBid = async () => {
    try {
      await createProjectBid({
        variables: {
          data: {
            ...bidInput,
            components: filterBids(),
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
        message: intl.formatMessage({ id: "app.general.network.error" }),
      });
    } finally {
      setSnackbarOpen(true);
    }
  };

  const renderBidInputSection = (components: ProjectComponent[]) => {
    return (
      <>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={currentBidTab}
            onChange={bidsTabOnChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {components.map((comp, i) => {
              return <Tab label={comp.name} key={i} />;
            })}
          </Tabs>
        </Box>

        {bidInput.components.map((comp, componentIndex) => {
          return (
            <TabPanel value={currentBidTab} index={componentIndex}>
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
                      <TableCell>
                        {intl.formatMessage({
                          id: "app.component.attribute.samplingFee",
                        })}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {comp.quantityPrices.map((qp, componentQpIndex) => {
                      return (
                        <TableRow>
                          <TableCell>{qp.quantity}</TableCell>
                          <TableCell>
                            <BidInputPriceTextField
                              onChange={(e) =>
                                qpDataOnChange(
                                  e,
                                  componentIndex,
                                  componentQpIndex
                                )
                              }
                              value={
                                comp.quantityPrices[componentQpIndex].price
                                  ? comp.quantityPrices[componentQpIndex].price
                                  : ""
                              }
                              size="small"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment
                                    position="start"
                                    sx={{
                                      "& .MuiTypography-root": {
                                        fontSize: "16px",
                                      },
                                    }}
                                  >
                                    $
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                "& .MuiInputBase-root": {
                                  pl: 1,
                                },
                              }}
                            />
                          </TableCell>
                          {componentQpIndex ===
                          comp.quantityPrices.length - 1 ? (
                            <TableCell>
                              <BidInputPriceTextField
                                onChange={(e) =>
                                  componentSamplingFeeOnChange(
                                    e,
                                    componentIndex
                                  )
                                }
                                value={comp.samplingFee ? comp.samplingFee : ""}
                                size="small"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      $
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </TableCell>
                          ) : (
                            <TableCell></TableCell>
                          )}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          );
        })}
      </>
    );
  };

  const renderExistingBidDetail = (components: ProjectComponent[]) => {
    const compIdToNameMap: Record<string, string> = {};
    components.forEach((comp) => {
      compIdToNameMap[comp.id] = comp.name;
    });

    return (
      <>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={currentBidTab}
            onChange={bidsTabOnChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {existingBid?.components.map((comp, i) => {
              return (
                <Tab label={compIdToNameMap[comp.projectComponentId]} key={i} />
              );
            })}
          </Tabs>
        </Box>

        {existingBid?.components.map((comp, componentIndex) => {
          return (
            <TabPanel value={currentBidTab} index={componentIndex}>
              <TableContainer>
                <Table size="small">
                  {/* <TableHead>
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
                      <TableCell>
                        {intl.formatMessage({
                          id: "app.component.attribute.samplingFee",
                        })}
                      </TableCell>
                    </TableRow>
                  </TableHead> */}
                  <TableBody>
                    {comp.quantityPrices.map((qp, componentQpIndex) => {
                      return (
                        <TableRow>
                          <TableCell>
                            {intl.formatMessage({
                              id: "app.bid.attribute.quantity",
                            })}
                          </TableCell>
                          <TableCell>{qp.quantity}</TableCell>
                          <TableCell>$ {qp.price}</TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow>
                      <TableCell colSpan={2} sx={{ textAlign: "center" }}>
                        {intl.formatMessage({
                          id: "app.component.attribute.samplingFee",
                        })}
                      </TableCell>
                      <TableCell>$ {comp.samplingFee}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          );
        })}
      </>
    );
  };

  if (getProjectDetailLoading) {
    return <FullScreenLoading />;
  }

  if (
    getProjectDetailData &&
    getProjectDetailData.getProjectDetail &&
    Object.keys(bidInput.components).length
  ) {
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
      <Container>
        {createProjectBidLoading && <FullScreenLoading />}
        <Grid container>
          <Grid item xs={7}>
            <Box display="flex" justifyContent="space-between" mb={1.5}>
              <Box>
                <Typography variant="subtitle1">
                  {intl.formatMessage({
                    id: "app.vendor.search.projectDetail",
                  })}
                </Typography>
              </Box>
            </Box>
            <Paper style={{ padding: "12px", marginBottom: "8px" }}>
              <Stack>
                <ProjectListItem>
                  <Typography variant="subtitle2">
                    {intl.formatMessage({
                      id: "app.vendor.project.attribute.customerName",
                    })}
                  </Typography>
                  <Typography variant="caption" component="p">
                    {companyName}
                  </Typography>
                </ProjectListItem>
                <ProjectListItem>
                  <Typography variant="subtitle2">
                    {intl.formatMessage({
                      id: "app.project.attribute.name",
                    })}
                  </Typography>
                  <Typography variant="caption" component="p">
                    {projectName}
                  </Typography>
                </ProjectListItem>
                <ProjectListItem>
                  <Typography variant="subtitle2">
                    {intl.formatMessage({
                      id: "app.project.attribute.deliveryDate",
                    })}
                  </Typography>
                  <Typography variant="caption" component="p">
                    {deliveryDate}
                  </Typography>
                </ProjectListItem>
                <ProjectListItem>
                  <Typography variant="subtitle2">
                    {intl.formatMessage({
                      id: "app.project.attribute.deliveryAddress",
                    })}
                  </Typography>
                  <Typography variant="caption" component="p">
                    {deliveryAddress}
                  </Typography>
                </ProjectListItem>
                <ProjectListItem>
                  <Typography variant="subtitle2">
                    {intl.formatMessage({
                      id: "app.project.attribute.orderQuantities",
                    })}
                    s
                  </Typography>
                  <Typography variant="caption" component="p">
                    {orderQuantities.join(", ")}
                  </Typography>
                </ProjectListItem>
                <ProjectListItem>
                  <Typography variant="subtitle2">
                    {intl.formatMessage({
                      id: "app.project.attribute.targetPrice",
                    })}
                  </Typography>
                  <Typography variant="caption" component="p">
                    {targetPrice}
                  </Typography>
                </ProjectListItem>

                {design && (
                  <ProjectListItem>
                    <Typography variant="subtitle2">
                      {intl.formatMessage({
                        id: "app.project.attribute.design",
                      })}
                    </Typography>
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
              <Typography variant="subtitle1">
                {intl.formatMessage({
                  id: "app.vendor.search.componentsDetail",
                })}
              </Typography>
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
                    <ComponentSpecDetail spec={comp.componentSpec} />
                  </TabPanel>
                );
              })}
            </Paper>
          </Grid>

          {!getProjectBidLoading && (
            <Grid item xs={5}>
              <Container>
                <Box display="flex" justifyContent="space-between" mb={1.5}>
                  <Box>
                    <Typography variant="subtitle1" textAlign="left">
                      {intl.formatMessage({
                        id: "app.vendor.search.bidsDetail",
                      })}
                    </Typography>
                  </Box>
                  {!existingBid && (
                    <Box>
                      <Button
                        onClick={submitBid}
                        variant="contained"
                        disabled={shouldDisableSubmitBidButton()}
                      >
                        {intl.formatMessage({
                          id: "app.vendor.search.submitBids",
                        })}
                      </Button>
                    </Box>
                  )}
                </Box>
                <Paper sx={{ mt: 1 }}>
                  {!!existingBid
                    ? renderExistingBidDetail(components)
                    : renderBidInputSection(components)}
                </Paper>
              </Container>
            </Grid>
          )}
        </Grid>
      </Container>
    );
  }
  return null;
};

export default SearchProjectDetail;
