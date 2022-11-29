import { Cancel } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Link,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import {
  CreateProjectComponentInput,
  CreateProjectComponentSpecInput,
  CreateProjectInput,
  ProductDimensionInput,
  ProjectDesign,
} from "../../../../../generated/graphql";
import {
  B_FLUTE,
  GUIDED_PROJECT_ALL_POST_PROCESS,
  GUIDED_PROJECT_INSIDE_PRODUCTS,
  GUIDED_PROJECT_PAPER_POST_PROCESS,
  MANUFACTURING_PROCESS_DRY_PRESS,
  MANUFACTURING_PROCESS_WET_PRESS,
  MATERIAL_C1S,
  MATERIAL_SOURCE_OCC,
  MATERIAL_SOURCE_RECYCLED,
  MATERIAL_SOURCE_STANDARD,
  MOLDED_FIBER_MANUFACTURING_PROCESSES,
  productValueToLabelMap,
  PRODUCT_NAME_CORRUGATE_TRAY,
  PRODUCT_NAME_MOLDED_FIBER_TRAY,
  PRODUCT_NAME_PAPER_TRAY,
} from "../../../../constants/products";
import { useDeleteProjectDesignMutation } from "../../../../gql/delete/project/project.generated";
import AttachmentButton from "../../../../Utils/AttachmentButton";
import {
  isValidAlphanumeric,
  isValidFloat,
} from "../../../../Utils/inputValidators";
import { openLink } from "../../../../Utils/openLink";
import UploadDesign from "../../UploadDesign";
import ColorDropdown from "../common/ColorDropdown";
import DimensionsInput from "../common/DimensionsInput";
import IncludeArtworkInQuoteDropdown from "../common/IncludeArtworkInQuoteDropdown";
import { GuidedCreateSetComponentData } from "./GuidedCreateProject";

const moldedFiberAdditionalDefaultSpec: Partial<CreateProjectComponentSpecInput> =
  {
    thickness: "0.8",
  };

const corrugateTrayAdditionalDefaultSpec: Partial<CreateProjectComponentSpecInput> =
  {
    flute: B_FLUTE.value,
  };

const paperTrayAdditionalDefaultSpec: Partial<CreateProjectComponentSpecInput> =
  {
    material: MATERIAL_C1S.value,
    materialSource: MATERIAL_SOURCE_STANDARD.value,
    thickness: "0.8",
  };
