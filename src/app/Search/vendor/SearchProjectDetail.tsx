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
  Dialog,
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
import { useGetSearchProjectDetailQuery } from "../../gql/get/vendor/vendor.generated";
import PermissionDenied from "../../Utils/PermissionDenied";

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

const BidInputPriceTextField = styled((props: TextFieldProps) => {
  return (
    <MuiTextField
      {...props}
      size="small"
      sx={{
        width: "10rem",
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
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  const [submitBidClicked, setSubmitBidClicked] = useState(false);

  const [permissionedDenied, setPermissionDenied] = useState(false);

  const {
    data: getProjectDetailData,
    error: getProjectDetailError,
    loading: getProjectDetailLoading,
  } = useGetSearchProjectDetailQuery({
    variables: {
      data: {
        projectId: projectId || "",
        companyId: user!.companyId,
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
    if (getProjectDetailData && getProjectDetailData.getSearchProjectDetail) {
      const { components, orderQuantities } =
        getProjectDetailData.getSearchProjectDetail;

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
            projectId: getProjectDetailData.getSearchProjectDetail.id,
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
      if (getProjectDetailError?.message.includes("permission denied")) {
        setPermissionDenied(true);
      } else {
        setSnackbar({
          message: intl.formatMessage({ id: "app.general.network.error" }),
          severity: "error",
        });
        setSnackbarOpen(true);
      }
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

  // checks whether a bid component's fields has been only partially filled
  const hasOnlyPartialFieldsFilledOut = (
    bidComponent: CreateProjectBidComponentInput,
    component: ProjectComponent
  ) => {
    const isMoldedFiber =
      component.componentSpec.productName ===
      PRODUCT_NAME_MOLDED_FIBER_TRAY.value;

    const allFields: boolean[] = [];
    bidComponent.quantityPrices.forEach((qp) => {
      if (!!qp.price) {
        if (parseFloat(qp.price) === 0 || isNaN(parseFloat(qp.price))) {
          if (
            !bidComponent.samplingFee ||
            (isMoldedFiber && !bidComponent.toolingFee)
          ) {
            allFields.push(true);
          } else {
            allFields.push(false);
          }
        } else {
          allFields.push(true);
        }
      } else {
        allFields.push(false);
      }
    });
    if (bidComponent.samplingFee) {
      allFields.push(true);
    } else {
      allFields.push(false);
    }

    if (isMoldedFiber) {
      if (bidComponent.toolingFee) {
        allFields.push(true);
      } else {
        allFields.push(false);
      }
    }

    return allFields.some((b) => !!b) && allFields.some((b) => !b);
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

  // user filled out every field
  const isFilledBidComponent = (comp: CreateProjectBidComponentInput) => {
    for (let qp of comp.quantityPrices) {
      if (
        !qp.price ||
        parseFloat(qp.price) === 0 ||
        isNaN(parseFloat(qp.price))
      )
        return false;
    }

    if (comp.toolingFee !== null && !comp.toolingFee) {
      return false;
    }

    if (!comp.samplingFee) return false;

    return true;
  };

  // user did not fill a single field
  const isEmptyBidComponent = (comp: CreateProjectBidComponentInput) => {
    for (let qp of comp.quantityPrices) {
      if (qp.price) return false;
    }

    if (comp.toolingFee !== null && comp.toolingFee) {
      return false;
    }

    if (comp.samplingFee) return false;

    return true;
  };

  const shouldDisableSubmitBidButton = () => {
    if (isAllEmpty()) return true;

    const { components } = getProjectDetailData!
      .getSearchProjectDetail as Project;
    if (submitBidClicked) {
      // don't disable if every bid comp is either filled or empty
      return !bidInput.components.every((comp) => {
        return isFilledBidComponent(comp) || isEmptyBidComponent(comp);
      });
    } else {
      // don't disable if any bid comp is filled, for exact reason please see VendorProjectDetail.tsx comments
      if (bidInput.components.length > 1) {
        return !bidInput.components.some((comp) => {
          const projectComp = components.find(
            (projectComp) => projectComp.id === comp.projectComponentId
          );
          return (
            hasOnlyPartialFieldsFilledOut(comp, projectComp!) ||
            isFilledBidComponent(comp)
          );
        });
      }
      // there's only one component, disable if it's not completely filled
      return isFilledBidComponent(bidInput.components[0]);
    }
  };

  const getAllFilledBidComponents = () => {
    const { components } = bidInput;
    const res: CreateProjectBidComponentInput[] = [];
    components.forEach((comp) => {
      if (isFilledBidComponent(comp)) res.push(comp);
    });

    return res;
  };

  const isAllEmpty = () => {
    return getProjectDetailData!.getSearchProjectDetail!.components.every(
      (projectComp) => {
        const bidComponent = bidInput.components.find(
          (bidComp) => bidComp.projectComponentId === projectComp.id
        )!;
        return isEmptyBidComponent(bidComponent);
      }
    );
  };

  const submitBid = async () => {
    setSubmitBidClicked(true);

    const componentsValidated = () => {
      for (let comp of getProjectDetailData!.getSearchProjectDetail!
        .components) {
        const bidComponent = bidInput.components.find(
          (bidComp) => bidComp.projectComponentId === comp.id
        )!;

        for (let qp of bidComponent.quantityPrices) {
          if (parseFloat(qp.price) === 0) {
            return false;
          }
        }
        if (hasOnlyPartialFieldsFilledOut(bidComponent, comp)) {
          return false;
        }
      }

      return true;
    };
    if (!componentsValidated() || isAllEmpty()) return;

    try {
      await createProjectBid({
        variables: {
          data: {
            ...bidInput,
            components: getAllFilledBidComponents(),
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
              const bidComponent = bidInput.components.find(
                (bidComp) => bidComp.projectComponentId === comp.id
              );

              const isIncomplete = !!bidComponent
                ? hasOnlyPartialFieldsFilledOut(bidComponent, comp)
                : false;

              return (
                <Tab
                  label={comp.name}
                  key={i}
                  iconPosition="end"
                  icon={
                    isIncomplete && submitBidClicked ? (
                      <Tooltip
                        title={intl.formatMessage({
                          id: "app.general.incomplete",
                        })}
                        placement="top"
                      >
                        <InfoOutlined
                          color="warning"
                          sx={{ fontSize: "16px", lineHeight: 0 }}
                        />
                      </Tooltip>
                    ) : undefined
                  }
                  sx={{
                    minHeight: "48px",
                  }}
                />
              );
            })}
          </Tabs>
        </Box>

        {bidInput.components.map((comp, componentIndex) => {
          const projectComp = components.find(
            (projectComp) => projectComp.id === comp.projectComponentId
          );

          const isIncomplete = !!projectComp
            ? hasOnlyPartialFieldsFilledOut(comp, projectComp)
            : false;

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
                              error={
                                (submitBidClicked &&
                                  isIncomplete &&
                                  !qp.price) ||
                                (submitBidClicked &&
                                  !!qp.price &&
                                  parseFloat(qp.price) === 0) ||
                                (submitBidClicked &&
                                  !!qp.price &&
                                  isNaN(parseFloat(qp.price)))
                              }
                              onChange={(e) =>
                                qpDataOnChange(
                                  e,
                                  componentIndex,
                                  componentQpIndex
                                )
                              }
                              value={
                                comp.quantityPrices[componentQpIndex].price
                              }
                              size="small"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Typography
                                      variant="caption"
                                      color="GrayText"
                                    >
                                      {intl.formatMessage({
                                        id: "app.general.currency.usd",
                                      })}
                                    </Typography>
                                  </InputAdornment>
                                ),
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
                          error={
                            submitBidClicked &&
                            isIncomplete &&
                            !comp.samplingFee
                          }
                          onChange={(e) =>
                            componentFeeOnChange(
                              e,
                              componentIndex,
                              "samplingFee"
                            )
                          }
                          value={comp.samplingFee}
                          size="small"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Typography variant="caption" color="GrayText">
                                  {intl.formatMessage({
                                    id: "app.general.currency.usd",
                                  })}
                                </Typography>
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
                            error={
                              submitBidClicked &&
                              isIncomplete &&
                              !comp.toolingFee
                            }
                            onChange={(e) =>
                              componentFeeOnChange(
                                e,
                                componentIndex,
                                "toolingFee"
                              )
                            }
                            value={comp.toolingFee}
                            size="small"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Typography
                                    variant="caption"
                                    color="GrayText"
                                  >
                                    {intl.formatMessage({
                                      id: "app.general.currency.usd",
                                    })}
                                  </Typography>
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

  if (permissionedDenied) {
    return (
      <Dialog open={true}>
        <PermissionDenied />
      </Dialog>
    );
  }

  if (
    getProjectDetailData &&
    getProjectDetailData.getSearchProjectDetail &&
    Object.keys(bidInput.components).length
  ) {
    const { components } =
      getProjectDetailData.getSearchProjectDetail as Project;
    const projectData = getProjectDetailData.getSearchProjectDetail;
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
