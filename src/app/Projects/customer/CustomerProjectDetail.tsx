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
  CreateProjectInput,
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
import {
  isValidAlphanumeric,
  isValidFloat,
  isValidInt,
} from "../../Utils/inputValidators";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import GoogleMaps from "../../Utils/GoogleMapAutocomplete";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ComponentSpecDetail from "../common/ComponentSpecDetail";
import ProjectCategoryDropdown from "../../Utils/ProjectCategoryDropdown";

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

      // If user clears category field, display error.
      if (!updateProjectData.category) {
        setProjectEditError((prev) => ({ ...prev, category: true }));
      } else {
        setProjectEditError((prev) => ({ ...prev, category: false }));
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
      comments,
    } = getProjectData!.getCustomerProject;

    const compsForUpdate: UpdateProjectComponentInput[] = [];
    for (let comp of components) {
      const { id: componentId, name, componentSpec, designs } = comp;
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
        outsideFinish,

        insideColor,
        insideMaterial,
        insideMaterialSource,
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
          outsideFinish,

          insideColor,
          insideMaterial,
          insideMaterialSource,
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
      comments,
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

  const backButtonHandler = () => {
    navigate(CUSTOMER_ROUTES.PROJECTS);
  };

  // Render project field based on isEditMode flag.
  const renderEditableProjectField = (
    isEditMode: boolean,
    setData: React.Dispatch<React.SetStateAction<UpdateProjectInput | null>>,
    projectAttribute: keyof UpdateProjectInput,
    projectFieldData: string | number | number[],
    multiline = false,
    draggable = false
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

    // Used for direct text input including projectName targetPrice, totalWeight, comments
    const renderTextField = (InputProps?: Partial<InputProps>) => {
      return (
        <TextField
          error={!!projectEditError[projectAttribute]}
          helperText={
            !!projectEditError[projectAttribute] &&
            intl.formatMessage({ id: "app.general.input.emptyError" })
          }
          multiline={multiline}
          draggable={draggable}
          onChange={onChange}
          value={projectFieldData}
          // size="small"
          sx={{
            ml: 2,
            // "& .MuiInputBase-root": {
            //   height: "2em",
            // },
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
      if (!updateProjectData) return null;

      // We use defaultValue here since it is an uncontrolled dropdown. If we use value here, it will never changed since it's uncontrolled.
      return (
        <Box ml={2} width="100%">
          <ProjectCategoryDropdown
            defaultCategory={updateProjectData!.category}
            parentSetDataCallback={(category: string) => {
              setData((prev) => ({ ...prev!, category }));
            }}
            error={!!projectEditError.category}
            errorHelperText={
              !!projectEditError.category
                ? intl.formatMessage({ id: "app.general.input.emptyError" })
                : ""
            }
          />
        </Box>
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
            width={400}
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
      if (!updateProjectData) return null;

      return (
        <>
          <Autocomplete
            options={[]}
            freeSolo
            multiple
            value={[...updateProjectData.orderQuantities]}
            inputValue={orderQuantity}
            onInputChange={(e, v) => orderQuantityOnChange(v)}
            onBlur={() => {
              if (orderQuantity) {
                setUpdateProjectData((prev) => ({
                  ...prev!,
                  orderQuantities: [...prev!.orderQuantities, +orderQuantity],
                }));
              }
              setOrderQuantity("");
            }}
            onChange={(e, v) => {
              if (!v) {
                setUpdateProjectData((prev) => ({
                  ...prev!,
                  orderQuantities: [],
                }));
              } else {
                setUpdateProjectData((prev) => ({
                  ...prev!,
                  orderQuantities: v.map((v) => +v),
                }));
              }
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  autoComplete="new-password"
                  type="tel"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                  InputLabelProps={{
                    sx: {
                      fontSize: 16,
                      top: -7,
                    },
                  }}
                  sx={{
                    ml: 2,
                  }}
                  error={!!projectEditError.orderQuantities}
                  helperText={
                    !!projectEditError.orderQuantities &&
                    intl.formatMessage({
                      id: "app.customer.projectDetail.error.orderQuantity.helperText",
                    })
                  }
                />
              );
            }}
            renderOption={() => null}
          />
        </>
      );
    };

    const orderQuantityOnChange = (val: string) => {
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
        case "comments":
          if (isValidAlphanumeric(val)) {
            isAllowed = true;
          }
          break;
        case "totalWeight":
        case "targetPrice":
          if (isValidFloat(val)) {
            isAllowed = true;
          }
          break;

        default:
          break;
      }

      if (isAllowed) {
        if (val === "") {
          // comments is allowed to be empty
          if (projectAttribute !== "comments") {
            setProjectEditError((prev) => ({
              ...prev,
              [projectAttribute]: true,
            }));
          }
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
      case "comments":
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
    if (projectAttribute === "targetPrice") {
      fieldString = parseFloat(fieldString as string);
    }
    return <Typography variant="caption">{fieldString}</Typography>;
  };

  const renderVendorBidOverview = (
    bids: ProjectBid[],
    projectComponents: ProjectComponent[]
  ) => {
    return bids.map((bid, i) => {
      return (
        <ListItem sx={{ pl: 0 }} key={i}>
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

  if (isLoading) return <FullScreenLoading />;

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
          {/* PROJECT SECTION */}
          <Grid item xs={8}>
            <Paper sx={{ padding: 3, position: "relative" }} elevation={1}>
              <Box>
                <Typography variant="h6" textAlign="left">
                  {intl.formatMessage({
                    id: "app.customer.projects.projectDetail",
                  })}
                </Typography>
              </Box>
              <IconButton
                sx={{ position: "absolute", top: 10, right: 10, zIndex: 2 }}
                onClick={() => setProjectEditMode(true)}
              >
                <Tooltip
                  title={intl.formatMessage({ id: "app.general.edit" })}
                  placement="left"
                >
                  <EditIcon color="action" />
                </Tooltip>
              </IconButton>
              <Box display="flex" justifyContent="space-between">
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
                      intl.formatMessage({
                        id: "app.project.attribute.category",
                      })
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
                </List>
                <List>
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
                      {projectData.createdAt.slice(0, 10)}
                    </Typography>
                  </ProjectDetailListItem>
                  <ProjectDetailListItem>
                    {renderAttributeTitle(
                      intl.formatMessage({
                        id: "app.general.updatedAt",
                      })
                    )}
                    <Typography variant="caption">
                      {projectData.updatedAt.slice(0, 10)}
                    </Typography>
                  </ProjectDetailListItem>

                  {!!projectData.comments && (
                    <ProjectDetailListItem>
                      {renderAttributeTitle(
                        intl.formatMessage({
                          id: "app.project.attribute.comments",
                        })
                      )}

                      {renderEditableProjectField(
                        projectEditMode,
                        setUpdateProjectData,
                        "comments",
                        updateProjectData.comments!,
                        true,
                        true
                      )}
                    </ProjectDetailListItem>
                  )}
                </List>
              </Box>
              {/* COMPONENTS SECTION */}
              <Box mt={5}>
                <Typography variant="h6" textAlign="left">
                  {intl.formatMessage({
                    id: "app.customer.projects.componentsDetail",
                  })}
                </Typography>
              </Box>

              {/* <Paper sx={{ mt: 1 }}> */}
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={currentTab} onChange={componentTabOnChange}>
                  {projectData.components.map((comp, i) => {
                    return <Tab label={comp.name} key={i} />;
                  })}
                </Tabs>
              </Box>
              {projectData.components.map((comp, i) => {
                return (
                  <TabPanel value={currentTab} index={i} key={i}>
                    <ComponentSpecDetail
                      spec={comp.componentSpec}
                      designs={comp.designs}
                    />
                  </TabPanel>
                );
              })}
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
          </Grid>

          {/* BID SECTION */}
          <Grid item xs={3}>
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
        </Grid>
      </Container>
    );
  }
  return null;
};

export default CustomerProjectDetail;
