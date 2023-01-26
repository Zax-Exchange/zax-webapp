import { Cancel, InfoOutlined } from "@mui/icons-material";
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
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import {
  CreateProjectComponentInput,
  CreateProjectComponentSpecInput,
  PostProcessDetailInput,
  ProjectDesign,
  UpdateProjectComponentData,
  UpdateProjectComponentSpecData,
} from "../../../../../generated/graphql";
import {
  ALL_PRODUCT_NAMES,
  DEFAULT_BOOKLET_SPEC,
  DEFAULT_CORRUGATE_BOX_SPEC,
  DEFAULT_CORRUGATE_TRAY_SPEC,
  DEFAULT_FOLDING_CARTON_SPEC,
  DEFAULT_MOLDED_FIBER_TRAY_SPEC,
  DEFAULT_PAPER_TRAY_SPEC,
  DEFAULT_PAPER_TUBE_SPEC,
  DEFAULT_RIGID_BOX_SPEC,
  DEFAULT_SLEEVE_SPEC,
  DEFAULT_STICKER_SPEC,
  productValueToLabelMap,
  PRODUCT_NAME_BOOKLET,
  PRODUCT_NAME_CORRUGATE_BOX,
  PRODUCT_NAME_CORRUGATE_TRAY,
  PRODUCT_NAME_FOLDING_CARTON,
  PRODUCT_NAME_MOLDED_FIBER_TRAY,
  PRODUCT_NAME_PAPER_TRAY,
  PRODUCT_NAME_PAPER_TUBE,
  PRODUCT_NAME_RIGID_BOX,
  PRODUCT_NAME_SLEEVE,
  PRODUCT_NAME_STICKER,
} from "../../../../constants/products";
import { useDeleteProjectDesignMutation } from "../../../../gql/delete/project/project.generated";
import AttachmentButton from "../../../../Utils/AttachmentButton";
import useCustomSnackbar from "../../../../Utils/CustomSnackbar";
import { isValidAlphanumeric } from "../../../../Utils/inputValidators";
import { openLink } from "../../../../Utils/openLink";
import BookletSubSection from "../../createProject/advanced/subsections/BookletSubSection";
import CorrugateBoxSubSection from "../../createProject/advanced/subsections/CorrugateBoxSubSection";
import CorrugateTraySubSection from "../../createProject/advanced/subsections/CorrugateTraySubSection";
import FoldingCartonSubSection from "../../createProject/advanced/subsections/FoldingCartonSubSection";
import MoldedFiberSubSection from "../../createProject/advanced/subsections/MoldedFiberSubSection";
import PaperTraySubSection from "../../createProject/advanced/subsections/PaperTraySubSection";
import PaperTubeSubSection from "../../createProject/advanced/subsections/PaperTubeSubSection";
import RigidBoxSubSection from "../../createProject/advanced/subsections/RigidBoxSubSection";
import SleeveSubSection from "../../createProject/advanced/subsections/SleeveSubSection";
import StickerSubSection from "../../createProject/advanced/subsections/StickerSubSection";
import { isValidDimension } from "../../createProject/common/DimensionsInput";
import UploadDesign from "../../UploadDesign";

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

/**
 * There are three types of scenarios with using this modal
 * 1. Add a completely new component -- CreateProjectComponentInput
 *      - component data only exists in this modal
 * 2. Edit a newly created component (created through scenario 1.) -- CreateProjectComponentInput
 * 3. Edit a pre-existing component (exists in db) -- UpdateProjectComponentData
 *      - component data exists in both parent and modal
 *      - component data that's in this modal is temporary, since user could exit the modal before saving and we don't want to change parent data
 */
