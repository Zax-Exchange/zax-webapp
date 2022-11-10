import { Cancel, ChangeCircle } from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  IconButton,
  Link,
  List,
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
import { TranslatableAttribute } from "../../../../../type/common";
import {
  GUIDED_PROJECT_FINISH,
  GUIDED_PROJECT_OUTSIDE_PRODUCTS,
  GUIDED_PROJECT_ALL_POST_PROCESS,
  productValueToLabelMap,
  FINISH_UNCOATED,
  MATERIAL_SOURCE_OCC,
  B_FLUTE,
  MATERIAL_C1S,
  MATERIAL_SOURCE_STANDARD,
  FINISH_MATTE,
  MATERIAL_C2S,
  PRODUCT_NAME_CORRUGATE_BOX,
  PRODUCT_NAME_FOLDING_CARTON,
  PRODUCT_NAME_PAPER_TUBE,
  PRODUCT_NAME_RIGID_BOX,
  PRODUCT_NAME_SLEEVE,
} from "../../../../constants/products";
import { useDeleteProjectDesignMutation } from "../../../../gql/delete/project/project.generated";
import {
  isValidAlphanumeric,
  isValidFloat,
} from "../../../../Utils/inputValidators";
import UploadDesign from "../../UploadDesign";
import DimensionsInput from "../common/DimensionsInput";
import IncludeArtworkInQuoteDropdown from "../common/IncludeArtworkInQuoteDropdown";
import { GuidedCreateSetComponentData } from "./GuidedCreateProject";
import GuidedCreateBoxStyleSelection from "./modals/GuidedCreateBoxStyleSelection";

/** OUTER BOXES DEFAULT DATA */
const corrugateBoxAdditionalDefaultSpecs: Partial<CreateProjectComponentSpecInput> =
  {
    outsideFinish: FINISH_UNCOATED.value,
    insideFinish: FINISH_UNCOATED.value,
    materialSource: MATERIAL_SOURCE_OCC.value,
    flute: B_FLUTE.value,
  };

const foldingCartonAdditionalDefaultSpecs: Partial<CreateProjectComponentSpecInput> =
  {
    material: MATERIAL_C1S.value,
    materialSource: MATERIAL_SOURCE_STANDARD.value,
    thickness: "0.5",
    outsideFinish: FINISH_MATTE.value,
    insideFinish: FINISH_UNCOATED.value,
  };

const sleeveAdditionalDefaultSpecs: Partial<CreateProjectComponentSpecInput> = {
  material: MATERIAL_C1S.value,
  materialSource: MATERIAL_SOURCE_STANDARD.value,
  thickness: "0.5",
  outsideFinish: FINISH_MATTE.value,
  insideFinish: FINISH_UNCOATED.value,
};

const rigidBoxAdditionalDefaultSpecs: Partial<CreateProjectComponentSpecInput> =
  {
    thickness: "1",
    outsideMaterial: MATERIAL_C2S.value,
    outsideMaterialSource: MATERIAL_SOURCE_STANDARD.value,
    outsideFinish: FINISH_MATTE.value,
    insideMaterial: MATERIAL_C2S.value,
    insideMaterialSource: MATERIAL_SOURCE_STANDARD.value,
    insideFinish: FINISH_MATTE.value,
  };

const paperTubeAdditionalDefaultSpecs: Partial<CreateProjectComponentSpecInput> =
  {
    // TBD
    thickness: "1.8",
    outsideMaterial: MATERIAL_C2S.value,
    outsideMaterialSource: MATERIAL_SOURCE_STANDARD.value,
    outsideFinish: FINISH_MATTE.value,
  };

