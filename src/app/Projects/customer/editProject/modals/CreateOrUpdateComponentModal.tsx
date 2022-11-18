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
  ProjectDesign,
  UpdateProjectComponentInput,
  UpdateProjectComponentSpecInput,
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
import useCustomSnackbar from "../../../../Utils/CustomSnackbar";
import { isValidAlphanumeric } from "../../../../Utils/inputValidators";
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
 * 3. Edit a pre-existing component (exists in db) -- UpdateProjectComponentInput
 *      - component data exists in both parent and modal
 *      - component data that's in this modal is temporary, since user could exit the modal before saving and we don't want to change parent data
 */
const CreateOrUpdateComponentModal = ({
  setComponents,
  setComponentsDesigns,
  setTemporaryDesigns,
  setTemporaryDesignsToDelete,
  setComponentModalOpen,
  setComponentIndexToEdit,
  temporaryDesignsToDelete,
  componentIndexToEdit,
  existingComponent,
  existingDesigns,
}: {
  setComponents: React.Dispatch<
    React.SetStateAction<
      (CreateProjectComponentInput | UpdateProjectComponentInput)[]
    >
  >;
  setComponentsDesigns: React.Dispatch<React.SetStateAction<ProjectDesign[][]>>;
  setTemporaryDesigns: React.Dispatch<React.SetStateAction<ProjectDesign[]>>;
  setTemporaryDesignsToDelete: React.Dispatch<
    React.SetStateAction<ProjectDesign[]>
  >;
  setComponentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setComponentIndexToEdit: React.Dispatch<React.SetStateAction<number | null>>;
  temporaryDesignsToDelete: ProjectDesign[];
  // existing comp could be either a newly added comp or a pre-existing one
  existingComponent:
    | CreateProjectComponentInput
    | UpdateProjectComponentInput
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
    CreateProjectComponentSpecInput | UpdateProjectComponentSpecInput
  >(
    existingComponent
      ? existingComponent.componentSpec
      : ({} as CreateProjectComponentSpecInput)
  );

  const [componentData, setComponentData] = useState<
    CreateProjectComponentInput | UpdateProjectComponentInput
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

  // Scenario 1
  const addComponent = () => {
    // construct CreateProjectComponentInput
    const comp: CreateProjectComponentInput = {
      ...componentData,
      designIds: componentDesigns?.map((d) => d.fileId),
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
      designIds: componentDesigns?.map((d) => d.fileId),
      componentSpec,
    };

    setComponents((prev) => {
      const allComps = [...prev];
      allComps[componentIndexToEdit!] = comp;
      return allComps;
    });

    if (temporaryDesignsToDelete.length) {
      // user has clicked on files delete buttons and now is saving
      // we proceed with cleaning up the deleted files
      Promise.all(
        temporaryDesignsToDelete.map((file) => {
          return deleteDesignMutation({
            variables: {
              data: {
                fileId: file.fileId,
              },
            },
          });
        })
      );

      // reset temporaryDesignsToDelete array
      setTemporaryDesignsToDelete([]);
    }

    // Set the parent component designs based on local component designs
    if (componentDesigns && componentDesigns.length) {
      setComponentsDesigns((prev) => {
        const prevDesigns = [...prev];
        prevDesigns[componentIndexToEdit!] = componentDesigns;
        return prevDesigns;
      });
    } else {
      setComponentsDesigns((prev) => {
        const prevDesigns = [...prev];
        prevDesigns[componentIndexToEdit!] = [];
        return prevDesigns;
      });
    }

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

  // TODO: finish implementation
  // check if component modal add button should be disabled
  const shouldDisableComponentModalAddOrSaveButton = () => {
    // check each required spec is filled
    return false;
  };

  const renderProductsDropdown = () => {
    const getDefaultProduct = () => {
      return productValueToLabelMap[componentSpec.productName] || null;
    };

    return (
      <Autocomplete
        sx={{ width: 200 }}
        options={ALL_PRODUCT_NAMES}
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
            name: "",
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
      } else {
        // scenario 2, 3 we add it to temporaryDesignsToDelete so we can revert if user does not save
        setTemporaryDesignsToDelete((prev) => [...prev, componentDesigns[ind]]);
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
                <Link href={file.url} target="_blank" rel="noopener">
                  {file.filename}
                </Link>
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
