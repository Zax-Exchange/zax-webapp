import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Paper,
  Box,
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
  InputAdornment,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import FullScreenLoading from "../../Utils/Loading";
import React from "react";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import {
  BidRemark,
  CreateProjectBidComponentInput,
  CreateProjectBidInput,
  Project,
  ProjectBid,
  ProjectComponent,
} from "../../../generated/graphql";
import { useGetProjectDetailQuery } from "../../gql/get/project/project.generated";
import { GENERAL_ROUTES } from "../../constants/loggedInRoutes";
import { useCreateProjectBidMutation } from "../../gql/create/project/project.generated";
import { isValidFloat, isValidInt } from "../../Utils/inputValidators";
import { AuthContext } from "../../../context/AuthContext";
import { useIntl } from "react-intl";
import { useGetProjectBidLazyQuery } from "../../gql/get/bid/bid.generated";
import ComponentSpecDetail from "../../Projects/common/ComponentSpecDetail";
import MuiTextField, { TextFieldProps } from "@mui/material/TextField";
import { PRODUCT_NAME_MOLDED_FIBER_TRAY } from "../../constants/products";
import AssistantDirectionRoundedIcon from "@mui/icons-material/AssistantDirectionRounded";
import UploadRemark from "../../Projects/vendor/UploadRemark";
import { useDeleteBidRemarkMutation } from "../../gql/delete/bid/bid.generated";
import AttachmentButton from "../../Utils/AttachmentButton";
import { openLink } from "../../Utils/openLink";
import ProjectSpecDetail from "../../Projects/common/ProjectSpecDetail";
import { InfoOutlined } from "@mui/icons-material";

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