const GuidedOutsideSpec = ({
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
      includeArtworkInQuote: false,
      dimension: {
        x: "",
        y: "",
        z: "",
      },
      boxStyle: "",
      postProcess: [],
    } as CreateProjectComponentSpecInput);

  const [boxStyleModalOpen, setBoxStyleModalOpen] = useState(false);

  const [selectedPostProcess, setSelectedPostProcess] = useState<string | null>(
    null
  );

  // inject existing comp data if there is any
  useEffect(() => {
    // checking for componentSpec too here since user could upload files first and componentData
    // only has designIds array
    if (componentData && componentData.componentSpec) {
      setComponentSpec(componentData.componentSpec);
    }
  }, [componentData]);

  const [
    deleteProjectDesign,
    { error: deleteProjectDesignError, data: deleteProjectDesignData },
  ] = useDeleteProjectDesignMutation();

  const componentSpecOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let isAllowed = true;

    switch (e.target.name) {
      default:
        break;
    }

    if (isAllowed) {
      setComponentSpec((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const getAdditionalDefatulSpec = (productName: string) => {
    switch (productName) {
      case PRODUCT_NAME_CORRUGATE_BOX.value:
        return corrugateBoxAdditionalDefaultSpecs;
      case PRODUCT_NAME_FOLDING_CARTON.value:
        return foldingCartonAdditionalDefaultSpecs;
      case PRODUCT_NAME_PAPER_TUBE.value:
        return paperTubeAdditionalDefaultSpecs;
      case PRODUCT_NAME_RIGID_BOX.value:
        return rigidBoxAdditionalDefaultSpecs;
      case PRODUCT_NAME_SLEEVE.value:
        return sleeveAdditionalDefaultSpecs;
    }
    return {};
  };

  // Not needed right now.
  const renderFinishDropdown = () => {
    const getDefaultFinish = () => {
      if (componentSpec.finish) {
        return productValueToLabelMap[componentSpec.finish];
      }
      return null;
    };
    return (
      <Autocomplete
        sx={{ width: 200 }}
        options={GUIDED_PROJECT_FINISH}
        autoHighlight
        value={getDefaultFinish()}
        onChange={(e, v) => {
          setComponentSpec((spec) => {
            if (!v) {
              return {
                ...spec,
                finish: undefined,
              };
            }

            return {
              ...spec,
              finish: v.value,
            };
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={intl.formatMessage({
              id: "app.customer.createProject.guidedCreate.finish",
            })}
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

  const shouldDisableNextButton = () => {
    let res = false;
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

    for (let key in componentSpec) {
      const attribute = key as keyof CreateProjectComponentSpecInput;

      // These three are required
      switch (attribute) {
        case "productName":
        case "boxStyle":
          if (!componentSpec[attribute]) return true;
      }
    }

    return false;
  };

  const deleteDesign = async (id: string, ind: number) => {
    try {
      await deleteProjectDesign({
        variables: {
          data: {
            designId: id,
          },
        },
      });

      deleteComponentDesign(ind);
    } catch (error) {}
  };

  const saveComponentData = () => {
    const compData = {
      name: "Outer Box",
      designIds: componentDesigns?.map((d) => d.designId),
      componentSpec: {
        ...componentSpec,
        ...getAdditionalDefatulSpec(componentSpec.productName),
      },
    } as CreateProjectComponentInput;

    setComponentData(compData);
  };
  // Go to next page and add/update current component to projectData
  const handleNext = () => {
    saveComponentData();
    setActiveStep((step) => step + 1);
  };

  const handleBack = () => {
    saveComponentData();
    setActiveStep((step) => step - 1);
  };

  // Go to next page and empty out all outerBox related data
  const skipToNext = () => {
    setComponentData(null);
    setActiveStep((step) => step + 1);
    if (componentDesigns && componentDesigns.length) {
      Promise.all(
        componentDesigns.map((design) => {
          return deleteProjectDesign({
            variables: {
              data: {
                designId: design.designId,
              },
            },
          });
        })
      );
      setComponentDesigns(null);
    }
  };

  // TODO: change .value to .label
  const renderBoxStyle = () => {
    return (
      <Box>
        <Typography variant="subtitle2">
          {intl.formatMessage({ id: "app.component.attribute.boxStyle" })}
        </Typography>

        {componentSpec.boxStyle ? (
          <Box>
            <Typography variant="caption">
              {productValueToLabelMap[componentSpec.boxStyle].label}
            </Typography>
            <IconButton
              onClick={() => setBoxStyleModalOpen(true)}
              color="primary"
            >
              <ChangeCircle />
            </IconButton>
          </Box>
        ) : (
          <Button
            variant="outlined"
            onClick={() => setBoxStyleModalOpen(true)}
            disabled={!componentSpec.productName}
          >
            {intl.formatMessage({
              id: "app.customer.createProject.selectBoxStyle",
            })}
          </Button>
        )}
      </Box>
    );
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

  const renderBoxTypeDropdown = () => {
    const getDefaultBoxType = () => {
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
          sx={{ width: 200 }}
          options={GUIDED_PROJECT_OUTSIDE_PRODUCTS}
          autoHighlight
          value={getDefaultBoxType()}
          onChange={(e, v) => {
            setComponentSpec((spec) => {
              if (!v) {
                return {
                  ...spec,
                  productName: "",
                  boxStyle: "",
                };
              }

              return {
                ...spec,
                boxStyle: "",
                productName: v.value,
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
  return (
    <>
      <Box>
        <Typography variant="h6" textAlign="left">
          {intl.formatMessage({
            id: "app.customer.createProject.guidedCreate.outsideSpec.title",
          })}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Stack mt={2} mb={2} spacing={2} flexBasis="50%">
          <ListItem>{renderBoxTypeDropdown()}</ListItem>
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
          <ListItem>{renderBoxStyle()}</ListItem>
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
                    <Link href={file.url} target="_blank" rel="noopener">
                      {file.filename}
                    </Link>
                    <IconButton onClick={() => deleteDesign(file.designId, i)}>
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
      <Dialog
        open={boxStyleModalOpen}
        onClose={() => setBoxStyleModalOpen(false)}
        maxWidth="md"
      >
        <GuidedCreateBoxStyleSelection
          productName={componentSpec.productName}
          setComponentSpec={setComponentSpec}
          setBoxStyleModalOpen={setBoxStyleModalOpen}
        />
      </Dialog>
    </>
  );
};

export default GuidedOutsideSpec;
