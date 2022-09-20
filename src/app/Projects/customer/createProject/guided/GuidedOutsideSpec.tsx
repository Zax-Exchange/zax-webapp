import Add from "@mui/icons-material/Add";
import {
  Autocomplete,
  Box,
  Button,
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
} from "../../../../../generated/graphql";
import { TranslatableAttribute } from "../../../../../type/common";
import {
  GUIDED_PROJECT_FINISH,
  GUIDED_PROJECT_OUTSIDE_PRODUCTS,
  GUIDED_PROJECT_ALL_POST_PROCESS,
  productValueToLabelMap,
} from "../../../../constants/products";
import { isValidAlphanumeric } from "../../../../Utils/inputValidators";

const GuidedOutsideSpec = ({
  projectData,
  setProjectData,
  setActiveStep,
  activeStep,
}: {
  projectData: CreateProjectInput;
  setProjectData: Dispatch<SetStateAction<CreateProjectInput>>;
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
}) => {
  const intl = useIntl();
  const [componentSpec, setComponentSpec] =
    useState<CreateProjectComponentSpecInput>({
      productName: "",
      dimension: "",
      finish: "",
      boxStyle: "",
      postProcess: [],
    } as CreateProjectComponentSpecInput);

  const [
    shouldDisplayPostProcessDropdown,
    setShouldDisplayPostProcessDropdown,
  ] = useState(false);

  useEffect(() => {
    if (projectData.components[0]) {
      setComponentSpec(projectData.components[0].componentSpec);
    }
  }, []);
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
              };
            }
            if (v.value === componentSpec.productName) {
              return spec;
            } else {
              return {
                ...spec,
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

  const renderBoxStyleDropdown = () => {
    return (
      <Autocomplete
        sx={{ width: 200 }}
        options={GUIDED_PROJECT_ALL_POST_PROCESS}
        autoHighlight
        // isOptionEqualToValue={(option, value) => option.label === value
        onChange={(e, v) => {
          setComponentSpec((spec) => {
            if (!v) {
              return {
                ...spec,
                boxStyle: undefined,
              };
            }
            return {
              ...spec,
              boxStyle: v.value,
            };
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={intl.formatMessage({
              id: "app.component.attribute.boxStyle",
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

      // These four are required for outside spec
      switch (attribute) {
        case "productName":
        case "dimension":
        case "boxStyle":
        case "finish":
          if (!componentSpec[attribute]) return true;
      }
    }

    return false;
  };

  // Go to next page and add/update current component to projectData
  const handleNext = () => {
    const compData = {
      name: componentSpec.productName,
      componentSpec,
    };

    setProjectData((prev) => {
      const existingComps = [...prev.components];
      let res = prev;
      switch (existingComps.length) {
        case 0:
        case 1:
          res = {
            ...prev,
            components: [compData],
          };
          break;
        case 2:
          res = {
            ...prev,
            components: [compData, existingComps[1]],
          };
          break;
      }
      return res;
    });
    setActiveStep((step) => step + 1);
  };

  // Go back to previous page and empty components array
  const handleBack = () => {
    setActiveStep((step) => step - 1);
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
        <ListItem>{renderBoxStyleDropdown()}</ListItem>
        <ListItem>{renderFinishDropdown()}</ListItem>
        <ListItem>{renderPostProcessDropdown()}</ListItem>
      </Stack>
      <Box>
        <Button
          variant="text"
          onClick={handleBack}
          disabled={activeStep === 0}
          style={{ marginRight: 8 }}
        >
          {intl.formatMessage({ id: "app.general.back" })}
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={shouldDisableNextButton()}
        >
          {intl.formatMessage({ id: "app.general.next" })}
        </Button>
      </Box>
    </>
  );
};

export default GuidedOutsideSpec;