const GuidedInsideSpec = ({
  setComponentData,
  setProjectData,
  setComponentDesigns,
  setActiveStep,
  deleteComponentDesign,
  componentData,
  componentDesigns,
  activeStep,
}: {
  setComponentData: GuidedCreateSetComponentData;
  setProjectData: Dispatch<SetStateAction<CreateProjectInput>>;
  setComponentDesigns: (data: ProjectDesign | null) => void;
  setActiveStep: Dispatch<SetStateAction<number>>;
  deleteComponentDesign: (ind: number) => void;
  componentData: CreateProjectComponentInput | null;
  componentDesigns: ProjectDesign[] | null;
  activeStep: number;
}) => {
  const intl = useIntl();
  const [componentSpec, setComponentSpec] =
    useState<CreateProjectComponentSpecInput>({
      productName: "",
      dimension: {
        x: "",
        y: "",
        z: "",
      },
      color: "",
      manufacturingProcess: "",
      includeArtworkInQuote: false,
      postProcess: [],
    });

  const [
    deleteProjectDesign,
    { error: deleteProjectDesignError, data: deleteProjectDesignData },
  ] = useDeleteProjectDesignMutation();

  const [
    shouldDisplayPostProcessDropdown,
    setShouldDisplayPostProcessDropdown,
  ] = useState(false);

  useEffect(() => {
    if (componentData && componentData.componentSpec) {
      setComponentSpec(componentData.componentSpec);
    }
  }, [componentData]);

  const componentSpecOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let isAllowed = true;

    switch (e.target.name) {
      case "dimension":
        isAllowed = isValidAlphanumeric(val);
        break;
      default:
        break;
    }

    if (isAllowed) {
      setComponentSpec({
        ...componentSpec,
        [e.target.name]: e.target.value,
      });
    }
  };

  const getAdditionalDefatulSpec = (productName: string) => {
    switch (productName) {
      case PRODUCT_NAME_MOLDED_FIBER_TRAY.value:
        return moldedFiberAdditionalDefaultSpec;
      case PRODUCT_NAME_CORRUGATE_TRAY.value:
        return corrugateTrayAdditionalDefaultSpec;
      case PRODUCT_NAME_PAPER_TRAY.value:
        return paperTrayAdditionalDefaultSpec;
    }
    return {};
  };

  const renderInsideTrayDropdown = () => {
    const getDefaultInsideTray = () => {
      if (componentSpec.productName) {
        return productValueToLabelMap[componentSpec.productName];
      }
      return null;
    };
    return (
      <Box>
        <Typography variant="subtitle2">
          {intl.formatMessage({
            id: "app.component.attribute.product",
          })}
        </Typography>
        <Autocomplete
          sx={{ width: 250 }}
          options={GUIDED_PROJECT_INSIDE_PRODUCTS}
          autoHighlight
          value={getDefaultInsideTray()}
          onChange={(e, v) => {
            setComponentSpec((spec) => {
              return {
                ...spec,
                productName: v ? v.value : "",
              };
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
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
      </Box>
    );
  };

  const getPostProcessOptions = () => {
    if (
      componentSpec.productName === PRODUCT_NAME_CORRUGATE_TRAY.value ||
      componentSpec.productName === PRODUCT_NAME_PAPER_TRAY.value
    ) {
      return GUIDED_PROJECT_ALL_POST_PROCESS;
    }
    return GUIDED_PROJECT_ALL_POST_PROCESS;
  };

  const renderPostProcessDropdown = () => {
    return (
      <Box>
        <Typography variant="subtitle2">
          {intl.formatMessage({
            id: "app.component.attribute.postProcess",
          })}
        </Typography>
        <Autocomplete
          sx={{ width: 200 }}
          options={GUIDED_PROJECT_ALL_POST_PROCESS}
          autoHighlight
          multiple
          value={GUIDED_PROJECT_ALL_POST_PROCESS.filter((p) => {
            return !!componentSpec.postProcess?.filter(
              (process) => process.postProcessName === p.value
            ).length;
          })}
          isOptionEqualToValue={(option, value) => {
            if (typeof value === "string") {
              return option.value === value;
            }
            return option.value === value.value;
          }}
          onChange={(e, v) => {
            setComponentSpec((prev) => ({
              ...prev,
              postProcess: v.map((p) => ({
                postProcessName: p.value,
                estimatedArea: { x: "", y: "" },
              })),
            }));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
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
      </Box>
    );
  };

  const deleteDesign = async (id: string, ind: number) => {
    try {
      await deleteProjectDesign({
        variables: {
          data: {
            fileId: id,
          },
        },
      });

      deleteComponentDesign(ind);
    } catch (error) {}
  };

  const shouldDisableNextButton = () => {
    if (
      !componentSpec.dimension.x ||
      !componentSpec.dimension.y ||
      !componentSpec.dimension.z
    )
      return true;

    if (
      componentSpec.includeArtworkInQuote &&
      (!componentDesigns || !componentDesigns.length)
    )
      return true;

    if (componentSpec.productName === PRODUCT_NAME_MOLDED_FIBER_TRAY.value) {
      if (!componentSpec.manufacturingProcess) {
        return true;
      }
    }
    for (let key in componentSpec) {
      const attribute = key as keyof CreateProjectComponentSpecInput;

      switch (attribute) {
        case "productName":
        case "color":
          if (!componentSpec[attribute]) return true;
      }
    }

    return false;
  };

  const saveComponentData = () => {
    const compData = {
      name: "Inner Tray",
      designIds: componentDesigns?.map((d) => d.fileId),
      componentSpec: {
        ...componentSpec,
        ...getAdditionalDefatulSpec(componentSpec.productName),
      },
    } as CreateProjectComponentInput;

    setComponentData(compData);
  };

  const handleNext = () => {
    saveComponentData();
    setActiveStep((step) => step + 1);
  };

  const handleBack = () => {
    saveComponentData();
    setActiveStep((step) => step - 1);
  };

  // skip and set comp data to null
  const skipToNext = () => {
    setComponentData(null);
    setActiveStep((step) => step + 1);
    if (componentDesigns) {
      Promise.all(
        componentDesigns.map((design) => {
          return deleteProjectDesign({
            variables: {
              data: {
                fileId: design.fileId,
              },
            },
          });
        })
      );
      setComponentDesigns(null);
    }
  };

  const renderManufacturingProcessDropdown = () => {
    const getLabel = () => {
      if (componentSpec.manufacturingProcess) {
        return productValueToLabelMap[componentSpec.manufacturingProcess];
      }
      return null;
    };

    // default value varies based on selected manufacturing process
    const getDefaultValuesForManufacturingProcess = (
      process: string
    ): Partial<CreateProjectComponentSpecInput> => {
      switch (process) {
        case MANUFACTURING_PROCESS_WET_PRESS.value:
          return {
            manufacturingProcess: MANUFACTURING_PROCESS_WET_PRESS.value,
            materialSource: MATERIAL_SOURCE_STANDARD.value,
          };
        case MANUFACTURING_PROCESS_DRY_PRESS.value:
          return {
            manufacturingProcess: MANUFACTURING_PROCESS_DRY_PRESS.value,
            materialSource: MATERIAL_SOURCE_OCC.value,
          };
      }
      return {
        manufacturingProcess: "",
        materialSource: "",
      };
    };

    return (
      <ListItem>
        <Box>
          <Typography variant="subtitle2">
            {intl.formatMessage({
              id: "app.component.attribute.manufacturingProcess",
            })}
          </Typography>
          <Autocomplete
            sx={{ width: 200 }}
            options={MOLDED_FIBER_MANUFACTURING_PROCESSES}
            autoHighlight
            value={getLabel()}
            onChange={(e, v) => {
              setComponentSpec((prev) => ({
                ...prev,
                ...getDefaultValuesForManufacturingProcess(v ? v.value : ""),
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
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
        </Box>
      </ListItem>
    );
  };
  return (
    <>
      <Box>
        <Typography variant="h6" textAlign="left">
          {intl.formatMessage({
            id: "app.customer.createProject.guidedCreate.insideSpec.title",
          })}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Stack mt={2} mb={2} spacing={2} flexBasis="50%">
          <ListItem>{renderInsideTrayDropdown()}</ListItem>
          {componentSpec.productName === PRODUCT_NAME_MOLDED_FIBER_TRAY.value &&
            renderManufacturingProcessDropdown()}
          <ListItem>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                {intl.formatMessage({
                  id: "app.component.attribute.dimension",
                })}
              </Typography>
              <DimensionsInput
                dimension={componentSpec.dimension}
                setDimension={(data: ProductDimensionInput) => {
                  setComponentSpec((prev) => ({ ...prev, dimension: data }));
                }}
              />
            </Box>
          </ListItem>
          <ListItem>
            <Box>
              <Typography variant="subtitle2">
                {intl.formatMessage({
                  id: "app.component.attribute.color",
                })}
              </Typography>
              <ColorDropdown
                setComponentSpec={setComponentSpec}
                componentSpec={componentSpec}
              />
            </Box>
          </ListItem>
          <ListItem>{renderPostProcessDropdown()}</ListItem>
        </Stack>
        <Stack mt={2} mb={2} spacing={2} flexBasis="50%">
          <ListItem>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                {intl.formatMessage({
                  id: "app.component.attribute.includeArtworkInQuote",
                })}
              </Typography>
              <IncludeArtworkInQuoteDropdown
                componentSpec={componentSpec}
                setComponentSpec={setComponentSpec}
              />
            </Box>
          </ListItem>
          <ListItem>
            <Box>
              <Box display="flex" alignItems="center">
                <Typography variant="subtitle2">
                  {intl.formatMessage({
                    id: "app.component.attribute.designs",
                  })}
                </Typography>
                <UploadDesign
                  setComponentData={setComponentData}
                  parentSetDesigns={[setComponentDesigns]}
                />
              </Box>
              {componentDesigns?.map((file, i) => {
                return (
                  <Box>
                    <AttachmentButton
                      label={file.filename}
                      onClick={() => openLink(file.url)}
                    />
                    <IconButton onClick={() => deleteDesign(file.fileId, i)}>
                      <Cancel fontSize="small" />
                    </IconButton>
                  </Box>
                );
              })}
              {!componentDesigns?.length && (
                <Typography variant="caption">
                  <i>
                    {intl.formatMessage({
                      id: "app.customer.createProject.noDesignPlaceholder",
                    })}
                  </i>
                </Typography>
              )}
            </Box>
          </ListItem>
        </Stack>
      </Box>
      <Box display="flex" mt={5}>
        <Box>
          <Button variant="outlined" onClick={handleBack}>
            {intl.formatMessage({ id: "app.general.back" })}
          </Button>
        </Box>
        <Box ml="auto">
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={shouldDisableNextButton()}
          >
            {intl.formatMessage({ id: "app.general.next" })}
          </Button>
        </Box>
        <Box mr={-5} ml={1}>
          <Button variant="text" onClick={skipToNext}>
            {intl.formatMessage({
              id: "app.customer.createProject.guidedCreate.skip",
            })}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default GuidedInsideSpec;