export const BidInputPriceTextField = styled((props: TextFieldProps) => {
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
        width: "7rem",
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
    fetchPolicy: "no-cache",
  });

  const navigate = useNavigate();

  const [bidInput, setBidInput] = useState<CreateProjectBidInput>({
    userId: user!.id,
    projectId: projectId ? projectId : "",
    components: [],
    bidRemarkFileId: null,
  });

  const [remarkFile, setRemarkFile] = useState<BidRemark | null>(null);

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

  const [
    deleteRemark,
    { loading: deleteRemarkLoading, error: deleteRemarkError },
  ] = useDeleteBidRemarkMutation();

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
              price: "",
            };
          }),
          samplingFee: "",
          toolingFee:
            comp.componentSpec.productName ===
            PRODUCT_NAME_MOLDED_FIBER_TRAY.value
              ? ""
              : null,
        })),
      }));

      getProjectBid({
        variables: {
          data: {
            companyId: user!.companyId,
            projectId: getProjectDetailData.getProjectDetail.id,
          },
        },
        fetchPolicy: "no-cache",
      });
    }
  }, [getProjectDetailData]);

  // If user's company has bid for this project already
  useEffect(() => {
    if (getProjectBidData && getProjectBidData.getProjectBid) {
      setExistingBid(getProjectBidData.getProjectBid);
      setRemarkFile(getProjectBidData.getProjectBid.remarkFile || null);
    }
  }, [getProjectBidData]);

  useEffect(() => {
    if (
      getProjectDetailError ||
      getProjectBidError ||
      deleteRemarkError ||
      createProjectBidError
    ) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [
    getProjectDetailError,
    getProjectBidError,
    deleteRemarkError,
    createProjectBidError,
  ]);

  const navigateToExistingBid = (projectId: string) => {
    const dest = GENERAL_ROUTES.PROJECT_DETAIL.split(":");
    dest[1] = projectId;
    navigate(dest.join(""));
  };

  const setRemarkId = (fileId: string) => {
    setBidInput((prev) => ({ ...prev, bidRemarkFileId: fileId }));
  };

  const deleteExistingRemark = () => {
    if (remarkFile) {
      deleteRemark({
        variables: {
          data: {
            fileId: remarkFile.fileId,
          },
        },
      });
    }
  };

  const qpDataOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    componentInd: number,
    componentQpInd: number
  ) => {
    let val = e.target.value;
    if (!isValidFloat(val)) return;

    const components = [...bidInput.components];
    const curComponent = bidInput.components[componentInd];

    const curQp = curComponent.quantityPrices[componentQpInd];
    curQp.price = val;
    components.splice(componentInd, 1, curComponent);

    setBidInput((prev) => ({
      ...prev,
      components,
    }));
  };

  const componentFeeOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    componentInd: number,
    type: "samplingFee" | "toolingFee"
  ) => {
    const val = e.target.value;
    if (!isValidInt(val)) return;

    const components = [...bidInput.components];
    const curComponent = bidInput.components[componentInd];
    curComponent[type] = val;
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
        message: intl.formatMessage({ id: "app.vendor.search.bidCreated" }),
      });
      navigate(GENERAL_ROUTES.PROJECTS);
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
                        </TableRow>
                      );
                    })}
                    <TableRow>
                      <TableCell>
                        {intl.formatMessage({
                          id: "app.bid.attribute.samplingFee",
                        })}
                      </TableCell>
                      <TableCell>
                        <BidInputPriceTextField
                          onChange={(e) =>
                            componentFeeOnChange(
                              e,
                              componentIndex,
                              "samplingFee"
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
                    </TableRow>
                    {comp.toolingFee !== null && (
                      <TableRow>
                        <TableCell>
                          {intl.formatMessage({
                            id: "app.bid.attribute.toolingFee",
                          })}
                        </TableCell>
                        <TableCell>
                          <BidInputPriceTextField
                            onChange={(e) =>
                              componentFeeOnChange(
                                e,
                                componentIndex,
                                "toolingFee"
                              )
                            }
                            value={comp.toolingFee ? comp.toolingFee : ""}
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
                      </TableRow>
                    )}
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
    const { components } = getProjectDetailData.getProjectDetail as Project;
    const projectData = getProjectDetailData.getProjectDetail;
    return (
      <Container>
        {createProjectBidLoading && <FullScreenLoading />}
        <Grid container>
          <Grid item xs={8}>
            <Paper elevation={1}>
              <Box
                sx={{
                  padding: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #e1e2e5",
                }}
              >
                <Box pl={2}>
                  <Typography variant="h6" textAlign="left">
                    {intl.formatMessage({
                      id: "app.customer.projects.projectDetail",
                    })}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ p: 2 }}>
                <ProjectSpecDetail projectData={projectData} />
              </Box>
            </Paper>

            <Paper sx={{ mt: 1 }}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  display: "flex",
                }}
              >
                <Box
                  sx={{
                    padding: "8px",
                    margin: "0 8px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" textAlign="left">
                    {intl.formatMessage({
                      id: "app.customer.projects.componentsDetail",
                    })}
                  </Typography>
                </Box>
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
                    <ComponentSpecDetail
                      spec={comp.componentSpec}
                      designs={comp.designs}
                    />
                  </TabPanel>
                );
              })}
            </Paper>
          </Grid>

          {!getProjectBidLoading && (
            <Grid item xs={4}>
              <Container>
                <Box display="flex" justifyContent="space-between" mb={1.5}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                  >
                    <Box>
                      <Typography variant="subtitle1" textAlign="left">
                        {intl.formatMessage({
                          id: "app.vendor.search.bidsDetail",
                        })}
                      </Typography>
                    </Box>
                    {!!existingBid && (
                      <Box>
                        <Tooltip
                          title={intl.formatMessage({
                            id: "app.vendor.search.viewYourBid",
                          })}
                          arrow
                          placement="top"
                        >
                          <IconButton
                            onClick={() =>
                              navigateToExistingBid(existingBid.projectId)
                            }
                            color="primary"
                          >
                            <AssistantDirectionRoundedIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    )}
                    {!existingBid && (
                      <Box>
                        <Button
                          onClick={submitBid}
                          variant="contained"
                          disabled={
                            shouldDisableSubmitBidButton() ||
                            deleteRemarkLoading
                          }
                          color="primary"
                        >
                          {intl.formatMessage({
                            id: "app.vendor.search.submitBids",
                          })}
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Box>
                {!existingBid && (
                  <Paper sx={{ mt: 1 }}>
                    {renderBidInputSection(components)}
                  </Paper>
                )}
                {existingBid && (
                  <Box>
                    <Typography variant="caption" color="GrayText">
                      {intl.formatMessage({
                        id: "app.vendor.search.existingBid.helerText",
                      })}
                    </Typography>
                  </Box>
                )}
                {!existingBid && (
                  <Box>
                    <Box display="flex" alignItems="center" mt={2}>
                      <Tooltip
                        title={intl.formatMessage({
                          id: "app.bid.attribute.bidRemark.tooltip",
                        })}
                        placement="top"
                        sx={{ mr: 1 }}
                      >
                        <InfoOutlined color="info" fontSize="small" />
                      </Tooltip>
                      <Typography variant="subtitle2">
                        {intl.formatMessage({
                          id: "app.vendor.search.AdditionRemarks",
                        })}
                      </Typography>
                      {!existingBid && (
                        <UploadRemark
                          setRemarkFile={setRemarkFile}
                          setRemarkId={setRemarkId}
                          deleteExistingRemark={deleteExistingRemark}
                        />
                      )}
                    </Box>

                    {remarkFile && (
                      <Box display="flex" mt={1}>
                        <AttachmentButton
                          label={remarkFile.filename}
                          onClick={() => openLink(remarkFile.url)}
                        />
                      </Box>
                    )}
                  </Box>
                )}
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
