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
  TextField,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FullScreenLoading from "../../Utils/Loading";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import ProjectChat from "../chat/ProjectChat";
import React from "react";
import {
  BidRemark,
  BidStatus,
  CreateProjectBidComponentInput,
  ProjectBidComponent,
  ProjectComponent,
  ProjectComponentSpec,
  QuantityPrice,
  QuantityPriceInput,
  UpdateProjectBidComponentInput,
} from "../../../generated/graphql";
import {
  useGetVendorDetailQuery,
  useGetVendorProjectQuery,
} from "../../gql/get/vendor/vendor.generated";
import MuiListItem from "@mui/material/ListItem";
import styled from "@emotion/styled";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useIntl } from "react-intl";
import ComponentSpecDetail from "../common/ComponentSpecDetail";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import { ChangeCircleOutlined, Edit } from "@mui/icons-material";
import {
  useResubmitProjectBidMutation,
  useUpdateProjectBidComponentsMutation,
  useUpdateProjectBidMutation,
} from "../../gql/update/bid/bid.generated";
import { BidInputPriceTextField } from "../../Search/vendor/SearchProjectDetail";
import { isValidFloat, isValidInt } from "../../Utils/inputValidators";
import { PRODUCT_NAME_MOLDED_FIBER_TRAY } from "../../constants/products";
import { useCreateProjectBidComponentsMutation } from "../../gql/create/bid/bid.generated";
import UploadRemark from "./UploadRemark";
import { useDeleteBidRemarkMutation } from "../../gql/delete/bid/bid.generated";
import PermissionDenied from "../../Utils/PermissionDenied";
import AttachmentButton from "../../Utils/AttachmentButton";
import { openLink } from "../../Utils/openLink";

