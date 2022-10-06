import Add from "@mui/icons-material/Add";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  IconButton,
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
  UploadProjectDesignResponse,
} from "../../../../../generated/graphql";
import { TranslatableAttribute } from "../../../../../type/common";
import {
  GUIDED_PROJECT_FINISH,
  GUIDED_PROJECT_OUTSIDE_PRODUCTS,
  GUIDED_PROJECT_ALL_POST_PROCESS,
  productValueToLabelMap,
} from "../../../../constants/products";
import { useDeleteProjectDesignMutation } from "../../../../gql/delete/project/project.generated";
import { isValidAlphanumeric } from "../../../../Utils/inputValidators";
import UploadDesign from "../../UploadDesign";
import { GuidedComponentConfigViews } from "./GuidedCreateProject";
import GuidedCreateBoxStyleSelection from "./modals/GuidedCreateBoxStyleSelection";

const GuidedOutsideSpec = ({
  setComponentData,
  setProjectData,
  setComponentDesign,
  setActiveStep,
  componentData,
  componentDesign,
  activeStep,
}: {
  setComponentData: (data: CreateProjectComponentInput | null) => void;
  setProjectData: Dispatch<SetStateAction<CreateProjectInput>>;
  setComponentDesign: (data: UploadProjectDesignResponse | null) => void;
  setActiveStep: Dispatch<SetStateAction<number>>;
  componentData: CreateProjectComponentInput | null;
  componentDesign: UploadProjectDesignResponse | null;
  activeStep: number;
}) => {
  const intl = useIntl();
  const [componentSpec, setComponentSpec] =
    useState<CreateProjectComponentSpecInput>({
      productName: "",
      dimension: "",
      boxStyle: "",
      postProcess: [],
    } as CreateProjectComponentSpecInput);
  const [boxStyleModalOpen, setBoxStyleModalOpen] = useState(false);

  const [
    shouldDisplayPostProcessDropdown,
    setShouldDisplayPostProcessDropdown,
  ] = useState(false);

  // inject existing comp data if there is any
  useEffect(() => {
    if (componentData) {
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
      case "dimension":
        isAllowed = isValidAlphanumeric(val);
        break;
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

  const renderBoxTypeDropdown = () => {
    const getDefaultBoxType = () => {
      if (componentSpec.productName) {
        return productValueToLabelMap[componentSpec.productName];
      }
      return null;
    };
    return (
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
            if (v.value === componentSpec.productName) {
              return spec;
            } else {
              return {
                ...spec,
                boxStyle: "",
                productName: v.value,
              };
            }
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={intl.formatMessage({
              id: "app.customer.createProject.guidedCreate.boxType",
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

  const renderBoxStyle = () => {
    return (
      <Box>
        <Typography variant="subtitle2">
          {intl.formatMessage({ id: "app.component.attribute.boxStyle" })}
        </Typography>
        <Typography>
          {componentSpec.boxStyle
            ? productValueToLabelMap[componentSpec.boxStyle].label
            : "Please select a boxy style"}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => setBoxStyleModalOpen(true)}
          disabled={!componentSpec.productName}
        >
          {intl.formatMessage({
            id: "app.customer.createProject.selectBoxStyle",
          })}
        </Button>
      </Box>
    );
  };

  const renderPostProcessDropdown = () => {
    const getDefaultPostProcess = () => {
      if (componentSpec.postProcess) {
        const postProcess = componentSpec.postProcess[0];
        return productValueToLabelMap[postProcess];
      }
      return null;
    };
    const renderPostProcess = () => {
      return (
        <Autocomplete
          sx={{ width: 200 }}
          options={GUIDED_PROJECT_ALL_POST_PROCESS}
          autoHighlight
          value={getDefaultPostProcess()}
          // isOptionEqualToValue={(option, value) => option.label === value}
          onChange={(e, v) => {
            setComponentSpec((spec) => {
              if (!v) {
                return {
                  ...spec,
                  postProcess: undefined,
                };
              }
              return {
                ...spec,
                postProcess: [v.value],
              };
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={intl.formatMessage({
                id: "app.component.attribute.postProcess",
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

    if (
      !shouldDisplayPostProcessDropdown &&
      !componentSpec.postProcess?.length
    ) {
      return (
        <Button
          onClick={() => setShouldDisplayPostProcessDropdown(true)}
          variant="text"
        >
          {intl.formatMessage({
            id: "app.component.postProcess.add",
          })}
        </Button>
      );
    }

    return (
      <Box display="flex">
        {renderPostProcess()}
        <Button
          onClick={() => {
            setComponentSpec((spec) => ({
              ...spec,
              postProcess: undefined,
            }));
            setShouldDisplayPostProcessDropdown(false);
          }}
          variant="text"
        >
          {intl.formatMessage({
            id: "app.general.cancel",
          })}
        </Button>
      </Box>
    );
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
    for (let key in componentSpec) {
      const attribute = key as keyof CreateProjectComponentSpecInput;

      // These three are required
      switch (attribute) {
        case "productName":
        case "dimension":
        case "boxStyle":
          if (!componentSpec[attribute]) return true;
      }
    }

    return false;
  };

  // Go to next page and add/update current component to projectData
  const handleNext = () => {
    const compData = {
      name: "Outer Box",
      componentSpec,
    };
    setComponentData(compData);
    setActiveStep((step) => step + 1);
  };

  const handleBack = () => {
    setActiveStep((step) => step - 1);
  };

  // Go to next page and empty out all outerBox related data
  const skipToNext = () => {
    setComponentData(null);
    setActiveStep((step) => step + 1);
    if (componentDesign) {
      deleteProjectDesign({
        variables: {
          data: {
            designId: componentDesign.designId,
          },
        },
      });
      setComponentDesign(null);
    }
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
      <Box display="flex" flexDirection="row">
        <Stack mt={2} mb={2} spacing={2}>
          <ListItem>{renderBoxTypeDropdown()}</ListItem>
          <ListItem>
            <TextField
              autoComplete="new-password"
              label={intl.formatMessage({
                id: "app.component.attribute.dimension",
              })}
              onChange={componentSpecOnChange}
              name="dimension"
              value={componentSpec.dimension}
            />
          </ListItem>
          <ListItem>{renderBoxStyle()}</ListItem>
        </Stack>
        <Stack mt={2} mb={2} spacing={2}>
          <ListItem>{renderPostProcessDropdown()}</ListItem>
        </Stack>
      </Box>
      <Box>
        <UploadDesign
          setProjectData={setProjectData}
          existingDesigns={componentDesign ? [componentDesign] : undefined}
          parentSetDesign={setComponentDesign}
        />
        <Button
          variant="text"
          onClick={handleBack}
          disabled={activeStep === 0}
          style={{ marginRight: 8 }}
        >
          {intl.formatMessage({ id: "app.general.back" })}
        </Button>
        <Button variant="text" onClick={skipToNext} style={{ marginRight: 8 }}>
          {intl.formatMessage({
            id: "app.customer.createProject.guidedCreate.skip",
          })}
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={shouldDisableNextButton()}
        >
          {intl.formatMessage({ id: "app.general.next" })}
        </Button>
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
