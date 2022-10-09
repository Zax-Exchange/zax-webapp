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
} from "../../../../generated/graphql";
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
} from "../../../constants/products";
import { useDeleteProjectDesignMutation } from "../../../gql/delete/project/project.generated";
import { isValidAlphanumeric } from "../../../Utils/inputValidators";
import UploadDesign from "../UploadDesign";
import CorrugateBoxSubSection from "./componentModalSubSection/CorrugateBoxSubSection";
import FoldingCartonSubSection from "./componentModalSubSection/FoldingCartonSubSection";
import MoldedFiberSubSection from "./componentModalSubSection/MoldedFiberSubSection";
import PaperTubeSubSection from "./componentModalSubSection/PaperTubeSubSection";
import RigidBoxSubSection from "./componentModalSubSection/RigidBoxSubSection";
import SleeveSubSection from "./componentModalSubSection/SleeveSubSection";

const CreateProjectComponentModal = ({
  projectData,
  existingDesigns,
  setProjectData,
  setComponentModalOpen,
  setComponentsDesigns,
  setTemporaryDesigns,
  defaultComponentIndex,
}: {
  setProjectData: React.Dispatch<React.SetStateAction<CreateProjectInput>>;
  setComponentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setComponentsDesigns: React.Dispatch<React.SetStateAction<ProjectDesign[][]>>;
  setTemporaryDesigns: React.Dispatch<
    React.SetStateAction<ProjectDesign[] | null>
  >;
  projectData: CreateProjectInput;
  existingDesigns?: ProjectDesign[];
  defaultComponentIndex?: number;
}) => {
  const theme = useTheme();
  const intl = useIntl();
  const [view, setView] = useState("");
  const [
    deleteDesignMutation,
    { error: deleteDesignError, loading: deleteDesignLoading },
  ] = useDeleteProjectDesignMutation();

  const [componentSpec, setComponentSpec] =
    useState<CreateProjectComponentSpecInput>(
      {} as CreateProjectComponentSpecInput
    );
  const [componentData, setComponentData] =
    useState<CreateProjectComponentInput>({} as CreateProjectComponentInput);

  const [componentDesigns, setComponentDesigns] = useState<ProjectDesign[]>([]);

  useEffect(() => {
    if (componentSpec.productName) {
      setComponentSpec({
        productName: componentSpec.productName,
      } as CreateProjectComponentSpecInput);

      switch (componentSpec.productName) {
        case PRODUCT_NAME_RIGID_BOX.value:
          setView(PRODUCT_NAME_RIGID_BOX.value);
          break;
        case PRODUCT_NAME_FOLDING_CARTON.value:
          setView(PRODUCT_NAME_FOLDING_CARTON.value);
          break;
        case PRODUCT_NAME_SLEEVE.value:
          setView(PRODUCT_NAME_SLEEVE.value);
          break;
        case PRODUCT_NAME_CORRUGATE_BOX.value:
          setView(PRODUCT_NAME_CORRUGATE_BOX.value);
          break;
        case PRODUCT_NAME_MOLDED_FIBER_TRAY.value:
          setView(PRODUCT_NAME_MOLDED_FIBER_TRAY.value);
          break;
        case PRODUCT_NAME_PAPER_TUBE.value:
          setView(PRODUCT_NAME_PAPER_TUBE.value);
          break;
        default:
          break;
      }
    }
  }, [componentSpec.productName]);

  useEffect(() => {
    if (defaultComponentIndex !== undefined) {
      const comp = projectData.components[defaultComponentIndex];
      setComponentData(comp);
      setComponentSpec(comp.componentSpec);
      setComponentDesigns(existingDesigns ? existingDesigns : []);
    }
  }, [defaultComponentIndex]);
  // record these temporary designs in case user closes this modal we need to cleanup the design files in backend
  useEffect(() => {
    setTemporaryDesigns(componentDesigns);
  }, [componentDesigns]);

  const addComponent = () => {
    // construct CreateProjectComponentInput
    const comp: CreateProjectComponentInput = {
      ...componentData,
      designIds: componentDesigns?.map((d) => d.designId),
      componentSpec: {
        ...componentSpec,
      },
    };
    // add component to projectData
    setProjectData({
      ...projectData,
      components: [...projectData.components, comp],
    });

    // record design files for this component on parent react component since we are in a modal, this is for display purpose only.
    if (componentDesigns) {
      setComponentsDesigns((prev) => [...prev, componentDesigns]);
    } else {
      // set an empty array so parent can delete component and component designs based on index
      // otherwise if a component doesn't have designs and user tries to delete the component it'll result in null
      // since deleting a component will trigger a check for whether there's any designs attached
      setComponentsDesigns((prev) => [...prev, []]);
    }

    // close component modal
    setComponentModalOpen(false);
  };

  const saveComponent = () => {
    // construct CreateProjectComponentInput
    const comp: CreateProjectComponentInput = {
      ...componentData,
      designIds: componentDesigns?.map((d) => d.designId),
      componentSpec: {
        ...componentSpec,
      },
    };
    const components = [...projectData.components];
    components[defaultComponentIndex!] = comp;
    // add component to projectData
    setProjectData({
      ...projectData,
      components,
    });

    if (componentDesigns && componentDesigns.length) {
      setComponentsDesigns((prev) => {
        const prevDesigns = [...prev];
        prevDesigns[defaultComponentIndex!] = componentDesigns;
        return prevDesigns;
      });
    } else {
      setComponentsDesigns((prev) => {
        const prevDesigns = [...prev];
        prevDesigns[defaultComponentIndex!] = [];
        return prevDesigns;
      });
    }

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
  const shouldDisableComponentModalAddButton = () => {
    // check each required spec is filled

    const isInvalidComponentSpec = () => {
      if (Object.keys(componentSpec).length === 0) return true;

      for (let key in componentSpec) {
        const val = componentSpec[key as keyof CreateProjectComponentSpecInput];

        if (val !== undefined && val !== null) {
          if (val.length === 0) return true;
        }
      }
      return false;
    };

    if (isInvalidComponentSpec()) return true;

    for (let key in componentData) {
      if (key === "componentSpec") {
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
          projectData.components[defaultComponentIndex].componentSpec
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
            // If product name is same, do nothing.
            if (v.value === componentSpec.productName) {
              return spec;
            } else {
              // If product name is different, reset everything
              return {
                productName: v.value,
              } as CreateProjectComponentSpecInput;
            }
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

  const setDesigns = (file: ProjectDesign | null) => {
    if (!file) {
      setComponentDesigns([]);
    } else if (componentDesigns) {
      setComponentDesigns([...componentDesigns, file]);
    } else {
      setComponentDesigns([file]);
    }
  };

  const deleteDesign = async (id: string, ind: number) => {
    try {
      await deleteDesignMutation({
        variables: {
          data: {
            designId: id,
          },
        },
      });
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
                <IconButton onClick={() => deleteDesign(file.designId, i)}>
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

  return (
    <>
      <Container sx={{ paddingTop: 5, paddingBottom: 5, width: "480px" }}>
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
            {defaultComponentIndex === undefined ? (
              <Button
                onClick={addComponent}
                disabled={shouldDisableComponentModalAddButton()}
                variant="contained"
              >
                {intl.formatMessage({ id: "app.general.add" })}
              </Button>
            ) : (
              <Button onClick={saveComponent} variant="contained">
                {intl.formatMessage({ id: "app.general.save" })}
              </Button>
            )}
          </Box>
        </Box>
        <Divider />
        <Stack spacing={5}>
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
                parentSetDesign={setDesigns}
              />
            </ListItem>
            {renderDesignFiles()}
          </Stack>
          {view === PRODUCT_NAME_RIGID_BOX.value && (
            <RigidBoxSubSection
              setComponentSpec={setComponentSpec}
              componentSpec={componentSpec}
            />
          )}

          {view === PRODUCT_NAME_FOLDING_CARTON.value && (
            <FoldingCartonSubSection
              setComponentSpec={setComponentSpec}
              componentSpec={componentSpec}
            />
          )}

          {view === PRODUCT_NAME_SLEEVE.value && (
            <SleeveSubSection
              setComponentSpec={setComponentSpec}
              componentSpec={componentSpec}
            />
          )}

          {view === PRODUCT_NAME_CORRUGATE_BOX.value && (
            <CorrugateBoxSubSection
              setComponentSpec={setComponentSpec}
              componentSpec={componentSpec}
            />
          )}

          {view === PRODUCT_NAME_MOLDED_FIBER_TRAY.value && (
            <MoldedFiberSubSection
              setComponentSpec={setComponentSpec}
              componentSpec={componentSpec}
            />
          )}

          {view === PRODUCT_NAME_PAPER_TUBE.value && (
            <PaperTubeSubSection
              setComponentSpec={setComponentSpec}
              componentSpec={componentSpec}
            />
          )}
        </Stack>
      </Container>
    </>
  );
};

export default CreateProjectComponentModal;
