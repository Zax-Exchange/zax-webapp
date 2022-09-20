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
  Tooltip,
  useTheme,
  TextField,
  ButtonGroup,
  InputAdornment,
  InputProps,
  Autocomplete,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import VendorBidOverview from "./VendorBidOverview";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import FullScreenLoading from "../../Utils/Loading";
import { ProjectOverviewListItem } from "./CustomerProjectOverviewCard";
import styled from "@emotion/styled";
import {
  CreateProjectComponentSpecInput,
  Project,
  ProjectBid,
  ProjectComponent,
  ProjectComponentSpec,
  UpdateProjectComponentInput,
  UpdateProjectInput,
} from "../../../generated/graphql";
import React from "react";
import { CUSTOMER_ROUTES } from "../../constants/loggedInRoutes";
import { useGetCustomerProjectQuery } from "../../gql/get/customer/customer.generated";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useIntl } from "react-intl";
import EditIcon from "@mui/icons-material/Edit";
import { useUpdateProjectMutation } from "../../gql/update/project/project.generated";
import { isValidAlphanumeric, isValidInt } from "../../Utils/inputValidators";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import GoogleMaps from "../../Utils/GoogleMapAutocomplete";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
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

const ProjectDetailListItem = styled(ProjectOverviewListItem)(() => ({
  flexDirection: "column",
  alignItems: "flex-start",
}));

type EditProjectErrors = Record<keyof UpdateProjectInput, boolean>;