type BidComponent = {
  quantityPrices: QuantityPrice[];
  samplingFee: number;
  toolingFee?: number | null;
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

type BidComponentsForUpdate = Record<string, UpdateProjectBidComponentInput>;
type BidComponentsForCreate = Record<string, CreateProjectBidComponentInput>;

// TODO: handle null projectDetail
const VendorProjectDetail = () => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const theme = useTheme();
  const location = useLocation();
  const { projectId } = useParams();
  const [currentTab, setCurrentTab] = useState(0);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [newRemarkFileId, setNewRemarkFileId] = useState<string | null>(null);

  const [remarkFile, setRemarkFile] = useState<BidRemark | null>(null);

  const [permissionError, setPermissionError] = useState(false);

  const [bidComponentsForUpdate, setBidComponentsForUpdate] =
    useState<BidComponentsForUpdate>({});

  const [bidComponentsForCreate, setBidComponentsForCreate] =
    useState<BidComponentsForCreate>({});

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
    data: getVendorDetailData,
    error: getVendorDetailError,
    loading: getVendorDetailLoading,
  } = useGetVendorDetailQuery({
    variables: {
      data: {
        companyId: user!.companyId,
      },
    },
  });

  const [
    deleteRemark,
    { loading: deleteRemarkLoading, error: deleteRemarkError },
  ] = useDeleteBidRemarkMutation();

  const [
    updateProjectBid,
    { loading: updateProjectBidLoading, error: updateProjectBidError },
  ] = useUpdateProjectBidMutation();

  const [
    updateProjectBidComponents,
    {
      loading: updateProjectBidComponentsLoading,
      error: updateProjectBidComponentsError,
    },
  ] = useUpdateProjectBidComponentsMutation();

  const [
    createProjectBidComponents,
    {
      loading: createProjectBidComponentsLoading,
      error: createProjectBidComponentsError,
    },
  ] = useCreateProjectBidComponentsMutation();

  const [
    resubmitBid,
    {
      loading: resubmitBidLoading,
      error: resubmitBidError,
      data: resubmitBidData,
    },
  ] = useResubmitProjectBidMutation();

  useEffect(() => {
    if (isEditMode) {
      initializeBidComponents();
    }
  }, [isEditMode]);

  useEffect(() => {
    if (getVendorDetailError || getVendorProjectError || resubmitBidError) {
      if (getVendorProjectError?.message === "permission denied") {
        setPermissionError(true);
      } else {
        setSnackbar({
          message: intl.formatMessage({ id: "app.general.network.error" }),
          severity: "error",
        });
        setSnackbarOpen(true);
      }
    }
  }, [getVendorDetailError, getVendorProjectError, resubmitBidError]);

  useEffect(() => {
    if (getVendorProjectData && getVendorProjectData.getVendorProject) {
      initializeBidComponents();
    }
  }, [getVendorProjectData]);

  const resubmitProjectBid = async () => {
    if (getVendorProjectData && getVendorProjectData.getVendorProject) {
      await resubmitBid({
        variables: {
          data: {
            projectBidId: getVendorProjectData.getVendorProject.bidInfo.id,
          },
        },
        onCompleted() {
          getVendorProjectRefetch();
        },
      });
    }
  };
  const initializeBidComponents = () => {
    if (getVendorProjectData && getVendorProjectData.getVendorProject) {
      const projectComponents =
        getVendorProjectData.getVendorProject.components;
      const bidComponentsForUpdate =
        getVendorProjectData.getVendorProject.bidInfo.components;
      const bidId = getVendorProjectData.getVendorProject.bidInfo.id;

      const bidRemarkFile =
        getVendorProjectData.getVendorProject.bidInfo.remarkFile;

      if (bidRemarkFile) {
        setRemarkFile(bidRemarkFile);
      }

      const compsForUpdate = {} as BidComponentsForUpdate;
      const compsForCreate = {} as BidComponentsForCreate;

      // we need to combine existing qp from bid component with project's order quantities
      // because customer could update order quantities and we need to allow vendors to input
      // new prices for new quantities

      const getAllQp = (comp: ProjectBidComponent | null) => {
        const qpInputArr = [] as QuantityPriceInput[];

        // init the qp array with all possible quantities
        getVendorProjectData.getVendorProject!.orderQuantities.forEach(
          (quantity) => {
            qpInputArr.push({
              quantity,
              price: "",
            });
          }
        );

        // hydrate price data that have existing quantities in bid
        comp?.quantityPrices.forEach((bidQp) => {
          const ind = qpInputArr.findIndex(
            (qp) => qp.quantity === bidQp.quantity
          );
          if (ind >= 0) {
            qpInputArr[ind].price = bidQp.price;
          }
        });

        return qpInputArr;
      };

      bidComponentsForUpdate.forEach((comp) => {
        compsForUpdate[comp.projectComponentId] = {
          bidComponentId: comp.id,
          quantityPrices: getAllQp(comp),
          samplingFee: comp.samplingFee,
          toolingFee: comp.toolingFee,
        };
      });

      projectComponents.forEach((comp) => {
        // only initialize comps for create if there's no existing bid
        if (!compsForUpdate[comp.id]) {
          compsForCreate[comp.id] = {
            projectBidId: bidId,
            projectComponentId: comp.id,
            quantityPrices: getAllQp(null),
            samplingFee: 0,
          };

          // check whether productName is moldedFiber before initializing the attribute
          if (
            comp.componentSpec.productName ===
            PRODUCT_NAME_MOLDED_FIBER_TRAY.value
          ) {
            compsForCreate[comp.id].toolingFee = 0;
          } else {
            compsForCreate[comp.id].toolingFee = null;
          }
        }
      });

      setBidComponentsForUpdate(compsForUpdate);
      setBidComponentsForCreate(compsForCreate);
    }
  };

  const setRemarkId = (fileId: string) => {
    setNewRemarkFileId(fileId);
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

  const componentTabOnChange = (
    event: React.SyntheticEvent,
    newTab: number
  ) => {
    setCurrentTab(newTab);
  };

  const renderProjectAttributeTitle = (value: string) => {
    return <Typography variant="subtitle2">{value}</Typography>;
  };

  const renderBidDetail = (bid: BidComponent | null) => {
    return (
      <>
        <Box>
          <Typography variant="subtitle1" textAlign="left">
            {intl.formatMessage({
              id: "app.vendor.projectDetail.bidDetail",
            })}
          </Typography>
        </Box>
        {!!bid && (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="right" width="25%">
                    {intl.formatMessage({
                      id: "app.bid.attribute.quantity",
                    })}
                  </TableCell>
                  <TableCell align="right" width="25%">
                    {intl.formatMessage({
                      id: "app.bid.attribute.price",
                    })}
                  </TableCell>
                  <TableCell align="right" width="25%">
                    {intl.formatMessage({
                      id: "app.bid.attribute.samplingFee",
                    })}
                  </TableCell>

                  {!!bid.toolingFee && (
                    <TableCell align="right" width="25%">
                      {intl.formatMessage({
                        id: "app.bid.attribute.toolingFee",
                      })}
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {bid.quantityPrices.map((qp, i) => {
                  const isLast = i === bid.quantityPrices.length - 1;

                  return (
                    <TableRow>
                      <TableCell align="right">{qp.quantity}</TableCell>
                      <TableCell align="right">
                        {parseFloat(qp.price)}
                      </TableCell>
                      {isLast ? (
                        <>
                          <TableCell align="right">{bid.samplingFee}</TableCell>
                          {!!bid.toolingFee && (
                            <TableCell align="right">
                              {bid.toolingFee}
                            </TableCell>
                          )}
                        </>
                      ) : (
                        <>
                          <TableCell></TableCell>
                          {!!bid.toolingFee && <TableCell></TableCell>}
                        </>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {!bid && <Typography>no bid for this</Typography>}
      </>
    );
  };

  // renders an existing bid input table for a particular project component
  const renderEditBid = (
    component: ProjectComponent,
    bidComponent: UpdateProjectBidComponentInput
  ) => {
    const qpDataOnChange = (val: string, qpInd: number) => {
      let isAllowed = isValidFloat(val);
      if (isAllowed) {
        const qp = [...bidComponentsForUpdate[component.id].quantityPrices];
        qp.splice(qpInd, 1, {
          quantity: qp[qpInd].quantity,
          price: val,
        });
        setBidComponentsForUpdate({
          ...bidComponentsForUpdate,
          [component.id]: {
            ...bidComponentsForUpdate[component.id],
            quantityPrices: qp,
          },
        });
      }
    };

    const feeOnChange = (val: string, type: "samplingFee" | "toolingFee") => {
      let isAllowed = isValidInt(val);

      if (isAllowed) {
        setBidComponentsForUpdate({
          ...bidComponentsForUpdate,
          [component.id]: {
            ...bidComponentsForUpdate[component.id],
            [type]: +val,
          },
        });
      }
    };

    const renderBidInput = () => {
      return (
        <>
          {bidComponent.quantityPrices.map((qp, i) => {
            return (
              <>
                <TableRow>
                  <TableCell>{qp.quantity}</TableCell>
                  <TableCell>
                    <TextField
                      value={qp.price}
                      onChange={(e) => qpDataOnChange(e.target.value, i)}
                    />
                  </TableCell>
                </TableRow>
              </>
            );
          })}
          <TableRow>
            <TableCell>
              {intl.formatMessage({
                id: "app.bid.attribute.samplingFee",
              })}
            </TableCell>
            <TableCell>
              <TextField
                value={bidComponent.samplingFee ? bidComponent.samplingFee : ""}
                onChange={(e) => feeOnChange(e.target.value, "samplingFee")}
              />
            </TableCell>
          </TableRow>
          {bidComponent.toolingFee !== null && (
            <TableRow>
              <TableCell>
                {intl.formatMessage({
                  id: "app.bid.attribute.toolingFee",
                })}
              </TableCell>
              <TableCell>
                <TextField
                  value={bidComponent.toolingFee ? bidComponent.toolingFee : ""}
                  onChange={(e) => feeOnChange(e.target.value, "toolingFee")}
                />
              </TableCell>
            </TableRow>
          )}
        </>
      );
    };

    return (
      <>
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
            <TableBody>{renderBidInput()}</TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  // renders a new bid input for a component that the user hasn't bid on
  const renderCreateBid = (
    component: ProjectComponent,
    bidComponent: CreateProjectBidComponentInput
  ) => {
    const qpDataOnChange = (val: string, qpInd: number) => {
      let isAllowed = isValidFloat(val);
      if (isAllowed) {
        const qp = [...bidComponentsForCreate[component.id].quantityPrices];
        qp.splice(qpInd, 1, {
          quantity: qp[qpInd].quantity,
          price: val,
        });
        setBidComponentsForCreate({
          ...bidComponentsForCreate,
          [component.id]: {
            ...bidComponentsForCreate[component.id],
            quantityPrices: qp,
          },
        });
      }
    };

    const feeOnChange = (val: string, type: "samplingFee" | "toolingFee") => {
      let isAllowed = isValidInt(val);

      if (isAllowed) {
        setBidComponentsForCreate({
          ...bidComponentsForCreate,
          [component.id]: {
            ...bidComponentsForCreate[component.id],
            [type]: +val,
          },
        });
      }
    };

    const renderBidInput = () => {
      return (
        <>
          {bidComponent.quantityPrices.map((qp, i) => {
            return (
              <>
                <TableRow>
                  <TableCell>{qp.quantity}</TableCell>
                  <TableCell>
                    <TextField
                      value={qp.price}
                      onChange={(e) => qpDataOnChange(e.target.value, i)}
                    />
                  </TableCell>
                </TableRow>
              </>
            );
          })}
          <TableRow>
            <TableCell>
              {intl.formatMessage({
                id: "app.bid.attribute.samplingFee",
              })}
            </TableCell>
            <TableCell>
              <TextField
                value={bidComponent.samplingFee ? bidComponent.samplingFee : ""}
                onChange={(e) => feeOnChange(e.target.value, "samplingFee")}
              />
            </TableCell>
          </TableRow>
          {bidComponent.toolingFee !== null && (
            <TableRow>
              <TableCell>
                {intl.formatMessage({
                  id: "app.bid.attribute.toolingFee",
                })}
              </TableCell>
              <TableCell>
                <TextField
                  value={bidComponent.toolingFee ? bidComponent.toolingFee : ""}
                  onChange={(e) => feeOnChange(e.target.value, "toolingFee")}
                />
              </TableCell>
            </TableRow>
          )}
        </>
      );
    };
    return (
      <>
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
            <TableBody>{renderBidInput()}</TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  const updateBids = async () => {
    const isCompleteBidComponent = (
      comp: UpdateProjectBidComponentInput | CreateProjectBidComponentInput
    ) => {
      for (let qp of comp.quantityPrices) {
        if (!qp.price) return false;
      }
      if (!comp.samplingFee) return false;
      if (comp.toolingFee !== null && !comp.toolingFee) return false;

      return true;
    };

    try {
      await Promise.all([
        updateProjectBid({
          variables: {
            data: {
              projectBidId: getVendorProjectData!.getVendorProject!.bidInfo.id,
              projectId: getVendorProjectData!.getVendorProject!.id,
              bidRemarkFileId: remarkFile?.fileId,
            },
          },
        }),
        updateProjectBidComponents({
          variables: {
            data: Object.values(bidComponentsForUpdate).filter((comp) =>
              isCompleteBidComponent(comp)
            ),
          },
        }),
        createProjectBidComponents({
          variables: {
            data: Object.values(bidComponentsForCreate).filter((comp) =>
              isCompleteBidComponent(comp)
            ),
          },
        }),
      ]);
      setIsEditMode(false);
      getVendorProjectRefetch();
      setSnackbar({
        message: intl.formatMessage({
          id: "app.vendor.projectDetail.updateSuccess",
        }),
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        message: intl.formatMessage({
          id: "app.general.network.error",
        }),
        severity: "error",
      });
    } finally {
      setSnackbarOpen(true);
    }
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
      status,
      components,
      companyId,
      companyName: customerName,
      bidInfo,
    } = getVendorProjectData.getVendorProject;

    const bids: Record<string, BidComponent> = {};

    bidInfo.components.forEach((comp) => {
      bids[comp.projectComponentId] = comp;
    });

    return (
      <>
        <ProjectChat
          setChatOpen={setChatOpen}
          projectBidId={bidInfo.id}
          customerName={customerName}
          vendorName={getVendorDetailData!.getVendorDetail!.name}
          chatOpen={chatOpen}
        />

        <Paper
          style={{
            padding: "12px",
            marginBottom: "8px",
            position: "relative",
          }}
        >
          <IconButton
            onClick={() => setChatOpen(true)}
            sx={{ position: "absolute", top: 6, right: 6, zIndex: 2 }}
          >
            <Tooltip title="Message Customer" arrow placement="top">
              <QuestionAnswerIcon sx={{ color: theme.palette.primary.light }} />
            </Tooltip>
          </IconButton>
          <Typography variant="subtitle1" textAlign="left">
            {intl.formatMessage({
              id: "app.vendor.projectDetail.title",
            })}
          </Typography>
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
          </Stack>
        </Paper>

        <Paper>
          <Box p={1} display="flex" justifyContent="flex-end">
            {isEditMode ? (
              <>
                <Button
                  onClick={() => setIsEditMode(false)}
                  variant="outlined"
                  sx={{ mr: 2 }}
                >
                  {intl.formatMessage({
                    id: "app.general.cancel",
                  })}
                </Button>
                <Button onClick={updateBids} variant="contained" sx={{ mr: 2 }}>
                  {intl.formatMessage({
                    id: "app.vendor.projectDetail.updateBid",
                  })}
                </Button>
              </>
            ) : (
              <>
                {bidInfo.status === BidStatus.Outdated && (
                  <IconButton onClick={resubmitProjectBid}>
                    <Tooltip
                      arrow
                      title={intl.formatMessage({
                        id: "app.vendor.projectDetail.resubmitBid",
                      })}
                      placement="top"
                    >
                      <ChangeCircleOutlined />
                    </Tooltip>
                  </IconButton>
                )}
                <IconButton onClick={() => setIsEditMode(true)}>
                  <Tooltip
                    arrow
                    title={intl.formatMessage({
                      id: "app.vendor.projectDetail.editBid",
                    })}
                    placement="top"
                  >
                    <Edit />
                  </Tooltip>
                </IconButton>
              </>
            )}
          </Box>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={currentTab}
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
              <TabPanel value={currentTab} index={i}>
                <Box>
                  <Box>
                    <Typography variant="subtitle1" textAlign="left">
                      {intl.formatMessage({
                        id: "app.vendor.projectDetail.componentsDetail",
                      })}
                    </Typography>
                  </Box>
                  <ComponentSpecDetail
                    spec={comp.componentSpec}
                    designs={comp.designs}
                  />
                </Box>

                <Box mt={3}>
                  {isEditMode
                    ? !!bidComponentsForUpdate[comp.id]
                      ? renderEditBid(comp, bidComponentsForUpdate[comp.id])
                      : renderCreateBid(comp, bidComponentsForCreate[comp.id])
                    : renderBidDetail(bids[comp.id])}
                </Box>
              </TabPanel>
            );
          })}
        </Paper>

        <Box>
          <Box display="flex" alignItems="center" mt={2}>
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.vendor.search.AdditionRemarks",
              })}
            </Typography>
            {isEditMode && (
              <UploadRemark
                setRemarkFile={setRemarkFile}
                setRemarkId={setRemarkId}
                deleteExistingRemark={deleteExistingRemark}
              />
            )}
          </Box>

          {!!remarkFile && (
            <Box display="flex">
              <AttachmentButton
                label={remarkFile.filename}
                onClick={() => openLink(remarkFile.url)}
              />
            </Box>
          )}
        </Box>
      </>
    );
  };

  const isLoading =
    getVendorProjectLoading ||
    getVendorDetailLoading ||
    resubmitBidLoading ||
    updateProjectBidComponentsLoading ||
    createProjectBidComponentsLoading;

  if (permissionError) {
    return (
      <Dialog open={true}>
        <PermissionDenied />
      </Dialog>
    );
  }

  return (
    <Container>
      {isLoading && <FullScreenLoading />}
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
