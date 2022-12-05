import { Cancel } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Container,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import {
  CreateProjectComponentInput,
  CreateProjectComponentSpecInput,
  CreateProjectInput,
  ProjectDesign,
} from "../../../../../../generated/graphql";
import {
  PRODUCT_NAME_CORRUGATE_BOX,
  ALL_PRODUCT_NAMES,
  PRODUCT_NAME_RIGID_BOX,
  RIGID_BOX_MATERIALS,
  RIGID_BOX_POST_PROCESSES,
  RIGID_BOX_MATERIAL_SOURCES,
  RIGID_BOX_FINISHES,
  POST_PROCESS_PRINTING,
  POST_PROCESS_DEBOSS,
  POST_PROCESS_EMBOSS,
  POST_PROCESS_FOIL_STAMP,
  PRODUCT_NAME_FOLDING_CARTON,
  PRODUCT_NAME_SLEEVE,
  PRODUCT_NAME_MOLDED_FIBER_TRAY,
  PRODUCT_NAME_PAPER_TUBE,
  productValueToLabelMap,
  DEFAULT_RIGID_BOX_SPEC,
  DEFAULT_FOLDING_CARTON_SPEC,
  DEFAULT_PAPER_TUBE_SPEC,
  DEFAULT_SLEEVE_SPEC,
  DEFAULT_CORRUGATE_BOX_SPEC,
  DEFAULT_MOLDED_FIBER_TRAY_SPEC,
  PRODUCT_NAME_BOOKLET,
  PRODUCT_NAME_CORRUGATE_TRAY,
  PRODUCT_NAME_PAPER_TRAY,
  PRODUCT_NAME_STICKER,
  DEFAULT_CORRUGATE_TRAY_SPEC,
  DEFAULT_PAPER_TRAY_SPEC,
  DEFAULT_STICKER_SPEC,
  DEFAULT_BOOKLET_SPEC,
} from "../../../../../constants/products";
import { useDeleteProjectDesignMutation } from "../../../../../gql/delete/project/project.generated";
import AttachmentButton from "../../../../../Utils/AttachmentButton";
import useCustomSnackbar from "../../../../../Utils/CustomSnackbar";
import { isValidAlphanumeric } from "../../../../../Utils/inputValidators";
import { openLink } from "../../../../../Utils/openLink";
import UploadDesign from "../../../UploadDesign";
import BookletSubSection from "../subsections/BookletSubSection";
import CorrugateBoxSubSection from "../subsections/CorrugateBoxSubSection";
import CorrugateTraySubSection from "../subsections/CorrugateTraySubSection";
import FoldingCartonSubSection from "../subsections/FoldingCartonSubSection";
import MoldedFiberSubSection from "../subsections/MoldedFiberSubSection";
import PaperTraySubSection from "../subsections/PaperTraySubSection";
import PaperTubeSubSection from "../subsections/PaperTubeSubSection";
import RigidBoxSubSection from "../subsections/RigidBoxSubSection";
import SleeveSubSection from "../subsections/SleeveSubSection";
import StickerSubSection from "../subsections/StickerSubSection";

const getComponentSpecDefaultState = (
  productName: string
): CreateProjectComponentSpecInput => {
  switch (productName) {
    case PRODUCT_NAME_RIGID_BOX.value:
      return DEFAULT_RIGID_BOX_SPEC;
    case PRODUCT_NAME_FOLDING_CARTON.value:
      return DEFAULT_FOLDING_CARTON_SPEC;
    case PRODUCT_NAME_PAPER_TUBE.value:
      return DEFAULT_PAPER_TUBE_SPEC;
    case PRODUCT_NAME_SLEEVE.value:
      return DEFAULT_SLEEVE_SPEC;
    case PRODUCT_NAME_CORRUGATE_BOX.value:
      return DEFAULT_CORRUGATE_BOX_SPEC;
    case PRODUCT_NAME_MOLDED_FIBER_TRAY.value:
      return DEFAULT_MOLDED_FIBER_TRAY_SPEC;
    case PRODUCT_NAME_CORRUGATE_TRAY.value:
      return DEFAULT_CORRUGATE_TRAY_SPEC;
    case PRODUCT_NAME_PAPER_TRAY.value:
      return DEFAULT_PAPER_TRAY_SPEC;
    case PRODUCT_NAME_STICKER.value:
      return DEFAULT_STICKER_SPEC;
    case PRODUCT_NAME_BOOKLET.value:
      return DEFAULT_BOOKLET_SPEC;
  }
  return {} as CreateProjectComponentSpecInput;
};