const CreateOrUpdateComponentModal = ({
  setComponents,
  setComponentsDesigns,
  setTemporaryDesigns,
  setComponentModalOpen,
  setComponentIndexToEdit,
  componentIndexToEdit,
  existingComponent,
  existingDesigns,
}: {
  setComponents: React.Dispatch<
    React.SetStateAction<
      (CreateProjectComponentInput | UpdateProjectComponentData)[]
    >
  >;
  setComponentsDesigns: React.Dispatch<React.SetStateAction<ProjectDesign[][]>>;
  setTemporaryDesigns: React.Dispatch<React.SetStateAction<ProjectDesign[]>>;
  setComponentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setComponentIndexToEdit: React.Dispatch<React.SetStateAction<number | null>>;
  // existing comp could be either a newly added comp or a pre-existing one
  existingComponent:
    | CreateProjectComponentInput
    | UpdateProjectComponentData
    | null;
  componentIndexToEdit: number | null;
  existingDesigns: ProjectDesign[] | null;
}) => {
  const theme = useTheme();
  const intl = useIntl();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  const [
    deleteDesignMutation,
    { error: deleteDesignError, loading: deleteDesignLoading },
  ] = useDeleteProjectDesignMutation();

  // keep a local componentSpec so that when user is editing and decides to cancel, we don't change the projectData
  // only when user decides to add/save then we will change the projectData state in parent
  const [componentSpec, setComponentSpec] = useState<
    CreateProjectComponentSpecInput | UpdateProjectComponentSpecData
  >(
    existingComponent
      ? existingComponent.componentSpec
      : ({} as CreateProjectComponentSpecInput)
  );

  const [componentData, setComponentData] = useState<
    CreateProjectComponentInput | UpdateProjectComponentData
  >(
    existingComponent ? existingComponent : ({} as CreateProjectComponentInput)
  );

  // local designs array, will be used to update the parent componentsDesigns state when add/save
  const [componentDesigns, setComponentDesigns] = useState<ProjectDesign[]>(
    existingDesigns ? existingDesigns : []
  );

  useEffect(() => {
    if (deleteDesignError) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [deleteDesignError]);

  const cancelOnClick = () => {
    if (!existingComponent) {
      // scenario 1 (adding a component)
      // clean up directly as temporary designs array is only used when editing a component
      if (componentDesigns.length) {
        Promise.all(
          componentDesigns.map((design) =>
            deleteDesignMutation({
              variables: {
                data: {
                  fileId: design.fileId,
                },
              },
            })
          )
        );
      }
    }
    setComponentModalOpen(false);
  };

  // Scenario 1
  const addComponent = () => {
    // construct CreateProjectComponentInput
    const comp: CreateProjectComponentInput = {
      ...componentData,
      designIds: componentDesigns.map((d) => d.fileId),
      componentSpec: {
        ...componentSpec,
      },
    };
    // add component to components list
    setComponents((prev) => {
      const allComps = [...prev, comp];
      return allComps;
    });

    setComponentsDesigns((prev) => [...prev, componentDesigns]);

    // No need to set temporary designs since this is a completely new component
    // every design uploaded/deleted will be recorded with the local componentDesigns array directly

    // close component modal
    setComponentModalOpen(false);
  };

  // Scenario 2, 3
  const saveComponent = () => {
    // comp here could be of both types Create/Update Input type
    const comp = {
      ...componentData,
      designIds: componentDesigns.map((d) => d.fileId),
      componentSpec,
    };

    setComponents((prev) => {
      const allComps = [...prev];
      allComps[componentIndexToEdit!] = comp;
      return allComps;
    });

    // Set the parent component designs based on local component designs
    setComponentsDesigns((prev) => {
      const prevDesigns = [...prev];
      prevDesigns[componentIndexToEdit!] = componentDesigns;
      return prevDesigns;
    });

    // empty temporaryDesigns array because user saved
    setTemporaryDesigns([]);

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

  // TODO: refactor implementation
  // check if component modal add button should be disabled
  const shouldDisableComponentModalAddOrSaveButton = () => {
    // check each required spec is filled
    const isInvalidComponentDimension = () => {
      if (!Object.keys(componentSpec).length) {
        return true;
      }
      if (!isValidDimension(componentSpec.dimension)) return true;

      return false;
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
    const isInvalidPostProcess = () => {
      if (componentSpec.postProcess) {
        for (let process of componentSpec.postProcess) {
          if (process.estimatedArea && !isValidDimension(process.estimatedArea))
            return true;
          if (process.numberOfColors) {
            if (!process.numberOfColors.c || !process.numberOfColors.t)
              return true;
          }
          for (let key in process) {
            const attr = key as keyof PostProcessDetailInput;
            if (
              typeof process[attr] === "string" &&
              (process[attr] as string).length === 0
            ) {
              return true;
            }
          }
        }
      }
      return false;
    };
    if (isInvalidPostProcess()) return true;
    if (isInvalidComponentSpec()) return true;

    if (!componentData.name) return false;
    return false;
  };

  const renderProductsDropdown = () => {
    const getDefaultProduct = () => {
      return productValueToLabelMap[componentSpec.productName] || null;
    };

    return (
      <>
        <Autocomplete
          sx={{ width: 200 }}
          options={ALL_PRODUCT_NAMES}
          getOptionLabel={(option) =>
            intl.formatMessage({ id: option.labelId })
          }
          autoHighlight
          defaultValue={getDefaultProduct()}
          onChange={(e, v) => {
            // whenever product name changes, we assume it's a brand new component
            setComponentIndexToEdit(null);
            setComponentDesigns([]);

            if (!v) {
              setComponentSpec({} as CreateProjectComponentSpecInput);
              return;
            }
            setComponentData({
              name: componentData.name,
              componentSpec: {},
            } as CreateProjectComponentInput);
            setComponentSpec((spec) => {
              return getComponentSpecDefaultState(v.value);
            });
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
        {componentIndexToEdit !== null && (
          <Tooltip
            title={intl.formatMessage({
              id: "app.customer.editProject.selectDifferentProduct",
            })}
            placement="top"
            sx={{ ml: 1 }}
          >
            <InfoOutlined color="info" />
          </Tooltip>
        )}
      </>
    );
  };

  // callback passed into UploadDesign component to add to the local designs array
  const setDesigns = (file: ProjectDesign | null) => {
    if (file) {
      setComponentDesigns([...componentDesigns, file]);
    }
  };

  // we only record temporary designs when we're editing a component
  const setTempDesign = (file: ProjectDesign | null) => {
    if (componentIndexToEdit !== null) {
      if (file) {
        setTemporaryDesigns((prev) => [...prev, file]);
      }
    }
  };

  const deleteDesign = async (id: string, ind: number) => {
    try {
      if (componentIndexToEdit === null) {
        // scenario 1 we just delete directly
        await deleteDesignMutation({
          variables: {
            data: {
              fileId: id,
            },
          },
        });
      }

      // remove from local designs array
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
            <Button sx={{ mr: 1 }} variant="outlined" onClick={cancelOnClick}>
              {intl.formatMessage({ id: "app.general.cancel" })}
            </Button>
            {componentIndexToEdit === null ? (
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
                id="component-attribute-name"
                onChange={componentInputOnChange}
                name="name"
                value={componentData.name}
              />
            </ListItem>
            <ListItem sx={{ mt: 1 }}>{renderProductsDropdown()}</ListItem>
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
                parentSetDesigns={[setDesigns, setTempDesign]}
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

export default CreateOrUpdateComponentModal;
