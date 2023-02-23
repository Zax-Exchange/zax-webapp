import {
  Container,
  Typography,
  Button,
  Paper,
  IconButton,
  Dialog,
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
  InputAdornment,
  styled,
} from "@mui/material";
import MuiTextField, { TextFieldProps } from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router-dom";
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
  ProjectComponentChangelog,
  ProjectPermission,
  QuantityPrice,
  QuantityPriceInput,
  UpdateProjectBidComponentInput,
  VendorProject,
} from "../../../generated/graphql";
import {
  useGetVendorDetailQuery,
  useGetVendorProjectQuery,
} from "../../gql/get/vendor/vendor.generated";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useIntl } from "react-intl";
import ComponentSpecDetail from "../common/ComponentSpecDetail";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import {
  Edit,
  ErrorOutline,
  Info,
  InfoOutlined,
  Sync,
} from "@mui/icons-material";
import {
  useResubmitProjectBidMutation,
  useUpdateProjectBidComponentsMutation,
  useUpdateProjectBidMutation,
} from "../../gql/update/bid/bid.generated";
import { isValidFloat, isValidInt } from "../../Utils/inputValidators";
import { PRODUCT_NAME_MOLDED_FIBER_TRAY } from "../../constants/products";
import { useCreateProjectBidComponentsMutation } from "../../gql/create/bid/bid.generated";
import UploadRemark from "./UploadRemark";
import { useDeleteBidRemarkMutation } from "../../gql/delete/bid/bid.generated";
import PermissionDenied from "../../Utils/PermissionDenied";
import AttachmentButton from "../../Utils/AttachmentButton";
import { openLink } from "../../Utils/openLink";
import ProjectSpecDetail from "../common/ProjectSpecDetail";
import {
  useGetProjectChangelogLazyQuery,
  useGetProjectComponentChangelogLazyQuery,
} from "../../gql/get/project/project.generated";
import ProjectChangelogModal from "../customer/modals/ProjectChangelogModal";
import ProjectComponentChangelogModal from "../customer/modals/ProjectComponentChangelogModal";