const CustomerProjectDetail = () => {
  const theme = useTheme();
  const intl = useIntl();
  const { projectId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  // Flag to indicate whether project detail section is in edit mode or not.
  const [projectEditMode, setProjectEditMode] = useState(false);

  // Flags to indicate which project detail field input is in error.
  const [projectEditError, setProjectEditError] = useState(
    {} as EditProjectErrors
  );

  // const [totalWeightUnit, setTotalWeightUnit] = useState("g");

  // state object to hold data to be updated, will be initialized once projectData fetched
  const [updateProjectData, setUpdateProjectData] =
    useState<UpdateProjectInput | null>(null);

  const [updateProjectComponentData, setUpdateProjectComponentData] = useState<
    UpdateProjectComponentInput[]
  >([]);

  // For project component section.
  const [currentTab, setCurrentTab] = useState(0);

  // State variable to store order quantity input when user enables edit mode on project detail section.
  const [orderQuantity, setOrderQuantity] = useState("");

  const [
    updateProjectMutation,
    { data: updateSuccess, error: updateError, loading: updateLoading },
  ] = useUpdateProjectMutation();

  const {
    data: getProjectData,
    loading: getProjectLoading,
    error: getProjectError,
  } = useGetCustomerProjectQuery({
    variables: {
      data: {
        projectId: projectId || "",
        userId: user!.id,
      },
    },
    fetchPolicy: "no-cache",
  });

  // init project data for potential project update
  useEffect(() => {
    if (getProjectData) {
      initializeUpdateProjectData();
    }
  }, [getProjectData]);

  // For snackbar display purposes based on update mutation status
  useEffect(() => {
    if (getProjectError) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
    if (updateSuccess) {
      setSnackbar({
        message: "success",
        severity: "success",
      });
      setSnackbarOpen(true);
    }
    if (updateError) {
      // In case of an error, we reset the project data to what it was originally.
      initializeUpdateProjectData();
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [getProjectError, updateError, updateSuccess]);

  // Leverage useEffect to set error flags for project detail edit mode.
  useEffect(() => {
    if (updateProjectData) {
      // Since in edit mode, order quantity input is not a direct input field that can be converted to Typography
      // but rather an input for adding to order quantities list we listen for order quantities changes and indicate
      // error when the list is empty.
      if (!updateProjectData.orderQuantities.length) {
        setProjectEditError((prev) => ({ ...prev, orderQuantities: true }));
      } else {
        setProjectEditError((prev) => ({ ...prev, orderQuantities: false }));
      }

      // If user clears deliveryAddress field, display error.
      if (!updateProjectData.deliveryAddress) {
        setProjectEditError((prev) => ({ ...prev, deliveryAddress: true }));
      } else {
        setProjectEditError((prev) => ({ ...prev, deliveryAddress: false }));
      }
    }
  }, [updateProjectData]);

  // Initialize project data for update purpose.
  const initializeUpdateProjectData = () => {
    const {
      id: projectId,
      name,
      category,
      totalWeight,
      deliveryAddress,
      deliveryDate,
      targetPrice,
      orderQuantities,
      components,
    } = getProjectData!.getCustomerProject;

    const compsForUpdate: UpdateProjectComponentInput[] = [];
    for (let comp of components) {
      const { id: componentId, name, componentSpec } = comp;
      const {
        productName,
        dimension,

        flute,
        manufacturingProcess,

        thickness,
        color,
        material,
        materialSource,
        postProcess,
        finish,

        outsideColor,
        outsideMaterial,
        outsideMaterialSource,
        outsidePostProcess,
        outsideFinish,

        insideColor,
        insideMaterial,
        insideMaterialSource,
        insidePostProcess,
        insideFinish,
      } = componentSpec;

      compsForUpdate.push({
        componentId,
        name,
        componentSpec: {
          productName,
          dimension,

          flute,
          manufacturingProcess,

          thickness,
          color,
          material,
          materialSource,
          postProcess,
          finish,

          outsideColor,
          outsideMaterial,
          outsideMaterialSource,
          outsidePostProcess,
          outsideFinish,

          insideColor,
          insideMaterial,
          insideMaterialSource,
          insidePostProcess,
          insideFinish,
        },
      });
    }
    const [weight, unit] = totalWeight.split(" ");

    setUpdateProjectData({
      projectId,
      name,
      category,
      totalWeight: weight,
      deliveryDate,
      deliveryAddress,
      targetPrice,
      orderQuantities,
    });

    setUpdateProjectComponentData(compsForUpdate);
  };

  // Reset error state when user cancels edit mode, else error state will persist when user clicks edit again.
  const resetProjectEditErrors = () => {
    setProjectEditError({} as EditProjectErrors);
  };

  // Switch tab for components detail section.
  const componentTabOnChange = (
    event: React.SyntheticEvent,
    newTab: number
  ) => {
    setCurrentTab(newTab);
  };

  const updateProject = async () => {
    try {
      await updateProjectMutation({
        variables: {
          data: {
            ...updateProjectData!,
            totalWeight: updateProjectData!.totalWeight + " g",
          },
        },
      });
    } finally {
      setProjectEditMode(false);
    }
  };

  const convertToDate = (timestamp: string) => {
    return new Date(parseInt(timestamp, 10)).toISOString().slice(0, 10);
  };

  const backButtonHandler = () => {
    navigate(CUSTOMER_ROUTES.PROJECTS);
  };

  // Render project field based on isEditMode flag.
  const renderEditableProjectField = (
    isEditMode: boolean,
    setData: React.Dispatch<React.SetStateAction<UpdateProjectInput | null>>,
    projectAttribute: keyof UpdateProjectInput,
    projectFieldData: string | number | number[]
  ) => {
    const addOrderQuantity = () => {
      setData(
        (prev) =>
          ({
            ...prev,
            orderQuantities: [
              ...prev!.orderQuantities,
              parseInt(orderQuantity, 10),
            ],
          } as UpdateProjectInput)
      );
      setOrderQuantity("");
    };

    const removeOrderQuantity = (ind: number) => {
      setData((prev) => {
        const cur = [...prev!.orderQuantities];
        cur.splice(ind, 1);
        return {
          ...prev,
          orderQuantities: cur,
        } as UpdateProjectInput;
      });
    };

    // TODO: put the conversion map to constants file
    const map: any = {
      makeups: { label: "makeups", value: "makeups" },
      electronics: { label: "electronics", value: "electronics" },
      "consumer goods": { label: "consumer goods", value: "consumer goods" },
    };
    const getCategoryTranslatableAttribute = (category: any) => {
      return map[category];
    };
    // Used for direct text input including projectName targetPrice, totalWeight
    const renderTextField = (InputProps?: Partial<InputProps>) => {
      return (
        <TextField
          error={!!projectEditError[projectAttribute]}
          helperText={
            !!projectEditError[projectAttribute] &&
            intl.formatMessage({ id: "app.general.input.emptyError" })
          }
          onChange={onChange}
          value={projectFieldData}
          size="small"
          sx={{
            ml: 2,
            "& .MuiInputBase-root": {
              height: "2em",
            },
          }}
          FormHelperTextProps={{
            sx: {
              margin: 0,
              fontSize: "0.7em",
            },
          }}
          InputProps={InputProps}
        />
      );
    };

    const renderCategoryDropdown = () => {
      // We use defaultValue here since it is an uncontrolled dropdown. If we use value here, it will never changed since it's uncontrolled.
      return (
        <Autocomplete
          sx={{ width: 300 }}
          options={[
            { label: "electronics", value: "electronics" },
            { label: "makeups", value: "makeups" },
            { label: "consumer goods", value: "consumer goods" },
          ]}
          defaultValue={getCategoryTranslatableAttribute(
            projectFieldData as string
          )}
          autoHighlight
          onChange={(e, v) => {
            if (!v) {
              setProjectEditError((prev) => ({
                ...prev,
                category: true,
              }));
              return;
            }
            setProjectEditError((prev) => ({
              ...prev,
              category: false,
            }));
            setData(
              (prev) =>
                ({
                  ...prev,
                  category: v.value,
                } as UpdateProjectInput)
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
              sx={{
                ml: 2,
              }}
              InputLabelProps={{
                sx: {
                  fontSize: 16,
                  top: -7,
                },
              }}
              error={!!projectEditError[projectAttribute]}
              helperText={
                !!projectEditError[projectAttribute] &&
                intl.formatMessage({ id: "app.general.input.emptyError" })
              }
            />
          )}
        />
      );
    };

    const renderDatePicker = () => {
      return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DesktopDatePicker
            disablePast
            inputFormat="YYYY-MM-DD"
            value={projectFieldData}
            onChange={(v: any) => {
              if (!v || !v._isValid) {
                setProjectEditError((prev) => ({
                  ...prev,
                  deliveryDate: true,
                }));
                return;
              }
              setProjectEditError((prev) => ({ ...prev, deliveryDate: false }));
              setData(
                (prev) =>
                  ({
                    ...prev,
                    deliveryDate: new Date(v._d).toISOString().split("T")[0],
                  } as UpdateProjectInput)
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!projectEditError.deliveryDate}
                helperText={
                  !!projectEditError.deliveryDate &&
                  intl.formatMessage({ id: "app.general.input.dateError" })
                }
                name="deliveryDate"
                size="small"
                sx={{
                  ml: 2,
                  "& .MuiInputBase-root": {
                    height: "2em",
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
      );
    };

    const renderGoogleMapInput = () => {
      return (
        <Box ml={2} width="100%">
          <GoogleMaps
            parentSetDataHandler={deliveryAddressOnChange}
            height="2em"
            defaultAddress={projectFieldData as string}
            error={!!projectEditError.deliveryAddress}
            errorHelperText={
              !!projectEditError.deliveryAddress
                ? intl.formatMessage({ id: "app.general.input.emptyError" })
                : ""
            }
          />
        </Box>
      );
    };

    const renderOrderQuantities = () => {
      return (
        <>
          <Box display="flex" flexDirection="row" ml={2}>
            <Box>
              <TextField
                onChange={orderQuantityOnChange}
                value={orderQuantity}
                size="small"
                sx={{
                  "& .MuiInputBase-root": {
                    height: "2em",
                  },
                }}
                error={!!projectEditError.orderQuantities}
                helperText={
                  !!projectEditError.orderQuantities &&
                  intl.formatMessage({
                    id: "app.customer.projectDetail.error.orderQuantity.helperText",
                  })
                }
                FormHelperTextProps={{
                  sx: {
                    margin: 0,
                    fontSize: "0.7em",
                  },
                }}
              />
            </Box>
            <Box>
              <IconButton onClick={addOrderQuantity} disabled={!orderQuantity}>
                <AddCircleIcon />
              </IconButton>
            </Box>
          </Box>
          {!!(projectFieldData as number[]).length && (
            <List>
              {(projectFieldData as number[]).map((quantity, i) => {
                return (
                  <ListItem>
                    <Typography variant="caption">{quantity}</Typography>
                    <IconButton onClick={() => removeOrderQuantity(i)}>
                      <CancelIcon />
                    </IconButton>
                  </ListItem>
                );
              })}
            </List>
          )}
        </>
      );
    };

    const orderQuantityOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let val: string | number = e.target.value;
      let isAllowed = false;

      if (isValidInt(val)) {
        isAllowed = true;
      }

      if (isAllowed) {
        setOrderQuantity(val);
      }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let val: string | number = e.target.value;
      let isAllowed = false;
      switch (projectAttribute) {
        case "name":
          if (isValidAlphanumeric(val)) {
            isAllowed = true;
          }
          break;
        case "totalWeight":
          if (isValidInt(val)) {
            isAllowed = true;
          }
          break;
        case "targetPrice":
          if (isValidInt(val)) {
            isAllowed = true;
            val = parseInt(val, 10) || "";
          }
          break;

        default:
          break;
      }
      if (isAllowed) {
        if (val === "") {
          setProjectEditError((prev) => ({
            ...prev,
            [projectAttribute]: true,
          }));
        } else {
          setProjectEditError((prev) => ({
            ...prev,
            [projectAttribute]: false,
          }));
        }
        setData(
          (prev) =>
            ({
              ...prev,
              [projectAttribute]: val,
            } as UpdateProjectInput)
        );
      }
    };

    const deliveryAddressOnChange = (deliveryAddress: string) => {
      setData((prev) => ({
        ...prev!,
        deliveryAddress,
      }));
    };

    let res: JSX.Element | null = null;
    // TODO: handle empty input

    switch (projectAttribute) {
      case "name":
      case "targetPrice":
        res = renderTextField();
        break;
      case "category":
        res = renderCategoryDropdown();
        break;
      case "totalWeight":
        res = renderTextField({
          endAdornment: <InputAdornment position="end">g</InputAdornment>,
        });
        break;
      case "deliveryDate":
        res = renderDatePicker();
        break;
      case "deliveryAddress":
        res = renderGoogleMapInput();
        break;
      case "orderQuantities":
        res = renderOrderQuantities();
        break;
      default:
        break;
    }

    if (isEditMode) {
      return res;
    }

    if (Array.isArray(projectFieldData)) {
      return (
        <Typography variant="caption">{projectFieldData.join(", ")}</Typography>
      );
    }

    let fieldString = projectFieldData;
    if (projectAttribute === "totalWeight") {
      fieldString += " g";
    }
    return <Typography variant="caption">{fieldString}</Typography>;
  };

  const renderVendorBidOverview = (
    bids: ProjectBid[],
    projectComponents: ProjectComponent[]
  ) => {
    return bids.map((bid) => {
      return (
        <ListItem sx={{ pl: 0 }}>
          <VendorBidOverview bid={bid} projectComponents={projectComponents} />
        </ListItem>
      );
    });
  };

  const renderAttributeTitle = (attr: string) => {
    return <Typography variant="subtitle2">{attr}</Typography>;
  };
  const shouldDisableEditConfirmButton = () => {
    for (let key in projectEditError) {
      if (projectEditError[key as keyof UpdateProjectInput]) return true;
    }
    return false;
  };

  const isLoading = getProjectLoading || updateLoading;

  const projectData = getProjectData?.getCustomerProject;
  const bids = projectData?.bids;

  if (projectData && updateProjectData) {
    return (
      <Container>
        {isLoading && <FullScreenLoading />}
        <Container disableGutters style={{ textAlign: "left" }}>
          <IconButton onClick={backButtonHandler}>
            <KeyboardBackspaceIcon />
          </IconButton>
        </Container>

        <Grid container spacing={2}>
          {/* BID SECTION */}
          <Grid item xs={4}>
            <Box>
              <Typography variant="h6" textAlign="left">
                {intl.formatMessage({
                  id: "app.customer.projects.vendorBids",
                })}
              </Typography>
            </Box>
            <List sx={{ maxHeight: 500, overflow: "scroll" }}>
              {bids && renderVendorBidOverview(bids, projectData.components)}
            </List>
          </Grid>

          {/* PROJECT SECTION */}
          <Grid item xs={8}>
            <Box>
              <Typography variant="h6" textAlign="left">
                {intl.formatMessage({
                  id: "app.customer.projects.projectDetail",
                })}
              </Typography>
            </Box>
            <Paper sx={{ padding: 3, position: "relative" }} elevation={1}>
              <IconButton
                sx={{ position: "absolute", top: 10, right: 10, zIndex: 9 }}
                onClick={() => setProjectEditMode(true)}
              >
                <Tooltip
                  title={intl.formatMessage({ id: "app.general.action.edit" })}
                  placement="left"
                >
                  <EditIcon color="action" />
                </Tooltip>
              </IconButton>
              <List>
                <ProjectDetailListItem>
                  {renderAttributeTitle(
                    intl.formatMessage({ id: "app.project.attribute.name" })
                  )}
                  {renderEditableProjectField(
                    projectEditMode,
                    setUpdateProjectData,
                    "name",
                    updateProjectData.name!
                  )}
                </ProjectDetailListItem>

                <ProjectDetailListItem>
                  {renderAttributeTitle(
                    intl.formatMessage({ id: "app.project.attribute.category" })
                  )}
                  {renderEditableProjectField(
                    projectEditMode,
                    setUpdateProjectData,
                    "category",
                    updateProjectData.category!
                  )}
                </ProjectDetailListItem>

                <ProjectDetailListItem>
                  {renderAttributeTitle(
                    intl.formatMessage({
                      id: "app.project.attribute.totalWeight",
                    })
                  )}
                  {renderEditableProjectField(
                    projectEditMode,
                    setUpdateProjectData,
                    "totalWeight",
                    updateProjectData.totalWeight!
                  )}
                </ProjectDetailListItem>

                <ProjectDetailListItem>
                  {renderAttributeTitle(
                    intl.formatMessage({
                      id: "app.project.attribute.deliveryDate",
                    })
                  )}

                  {renderEditableProjectField(
                    projectEditMode,
                    setUpdateProjectData,
                    "deliveryDate",
                    updateProjectData.deliveryDate!
                  )}
                </ProjectDetailListItem>
                <ProjectDetailListItem>
                  {renderAttributeTitle(
                    intl.formatMessage({
                      id: "app.project.attribute.deliveryAddress",
                    })
                  )}

                  {renderEditableProjectField(
                    projectEditMode,
                    setUpdateProjectData,
                    "deliveryAddress",
                    updateProjectData.deliveryAddress!
                  )}
                </ProjectDetailListItem>

                {projectData.design && (
                  <ProjectDetailListItem>
                    {renderAttributeTitle(
                      intl.formatMessage({
                        id: "app.project.attribute.design",
                      })
                    )}

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
                  {renderAttributeTitle(
                    intl.formatMessage({
                      id: "app.project.attribute.targetPrice",
                    })
                  )}
                  {renderEditableProjectField(
                    projectEditMode,
                    setUpdateProjectData,
                    "targetPrice",
                    updateProjectData.targetPrice!
                  )}
                </ProjectDetailListItem>
                <ProjectDetailListItem>
                  {renderAttributeTitle(
                    intl.formatMessage({
                      id: "app.project.attribute.orderQuantities",
                    })
                  )}
                  {renderEditableProjectField(
                    projectEditMode,
                    setUpdateProjectData,
                    "orderQuantities",
                    updateProjectData.orderQuantities!
                  )}
                </ProjectDetailListItem>
                <ProjectDetailListItem>
                  {renderAttributeTitle(
                    intl.formatMessage({
                      id: "app.general.createdAt",
                    })
                  )}
                  <Typography variant="caption">
                    {convertToDate(projectData.createdAt)}
                  </Typography>
                </ProjectDetailListItem>
                <ProjectDetailListItem>
                  {renderAttributeTitle(
                    intl.formatMessage({
                      id: "app.general.updatedAt",
                    })
                  )}
                  <Typography variant="caption">
                    {convertToDate(projectData.updatedAt)}
                  </Typography>
                </ProjectDetailListItem>
              </List>
              {projectEditMode && (
                <Stack
                  sx={{ position: "absolute", bottom: 10, right: 10 }}
                  direction="row"
                  spacing={2}
                >
                  <Button
                    variant="text"
                    onClick={() => {
                      initializeUpdateProjectData();
                      resetProjectEditErrors();
                      setProjectEditMode(false);
                    }}
                  >
                    {intl.formatMessage({ id: "app.general.cancel" })}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => updateProject()}
                    disabled={shouldDisableEditConfirmButton()}
                  >
                    {intl.formatMessage({ id: "app.general.confirm" })}
                  </Button>
                </Stack>
              )}
            </Paper>

            {/* COMPONENTS SECTION */}
            <Box mt={5}>
              <Typography variant="h6" textAlign="left">
                {intl.formatMessage({
                  id: "app.customer.projects.componentsDetail",
                })}
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
                    <ComponentSpecDetail spec={comp.componentSpec} />
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