const CreateProjectComponentModal = ({
  setProjectData,
  setComponentModalOpen,
  setComponentsDesigns,
  setComponentIndexToEdit,
  setTemporaryDesignIdsToDelete,
  componentModalOnClose,
  projectData,
  existingDesigns,
  defaultComponentIndex,
}: {
  setProjectData: React.Dispatch<
    React.SetStateAction<Partial<CreateProjectInput>>
  >;
  setComponentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setComponentsDesigns: React.Dispatch<React.SetStateAction<ProjectDesign[][]>>;
  setComponentIndexToEdit: React.Dispatch<React.SetStateAction<number | null>>;
  setTemporaryDesignIdsToDelete: React.Dispatch<React.SetStateAction<string[]>>;
  componentModalOnClose: () => void;
  projectData: Partial<CreateProjectInput>;
  existingDesigns?: ProjectDesign[];
  defaultComponentIndex?: number;
}) => {
  const theme = useTheme();
  const intl = useIntl();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  const [
    deleteDesignMutation,
    { error: deleteDesignError, loading: deleteDesignLoading },
  ] = useDeleteProjectDesignMutation();

  // keep a local componentSpec so that when user is editing and decides to cancel, we don't change the projectData
  // only when user decides to add/save then we will change the projectData state
  const [componentSpec, setComponentSpec] =
    useState<CreateProjectComponentSpecInput>(
      {} as CreateProjectComponentSpecInput
    );

  const [componentData, setComponentData] =
    useState<CreateProjectComponentInput>({} as CreateProjectComponentInput);

  const [componentDesigns, setComponentDesigns] = useState<ProjectDesign[]>([]);

  useEffect(() => {
    if (deleteDesignError) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [deleteDesignError]);

  useEffect(() => {
    if (defaultComponentIndex !== undefined) {
      const comp = projectData.components![defaultComponentIndex];
      setComponentData(comp);
      setComponentSpec(comp.componentSpec);
      setComponentDesigns(existingDesigns ? existingDesigns : []);
    }
  }, [defaultComponentIndex]);

  const cancelOnClick = () => {
    if (defaultComponentIndex !== undefined) {
      setTemporaryDesignIdsToDelete([]);
    } else {
      if (componentDesigns.length) {
        deleteComponentDesigns();
      }
    }
    componentModalOnClose();
  };

  const addComponent = () => {
    // construct CreateProjectComponentInput
    const comp: CreateProjectComponentInput = {
      ...componentData,
      designIds: componentDesigns?.map((d) => d.fileId),
      componentSpec: {
        ...componentSpec,
      },
    };
    // add component to projectData
    setProjectData({
      ...projectData,
      components: [...projectData.components!, comp],
    });

    setComponentsDesigns((prev) => [...prev, componentDesigns]);

    // close component modal
    setComponentModalOpen(false);
  };

  const saveComponent = () => {
    // construct CreateProjectComponentInput
    const comp: CreateProjectComponentInput = {
      ...componentData,
      designIds: componentDesigns?.map((d) => d.fileId),
      componentSpec: {
        ...componentSpec,
      },
    };
    const components = [...projectData.components!];
    components[defaultComponentIndex!] = comp;
    // add component to projectData
    setProjectData({
      ...projectData,
      components,
    });

    setComponentsDesigns((prev) => {
      const allExistingDesigns = [...prev];

      allExistingDesigns[defaultComponentIndex!] = componentDesigns;
      return allExistingDesigns;
    });

    // clear component-for-edit index so user can start clean if they click create component again
    setComponentIndexToEdit(null);

    // close component modal
    setComponentModalOpen(false);
  };

  const componentInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let isAllowed = true;

    switch (e.target.name) {
      case "name":
        isAllowed = isValidAlphanumeric(val);
        break;
      default:
        break;
    }
    if (isAllowed) {
      setComponentData({
        ...componentData,
        [e.target.name]: val,
      });
    }
  };

  // TODO: finish implementation
  // check if component modal add button should be disabled
  const shouldDisableComponentModalAddOrSaveButton = () => {
    // check each required spec is filled
    return false;

    const isInvalidComponentDimension = () => {
      if (
        !componentData.componentSpec ||
        !componentData.componentSpec.productName
      ) {
        return true;
      }

      switch (componentData.componentSpec.productName) {
        case PRODUCT_NAME_FOLDING_CARTON.value:
          return (
            Object.values(componentData.componentSpec.dimension).filter(
              (d) => !!d
            ).length !== 3
          );
        default:
          return false;
      }
    };

    const isInvalidComponentSpec = () => {
      if (Object.keys(componentSpec).length === 0) return true;

      for (let key in componentSpec) {
        const attribute: keyof CreateProjectComponentSpecInput =
          key as keyof CreateProjectComponentSpecInput;

        if (attribute === "dimension") {
          if (isInvalidComponentDimension()) return true;
        }

        const val = componentSpec[attribute];

        if (
          val !== undefined &&
          val !== null &&
          typeof val !== "boolean" &&
          typeof val !== "object"
        ) {
          if (val.length === 0) return true;
        }
      }
      return false;
    };

    if (isInvalidComponentSpec()) return true;

    for (let key in componentData) {
      if (key === "componentSpec" || key === "designIds") {
        continue;
      }
      if (
        (componentData[key as keyof CreateProjectComponentInput] as string)
          .length === 0
      )
        return true;
    }
    return false;
  };

  const renderProductsDropdown = () => {
    const getDefaultProduct = () => {
      if (defaultComponentIndex !== undefined) {
        return productValueToLabelMap[
          projectData.components![defaultComponentIndex].componentSpec
            .productName
        ];
      }
      return null;
    };

    return (
      <Autocomplete
        sx={{ width: 200 }}
        options={ALL_PRODUCT_NAMES}
        autoHighlight
        defaultValue={getDefaultProduct()}
        onChange={(e, v) => {
          if (!v) {
            setComponentSpec({} as CreateProjectComponentSpecInput);
            return;
          }
          setComponentSpec((spec) => {
            return getComponentSpecDefaultState(v.value);
          });
          setComponentIndexToEdit(null);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={intl.formatMessage({
              id: "app.component.attribute.product",
            })}
            name=""
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password",
            }}
            InputLabelProps={{
              sx: {
                fontSize: 16,
                top: -7,
              },
            }}
          />
        )}
      />
    );
  };

  // callback passed into UploadDesign component to add/empty the local designs array
  const setDesigns = (file: ProjectDesign | null) => {
    if (!file) {
      setComponentDesigns([]);
    } else {
      setComponentDesigns([...componentDesigns, file]);
    }
  };

  const deleteComponentDesigns = () => {
    if (componentData.designIds) {
      Promise.all(
        componentData.designIds.map((id) => {
          return deleteDesignMutation({
            variables: {
              data: {
                fileId: id,
              },
            },
          });
        })
      );
    }
  };

  const deleteDesign = async (id: string, ind: number) => {
    try {
      // if the deleted design is an existing one
      if (
        existingDesigns &&
        existingDesigns.find((design) => design.fileId === id)
      ) {
        setTemporaryDesignIdsToDelete((prev) => [...prev, id]);
      } else {
        await deleteDesignMutation({
          variables: {
            data: {
              fileId: id,
            },
          },
        });
      }
      setComponentDesigns((prev) => {
        const prevDesigns = [...prev!];
        prevDesigns.splice(ind, 1);
        return prevDesigns;
      });
    } catch (error) {}
  };

  const renderDesignFiles = () => {
    const hasDesigns = componentDesigns && componentDesigns.length;

    return hasDesigns ? (
      <ListItem sx={{ pt: 0, mt: 0 }}>
        <List sx={{ pt: 0 }}>
          {componentDesigns.map((file, i) => {
            return (
              <ListItem sx={{ p: 0 }}>
                <AttachmentButton
                  label={file.filename}
                  onClick={() => openLink(file.url)}
                />
                <IconButton onClick={() => deleteDesign(file.fileId, i)}>
                  <Cancel fontSize="small" />
                </IconButton>
              </ListItem>
            );
          })}
        </List>
      </ListItem>
    ) : (
      <ListItem>
        <Typography variant="caption" color={theme.palette.text.disabled}>
          {intl.formatMessage({
            id: "app.customer.createProject.noDesignPlaceholder",
          })}
        </Typography>
      </ListItem>
    );
  };

  const renderSubSection = () => {
    if (!Object.keys(componentSpec).length) return null;

    switch (componentSpec.productName) {
      case PRODUCT_NAME_RIGID_BOX.value:
        return (
          <RigidBoxSubSection
            componentSpec={componentSpec}
            setComponentSpec={setComponentSpec}
          />
        );
      case PRODUCT_NAME_FOLDING_CARTON.value:
        return (
          <FoldingCartonSubSection
            componentSpec={componentSpec}
            setComponentSpec={setComponentSpec}
          />
        );
      case PRODUCT_NAME_PAPER_TUBE.value:
        return (
          <PaperTubeSubSection
            componentSpec={componentSpec}
            setComponentSpec={setComponentSpec}
          />
        );
      case PRODUCT_NAME_SLEEVE.value:
        return (
          <SleeveSubSection
            componentSpec={componentSpec}
            setComponentSpec={setComponentSpec}
          />
        );
      case PRODUCT_NAME_CORRUGATE_BOX.value:
        return (
          <CorrugateBoxSubSection
            componentSpec={componentSpec}
            setComponentSpec={setComponentSpec}
          />
        );
      case PRODUCT_NAME_MOLDED_FIBER_TRAY.value:
        return (
          <MoldedFiberSubSection
            componentSpec={componentSpec}
            setComponentSpec={setComponentSpec}
          />
        );
      case PRODUCT_NAME_BOOKLET.value:
        return (
          <BookletSubSection
            componentSpec={componentSpec}
            setComponentSpec={setComponentSpec}
          />
        );
      case PRODUCT_NAME_CORRUGATE_TRAY.value:
        return (
          <CorrugateTraySubSection
            componentSpec={componentSpec}
            setComponentSpec={setComponentSpec}
          />
        );

      case PRODUCT_NAME_PAPER_TRAY.value:
        return (
          <PaperTraySubSection
            componentSpec={componentSpec}
            setComponentSpec={setComponentSpec}
          />
        );

      case PRODUCT_NAME_STICKER.value:
        return (
          <StickerSubSection
            componentSpec={componentSpec}
            setComponentSpec={setComponentSpec}
          />
        );
    }
  };
  return (
    <>
      <Container
        sx={{ paddingTop: 5, paddingBottom: 5, width: "580px", ml: 2 }}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", fontWeight: 600 }}
          >
            {intl.formatMessage({
              id: "app.customer.createProject.configureComponentDetail",
            })}
          </Typography>
          <Box margin={1}>
            <Button variant="outlined" sx={{ mr: 1 }} onClick={cancelOnClick}>
              {intl.formatMessage({ id: "app.general.cancel" })}
            </Button>
            {defaultComponentIndex === undefined ? (
              <Button
                onClick={addComponent}
                disabled={shouldDisableComponentModalAddOrSaveButton()}
                variant="contained"
              >
                {intl.formatMessage({ id: "app.general.add" })}
              </Button>
            ) : (
              <Button
                onClick={saveComponent}
                disabled={shouldDisableComponentModalAddOrSaveButton()}
                variant="contained"
              >
                {intl.formatMessage({ id: "app.general.save" })}
              </Button>
            )}
          </Box>
        </Box>
        <Divider />
        <Stack spacing={5} mt={2}>
          <Stack>
            <ListItem>
              <Typography variant="subtitle2">
                {intl.formatMessage({
                  id: "app.customer.createProject.componentDetail",
                })}
              </Typography>
            </ListItem>
            <ListItem>
              <TextField
                autoComplete="new-password"
                label={intl.formatMessage({
                  id: "app.component.attribute.name",
                })}
                onChange={componentInputOnChange}
                name="name"
                value={componentData.name}
              />
            </ListItem>
            <ListItem>{renderProductsDropdown()}</ListItem>
          </Stack>
          <Stack>
            <ListItem>
              {!!deleteDesignLoading && <CircularProgress size={16} />}
              <Typography variant="subtitle2">
                {intl.formatMessage({
                  id: "app.component.attribute.designs",
                })}
              </Typography>
              <UploadDesign
                setComponentData={setComponentData}
                parentSetDesigns={[setDesigns]}
              />
            </ListItem>
            {renderDesignFiles()}
          </Stack>
          {renderSubSection()}
        </Stack>
      </Container>
    </>
  );
};

export default CreateProjectComponentModal;