type BidComponent = {
  quantityPrices: QuantityPrice[];
  samplingFee: string;
  toolingFee?: string | null;
  bidClearedByCustomer?: boolean;
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

type BidComponentsForUpdate = Record<string, UpdateProjectBidComponentInput>;
type BidComponentsForCreate = Record<string, CreateProjectBidComponentInput>;

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

// TODO: handle null projectDetail
const VendorProjectDetail = () => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const theme = useTheme();
  const { projectId } = useParams();
  const [currentTab, setCurrentTab] = useState(0);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [updateBidClicked, setUpdateBidClicked] = useState(false);

  const [newRemarkFileId, setNewRemarkFileId] = useState<string | null>(null);

  const [remarkFile, setRemarkFile] = useState<BidRemark | null>(null);

  const [permissionError, setPermissionError] = useState(false);

  const [bidComponentsForUpdate, setBidComponentsForUpdate] =
    useState<BidComponentsForUpdate>({});

  const [bidComponentsForCreate, setBidComponentsForCreate] =
    useState<BidComponentsForCreate>({});

  const [componentChangelogModalOpen, setComponentChangelogModalOpen] =
    useState(false);
  const [projectChangelogModalOpen, setProjectChangelogModalOpen] =
    useState(false);

  const [componentsChangelog, setComponentsChangelog] = useState<
    Record<string, ProjectComponentChangelog[]>
  >({});

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
    notifyOnNetworkStatusChange: true,
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
    { loading: resubmitBidLoading, error: resubmitBidError },
  ] = useResubmitProjectBidMutation();

  const [
    getProjectChangelog,
    { data: getProjectChangelogData, error: getProjectChangelogError },
  ] = useGetProjectChangelogLazyQuery();

  const [
    getComponentChangelog,
    { data: getComponentChangelogData, error: getComponentChangelogError },
  ] = useGetProjectComponentChangelogLazyQuery();

  useEffect(() => {
    if (
      deleteRemarkError ||
      updateProjectBidError ||
      updateProjectBidComponentsError ||
      createProjectBidComponentsError
    ) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [
    deleteRemarkError,
    updateProjectBidError,
    updateProjectBidComponentsError,
    createProjectBidComponentsError,
  ]);
  // wait until we actually fetched projectData (authorized users) so we don't fetch changelog data before knowing user is authorized or not
  useEffect(() => {
    if (getVendorProjectData && getVendorProjectData.getVendorProject) {
      getProjectChangelog({
        variables: {
          data: {
            projectId: projectId || "",
          },
        },
        fetchPolicy: "no-cache",
      });
    }
  }, [getVendorProjectData]);

  useEffect(() => {
    if (getVendorProjectData && getVendorProjectData.getVendorProject) {
      const compIds = getVendorProjectData.getVendorProject.components.map(
        (comp) => comp.id
      );

      getComponentChangelog({
        variables: {
          data: {
            projectComponentIds: compIds,
          },
        },
        fetchPolicy: "no-cache",
      });
    }
  }, [getVendorProjectData]);

  useEffect(() => {
    if (
      getComponentChangelogData &&
      getComponentChangelogData.getProjectComponentChangelog
    ) {
      const res: Record<string, ProjectComponentChangelog[]> = {};
      for (let changelog of getComponentChangelogData.getProjectComponentChangelog) {
        if (changelog.length) {
          res[changelog[0].projectComponentId] = changelog;
        }
      }
      setComponentsChangelog(res);
    }
  }, [getComponentChangelogData]);

  useEffect(() => {
    if (isEditMode) {
      initializeBidComponents();
    }
  }, [isEditMode]);

  useEffect(() => {
    if (
      getVendorDetailError ||
      getVendorProjectError ||
      resubmitBidError ||
      getComponentChangelogError ||
      getProjectChangelogError
    ) {
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
  }, [
    getVendorDetailError,
    getVendorProjectError,
    resubmitBidError,
    getComponentChangelogError,
    getProjectChangelogError,
  ]);

  useEffect(() => {
    if (getVendorProjectData && getVendorProjectData.getVendorProject) {
      initializeBidComponents();
    }
  }, [getVendorProjectData]);

  const resubmitProjectBid = async () => {
    if (getVendorProjectData && getVendorProjectData.getVendorProject) {
      try {
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
            samplingFee: "",
          };

          // check whether productName is moldedFiber before initializing the attribute
          if (
            comp.componentSpec.productName ===
            PRODUCT_NAME_MOLDED_FIBER_TRAY.value
          ) {
            compsForCreate[comp.id].toolingFee = "";
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

  const renderBidDetail = (bid: BidComponent | null) => {
    if (bid?.bidClearedByCustomer) {
      return (
        <Box display="flex" alignItems="center" justifyContent="center">
          <InfoOutlined color="warning" />
          <Typography variant="caption" color="CaptionText">
            {intl.formatMessage({
              id: "app.vendor.projectDetail.bidWasCleared",
            })}
          </Typography>
        </Box>
      );
    }
    return (
      <>
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
                        ${parseFloat(qp.price)}
                      </TableCell>
                      {isLast ? (
                        <>
                          <TableCell align="right">
                            ${bid.samplingFee}
                          </TableCell>
                          {!!bid.toolingFee && (
                            <TableCell align="right">
                              ${bid.toolingFee}
                            </TableCell>
                          )}
                        </>
                      ) : (
                        <>
                          <TableCell align="right">-</TableCell>
                          {!!bid.toolingFee && (
                            <TableCell align="right">-</TableCell>
                          )}
                        </>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {!bid && (
          <Typography variant="caption" color="GrayText">
            {intl.formatMessage({ id: "app.vendor.projectDetail.noBid" })}
          </Typography>
        )}
      </>
    );
  };

  // checks whether a bid component's fields has been only partially filled
  const hasOnlyPartialFieldsFilledOut = (
    bidComponent:
      | CreateProjectBidComponentInput
      | UpdateProjectBidComponentInput,
    component: ProjectComponent
  ) => {
    const isMoldedFiber =
      component.componentSpec.productName ===
      PRODUCT_NAME_MOLDED_FIBER_TRAY.value;
    const allFields: boolean[] = [];
    bidComponent.quantityPrices.forEach((qp) => {
      if (!!qp.price) {
        // though intermediate values are considered invalid, we need them to be valid if sampling/tooling fee are empty
        // so that this method can return correct value because it requires some fields to be filled and some fields to be empty to return true
        // and in the case where sampling/tooling fee are not filled but qp.price has intermediate value we want to treat it as partially filled
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

  // renders an existing bid input table for a particular project component
  const renderEditBid = (
    component: ProjectComponent,
    bidComponent: UpdateProjectBidComponentInput
  ) => {
    const isIncomplete = hasOnlyPartialFieldsFilledOut(bidComponent, component);
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
            [type]: val,
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
                    <BidInputPriceTextField
                      error={
                        (updateBidClicked && isIncomplete && !qp.price) ||
                        (updateBidClicked &&
                          !!qp.price &&
                          parseFloat(qp.price) === 0) ||
                        (updateBidClicked &&
                          !!qp.price &&
                          isNaN(parseFloat(qp.price)))
                      }
                      value={qp.price}
                      onChange={(e) => qpDataOnChange(e.target.value, i)}
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
              <BidInputPriceTextField
                error={
                  updateBidClicked && isIncomplete && !bidComponent.samplingFee
                }
                value={bidComponent.samplingFee}
                onChange={(e) => feeOnChange(e.target.value, "samplingFee")}
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
          {bidComponent.toolingFee !== null && (
            <TableRow>
              <TableCell>
                {intl.formatMessage({
                  id: "app.bid.attribute.toolingFee",
                })}
              </TableCell>
              <TableCell>
                <BidInputPriceTextField
                  error={
                    updateBidClicked && isIncomplete && !bidComponent.toolingFee
                  }
                  value={bidComponent.toolingFee}
                  onChange={(e) => feeOnChange(e.target.value, "toolingFee")}
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
    const isIncomplete = hasOnlyPartialFieldsFilledOut(bidComponent, component);

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
            [type]: val,
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
                    <BidInputPriceTextField
                      error={
                        (updateBidClicked && isIncomplete && !qp.price) ||
                        (updateBidClicked && parseFloat(qp.price) === 0) ||
                        (updateBidClicked && isNaN(parseFloat(qp.price)))
                      }
                      value={qp.price}
                      onChange={(e) => qpDataOnChange(e.target.value, i)}
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
              <BidInputPriceTextField
                error={
                  updateBidClicked && isIncomplete && !bidComponent.samplingFee
                }
                value={bidComponent.samplingFee}
                onChange={(e) => feeOnChange(e.target.value, "samplingFee")}
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
          {bidComponent.toolingFee !== null && (
            <TableRow>
              <TableCell>
                {intl.formatMessage({
                  id: "app.bid.attribute.toolingFee",
                })}
              </TableCell>
              <TableCell>
                <BidInputPriceTextField
                  error={
                    updateBidClicked && isIncomplete && !bidComponent.toolingFee
                  }
                  value={bidComponent.toolingFee}
                  onChange={(e) => feeOnChange(e.target.value, "toolingFee")}
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

  // nothing is filled out
  const isAllEmpty = () => {
    return getVendorProjectData!.getVendorProject!.components.every((comp) => {
      const bidComponent = !!bidComponentsForUpdate[comp.id]
        ? bidComponentsForUpdate[comp.id]
        : bidComponentsForCreate[comp.id];
      return isEmptyBidComponent(bidComponent);
    });
  };

  const isEmptyBidComponent = (
    comp: UpdateProjectBidComponentInput | CreateProjectBidComponentInput
  ) => {
    for (let qp of comp.quantityPrices) {
      if (qp.price) return false;
    }
    if (comp.samplingFee) return false;
    if (comp.toolingFee !== null && comp.toolingFee) return false;

    return true;
  };

  const isFilledBidComponent = (
    comp: UpdateProjectBidComponentInput | CreateProjectBidComponentInput
  ) => {
    for (let qp of comp.quantityPrices) {
      if (
        !qp.price ||
        parseFloat(qp.price) === 0 ||
        isNaN(parseFloat(qp.price))
      )
        return false;
    }
    if (!comp.samplingFee) return false;
    if (comp.toolingFee !== null && !comp.toolingFee) return false;

    return true;
  };

  const shouldDisableUpdateButton = () => {
    if (isAllEmpty()) {
      return true;
    }
    if (updateBidClicked) {
      // if user clicked update bid, it implies user has intent to update then we should check if everything is valid
      return !getVendorProjectData!.getVendorProject!.components.every(
        (comp) => {
          const bidComponent = !!bidComponentsForUpdate[comp.id]
            ? bidComponentsForUpdate[comp.id]
            : bidComponentsForCreate[comp.id];
          // adding additional check for hasOnlyPartialFieldsFilledOut because isFilledBidComponent only check if every field has any value, but since qp prices can have decimals
          // and we allow intermediate values like "." or ".0" or "0." for user input purposes, and those should not be considered valid input
          return (
            isEmptyBidComponent(bidComponent) ||
            isFilledBidComponent(bidComponent)
          );
        }
      );
    }
    // if user hasn't clicked update bid, we allow user to click update bid even if it's only partially filled out
    // this allows us to warn user for unfilled fields because disabling the button before they show update intent might make user confused on why they cannot submit
    // since they might be on different component tabs and not noticing unfilled fields in other tabs
    if (getVendorProjectData!.getVendorProject!.components.length > 1) {
      for (let comp of getVendorProjectData!.getVendorProject!.components) {
        const bidComponent = !!bidComponentsForUpdate[comp.id]
          ? bidComponentsForUpdate[comp.id]
          : bidComponentsForCreate[comp.id];

        if (
          hasOnlyPartialFieldsFilledOut(bidComponent, comp) ||
          isFilledBidComponent(bidComponent)
        ) {
          return false;
        }
      }
    } else {
      // only one component, disable button if it's not completely filled
      for (let comp of getVendorProjectData!.getVendorProject!.components) {
        // bidComponent here can still be create or update type since customer could delete an original component and create a new one
        const bidComponent = !!bidComponentsForUpdate[comp.id]
          ? bidComponentsForUpdate[comp.id]
          : bidComponentsForCreate[comp.id];

        if (isFilledBidComponent(bidComponent)) {
          return false;
        }
      }
    }
    return true;
  };

  const updateBids = async () => {
    setUpdateBidClicked(true);

    const componentsValidated = () => {
      for (let comp of getVendorProjectData!.getVendorProject!.components) {
        const bidComponent = !!bidComponentsForUpdate[comp.id]
          ? bidComponentsForUpdate[comp.id]
          : bidComponentsForCreate[comp.id];

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
            data: Object.values(bidComponentsForUpdate),
          },
        }),
        createProjectBidComponents({
          variables: {
            data: Object.values(bidComponentsForCreate).filter(
              (comp) => !isEmptyBidComponent(comp)
            ),
          },
        }),
      ]);
      await getVendorProjectRefetch();
      setUpdateBidClicked(false);
      setIsEditMode(false);
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
      components,
      companyName: customerName,
      bidInfo,
    } = getVendorProjectData.getVendorProject;

    const bids: Record<string, BidComponent> = {};

    // a bid's qp gets cleared when customer deletes order quantities that originally had bids on them
    // samplingFee/toolingFee remains, this flag is used to determine whether to display resubmit button or not
    let bidClearedByCustomer = false;

    bidInfo.components.forEach((comp) => {
      bids[comp.projectComponentId] = {
        ...comp,
      };
      if (!comp.quantityPrices.length) {
        bidClearedByCustomer = true;
        bids[comp.projectComponentId].bidClearedByCustomer = true;
      }
    });

    return (
      <>
        <Box textAlign="left">
          <IconButton onClick={() => navigate(-1)}>
            <KeyboardBackspaceIcon style={{ color: "rgb(43, 52, 89)" }} />
          </IconButton>
        </Box>
        <ProjectChat
          setChatOpen={setChatOpen}
          projectBidId={bidInfo.id}
          customerName={customerName}
          vendorName={getVendorDetailData!.getVendorDetail!.name}
          chatOpen={chatOpen}
        />

        <Paper
          style={{
            marginBottom: "8px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              padding: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #e1e2e5",
            }}
          >
            <Box pl={2} display="flex">
              <Typography variant="h6" textAlign="left">
                {intl.formatMessage({
                  id: "app.customer.projects.projectDetail",
                })}
              </Typography>
              {bidInfo.status === BidStatus.Outdated && (
                <Box sx={{ ml: 2, display: "flex", alignItems: "center" }}>
                  <Tooltip
                    title={intl.formatMessage({
                      id: "app.bid.status.outdated.tooltip",
                    })}
                    placement="top"
                  >
                    <ErrorOutline color="warning" />
                  </Tooltip>
                </Box>
              )}
            </Box>
            <Box>
              <IconButton
                onClick={() => setChatOpen(true)}
                sx={{ position: "absolute", top: 6, right: 6, zIndex: 2 }}
              >
                <Tooltip
                  title={intl.formatMessage({
                    id: "app.vendor.projectDetail.chatWithCustomer",
                  })}
                  placement="top"
                >
                  <QuestionAnswerIcon
                    sx={{ color: theme.palette.primary.light }}
                  />
                </Tooltip>
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ p: 2 }}>
            <Box sx={{ position: "relative" }}>
              {!!getProjectChangelogData &&
                !!getProjectChangelogData.getProjectChangelog.length && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => setProjectChangelogModalOpen(true)}
                    >
                      {" "}
                      {intl.formatMessage({ id: "app.viewVersionHistory" })}
                    </Button>
                    <Dialog
                      open={projectChangelogModalOpen}
                      onClose={() => setProjectChangelogModalOpen(false)}
                      maxWidth="lg"
                      // fullWidth
                    >
                      <ProjectChangelogModal
                        changelog={getProjectChangelogData.getProjectChangelog}
                      />
                    </Dialog>
                  </Box>
                )}

              <ProjectSpecDetail
                projectData={
                  getVendorProjectData.getVendorProject as VendorProject
                }
                isVendorProject={true}
              />
            </Box>
          </Box>
        </Paper>

        <Paper sx={{ position: "relative" }}>
          {bidInfo.permission !== ProjectPermission.Viewer && (
            <Box
              p={1}
              display="flex"
              justifyContent="flex-end"
              sx={{ position: "absolute", right: 0, top: 0, zIndex: 2 }}
            >
              <Box>
                {isEditMode ? (
                  <>
                    <Button
                      onClick={() => {
                        setIsEditMode(false);
                        setUpdateBidClicked(false);
                      }}
                      variant="outlined"
                      sx={{ mr: 2 }}
                    >
                      {intl.formatMessage({
                        id: "app.general.cancel",
                      })}
                    </Button>
                    <Button
                      onClick={updateBids}
                      disabled={shouldDisableUpdateButton()}
                      variant="contained"
                      sx={{ mr: 2 }}
                    >
                      {intl.formatMessage({
                        id: "app.vendor.projectDetail.updateBid",
                      })}
                    </Button>
                  </>
                ) : (
                  <>
                    {bidInfo.status === BidStatus.Outdated &&
                      !bidClearedByCustomer && (
                        <IconButton onClick={resubmitProjectBid}>
                          <Tooltip
                            title={intl.formatMessage({
                              id: "app.vendor.projectDetail.resubmitBid",
                            })}
                            placement="top"
                          >
                            <Sync color="primary" />
                          </Tooltip>
                        </IconButton>
                      )}
                    <IconButton onClick={() => setIsEditMode(true)}>
                      <Tooltip
                        title={intl.formatMessage({
                          id: "app.vendor.projectDetail.editBid",
                        })}
                        placement="top"
                      >
                        <Edit color="primary" />
                      </Tooltip>
                    </IconButton>
                  </>
                )}
              </Box>
            </Box>
          )}
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={currentTab}
              onChange={componentTabOnChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ width: "75%" }}
            >
              {components.map((comp, i) => {
                const bidComponent = !!bidComponentsForUpdate[comp.id]
                  ? bidComponentsForUpdate[comp.id]
                  : bidComponentsForCreate[comp.id];

                const isIncomplete =
                  bidComponent &&
                  hasOnlyPartialFieldsFilledOut(bidComponent, comp);

                return (
                  <Tab
                    label={comp.name}
                    key={i}
                    iconPosition="end"
                    icon={
                      !isEditMode && !!bids[comp.id]?.bidClearedByCustomer ? (
                        <InfoOutlined
                          sx={{ fontSize: "20px" }}
                          color="warning"
                        />
                      ) : isIncomplete && updateBidClicked ? (
                        <Tooltip
                          title={intl.formatMessage({
                            id: "app.general.incomplete",
                          })}
                          placement="top"
                        >
                          <Info
                            color="warning"
                            sx={{ fontSize: "16px", lineHeight: 0 }}
                          />
                        </Tooltip>
                      ) : undefined
                    }
                    sx={{ minHeight: "48px" }}
                  />
                );
              })}
            </Tabs>
          </Box>

          {components.map((comp, i) => {
            return (
              <TabPanel value={currentTab} index={i}>
                <Box sx={{ position: "relative" }}>
                  {!!componentsChangelog[comp.id] && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                      }}
                    >
                      <Button
                        onClick={() => setComponentChangelogModalOpen(true)}
                        variant="outlined"
                      >
                        {intl.formatMessage({
                          id: "app.viewVersionHistory",
                        })}
                      </Button>
                      <Dialog
                        open={componentChangelogModalOpen}
                        onClose={() => setComponentChangelogModalOpen(false)}
                        maxWidth="lg"
                        // fullWidth
                      >
                        <ProjectComponentChangelogModal
                          changelog={componentsChangelog[comp.id]}
                        />
                      </Dialog>
                    </Box>
                  )}
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
                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      textAlign="left"
                      sx={{ mr: 1 }}
                    >
                      {intl.formatMessage({
                        id: "app.vendor.projectDetail.bidDetail",
                      })}
                    </Typography>
                    {isEditMode && !!bids[comp.id]?.bidClearedByCustomer && (
                      <Tooltip
                        title={intl.formatMessage({
                          id: "app.vendor.projectDetail.bidWasCleared.tooltip",
                        })}
                        placement="right"
                      >
                        <InfoOutlined
                          sx={{ fontSize: "20px" }}
                          color="warning"
                        />
                      </Tooltip>
                    )}
                    {isEditMode && !bids[comp.id]?.bidClearedByCustomer && (
                      <Tooltip
                        title={
                          !!bidComponentsForUpdate[comp.id]
                            ? intl.formatMessage({
                                id: "app.vendor.projectDetail.editBid.editBidTooltip",
                              })
                            : intl.formatMessage({
                                id: "app.vendor.projectDetail.editBid.createNewBidTooltip",
                              })
                        }
                        placement="right"
                      >
                        <InfoOutlined sx={{ fontSize: "20px" }} color="info" />
                      </Tooltip>
                    )}
                  </Box>
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
            {isEditMode && (
              <Tooltip
                title={intl.formatMessage({
                  id: "app.bid.attribute.bidRemark.tooltip",
                })}
                placement="top"
                sx={{ mr: 1 }}
              >
                <InfoOutlined color="info" fontSize="small" />
              </Tooltip>
            )}
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
            <Box display="flex" mt={1}>
              <AttachmentButton
                label={remarkFile.filename}
                onClick={() => openLink(remarkFile.url)}
              />
            </Box>
          )}
          {!remarkFile && (
            <Typography variant="caption" color="GrayText">
              {intl.formatMessage({
                id: "app.bid.attribute.bidRemark.noRemark",
              })}
            </Typography>
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
      {renderProjectDetail()}
    </Container>
  );
};

export default VendorProjectDetail;
